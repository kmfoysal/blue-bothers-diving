"use strict";

const saferpayService = require("../services/saferpay");

module.exports = {
  // 1. INITIATE BOOKING
  async initiate(ctx) {
    const {
      customer,
      items,
      amount,
      currency,
      newsletterOptIn,
      termsAccepted,
    } = ctx.request.body;

    const bookingCode = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      // A. Initialize Payment
      const paymentResponse = await saferpayService.initializePayment({
        bookingCode,
        amount,
        currency,
      });

      // B. Map Items
      const mappedBookingItems = [];
      for (const item of items) {
        const relationField =
          item.type === "course" ? "courses_collection" : "tour";
        const sessions = await strapi.entityService.findMany(
          "api::session.session",
          {
            filters: {
              [relationField]: { slug: item.slug },
              startDateTime: { $contains: item.date },
            },
            limit: 1,
          }
        );
        const sessionId = sessions.length > 0 ? sessions[0].id : null;

        const mappedParticipants =
          item.participants_details?.map((p) => ({
            fullName: `${p.firstName} ${p.lastName}`.trim(),
            participantsPhone: p.participantsPhone,
            isLead: p.isLead,
          })) || [];

        mappedBookingItems.push({
          slug: item.slug,
          type: item.type,
          date: item.date,
          participants: item.participants,
          price: item.price,
          image: item.image,
          itemGuestCount: item.participants,
          itemPriceTotal: item.price,
          itemCurrency: currency,
          session: sessionId,
          participants_details: mappedParticipants,
        });
      }

      // C. Create Booking
      await strapi.entityService.create("api::booking.booking", {
        data: {
          bookingCode: bookingCode,

          // ✅ CORRECT FIELD NAME
          bookingStatus: "pending",

          paymentStatus: "unpaid",
          priceTotal: amount,
          currency: currency,
          source: "website",
          guestCountTotal: items.reduce(
            (sum, i) => sum + (i.participants || 0),
            0
          ),
          transactionToken: paymentResponse.Token,
          newsletterOptIn,
          termsAccepted,
          leadCustomer: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            hotelName: customer.hotelName,
            roomNumber: customer.roomNumber,
            notes: customer.notes,
          },
          bookingItems: mappedBookingItems,
        },
      });

      return ctx.send({
        redirectUrl: paymentResponse.RedirectUrl,
        bookingCode: bookingCode,
      });
    } catch (err) {
      console.error("Booking Init Error:", err);
      return ctx.badRequest("Failed to create booking", {
        details: err.message,
      });
    }
  },

  // 2. CONFIRM BOOKING
  async confirm(ctx) {
    const { bookingCode } = ctx.request.body;

    if (!bookingCode) return ctx.badRequest("Missing booking code");

    try {
      // A. Fetch Booking
      // FIX: Simplified populate. We removed the deep 'page_banner' population
      // because it caused the error. We will rely on the saved 'item.image' instead.
      const bookings = await strapi.entityService.findMany(
        "api::booking.booking",
        {
          filters: { bookingCode: bookingCode },
          populate: {
            leadCustomer: true,
            bookingItems: {
              populate: {
                participants_details: true,
                session: {
                  populate: {
                    tour: true,
                    courses_collection: true,
                  },
                },
              },
            },
          },
        }
      );

      if (!bookings.length) return ctx.badRequest("Booking not found");
      const booking = bookings[0];

      // B. Idempotency Check
      if (booking.paymentStatus === "paid") {
        return ctx.send({
          status: "success",
          message: "Already confirmed",
          booking,
        });
      }

      // C. Verify Payment
      if (!booking.transactionToken) {
        console.warn("No transaction token found for", bookingCode);
      }

      // Assert Payment
      const assertion = await saferpayService.assertPayment(
        booking.transactionToken
      );
      const status = assertion.Transaction.Status;

      // D. Update Status
      if (status === "AUTHORIZED" || status === "CAPTURED") {
        await strapi.entityService.update("api::booking.booking", booking.id, {
          data: {
            bookingStatus: "confirmed",
            paymentStatus: "paid",
          },
        });

        booking.bookingStatus = "confirmed";
        booking.paymentStatus = "paid";

        return ctx.send({
          status: "success",
          message: "Booking confirmed",
          booking: booking,
        });
      } else {
        return ctx.badRequest("Payment not authorized");
      }
    } catch (err) {
      console.error("Confirmation Error:", err);
      return ctx.badRequest("Payment verification failed", {
        details: err.message,
      });
    }
  },
};
