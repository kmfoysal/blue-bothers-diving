'use strict';

const { parseISO, format } = require('date-fns');
const saferpayService = require('../services/saferpay'); // Import the service we just made

module.exports = {
  async initiate(ctx) {
    const { customer, items, amount, currency, locale } = ctx.request.body;

    // 1. Generate Unique Booking Code
    const bookingCode = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 2. Prepare Booking Items (The complex mapping part)
    const mappedItems = [];

    for (const item of items) {
      // A. Find the Session ID based on Slug + Date
      // Note: This assumes you have logic to find sessions. 
      // If sessions are auto-generated, we query them. If not, we might fail here.
      const relationField = item.type === 'course' ? 'courses_collection' : 'tour';
      
      const sessions = await strapi.entityService.findMany('api::session.session', {
        filters: {
          [relationField]: { slug: item.slug },
          startDateTime: { $contains: item.date } // Simple match for YYYY-MM-DD
        },
        limit: 1
      });

      if (!sessions || sessions.length === 0) {
        return ctx.badRequest(`No session found for ${item.slug} on ${item.date}`);
      }

      // B. Map Participants for this specific item
      const itemParticipants = item.participants_details?.map(p => ({
        firstName: p.firstName,
        lastName: p.lastName,
        phone: p.participantsPhone,
        isLead: p.isLead || false,
        email: customer.email, // Fallback to main email if not specific
        preferredLanguage: locale === 'de' ? 'de' : 'en'
      })) || [];

      // If no detailed list sent, create a dummy one based on count? 
      // (Depends on frontend. Assuming frontend sends details based on your JSON)

      mappedItems.push({
        session: sessions[0].id,
        itemGuestCount: item.participants_count || item.participants, // Handle number vs array
        itemPriceTotal: item.price,
        itemCurrency: currency,
        participants: itemParticipants
      });
    }

    // 3. Create "Pending" Booking in Strapi
    try {
      const newBooking = await strapi.entityService.create('api::booking.booking', {
        data: {
          bookingCode: bookingCode,
          status: 'pending',
          paymentStatus: 'unpaid',
          priceTotal: amount,
          guestCountTotal: items.reduce((sum, i) => sum + (i.participants_count || i.participants), 0),
          contactEmail: customer.email,
          items: mappedItems, // The populated component array
          publishedAt: new Date() // Publish immediately so we can read it back
        }
      });

      // 4. Call Saferpay
      const paymentResponse = await saferpayService.initializePayment({
        amount,
        currency,
        bookingCode
      });

      // 5. Send Redirect URL to Frontend
      return ctx.send({
        redirectUrl: paymentResponse.RedirectUrl,
        bookingCode: bookingCode
      });

    } catch (err) {
      console.error("Booking Init Error:", err);
      return ctx.badRequest('Failed to create booking', { details: err.message });
    }
  },

  // --- CONFIRMATION ENDPOINT ---
  async confirm(ctx) {
    const { token, bookingCode } = ctx.request.body;

    if (!token || !bookingCode) return ctx.badRequest("Missing token or booking code");

    try {
      // 1. Verify with Saferpay
      const assertion = await saferpayService.assertPayment(token);
      
      // 2. Check if Transaction Status is AUTHORIZED or CAPTURED
      const status = assertion.Transaction.Status;
      
      if (status === 'AUTHORIZED' || status === 'CAPTURED') {
        
        // 3. Update Booking in Database
        const bookings = await strapi.entityService.findMany('api::booking.booking', {
            filters: { bookingCode: bookingCode }
        });

        if (bookings.length > 0) {
            await strapi.entityService.update('api::booking.booking', bookings[0].id, {
                data: {
                    status: 'confirmed',
                    paymentStatus: 'paid'
                }
            });
            
            // TODO: Trigger Email Service Here
        }

        return ctx.send({ status: 'success', message: 'Booking confirmed' });
      } else {
        return ctx.badRequest('Payment not authorized');
      }

    } catch (err) {
      console.error("Confirmation Error:", err);
      return ctx.badRequest("Payment verification failed");
    }
  }
};