"use strict";

const { parseISO, isWithinInterval, startOfDay, endOfDay } = require('date-fns');

module.exports = {
  async getAllActivities(ctx) {
    const { locale } = ctx.query;
    const lang = locale || "en";

    try {
      // 1. Fetch TOURS
      const tours = await strapi.entityService.findMany("api::tour.tour", {
        locale: lang,
        populate: {
          page_banner: { populate: { background: true } },
          categories: true,
          pricingPeriods: { populate: { sessionPricingTiers: true } },
        },
      });

      // 2. Fetch COURSES
      const courses = await strapi.entityService.findMany(
        "api::courses-collection.courses-collection",
        {
          locale: lang,
          populate: {
            og_image: true,
            categories: true,
            pricingPeriods: { populate: { sessionPricingTiers: true } },
          },
        }
      );

      // 3. NORMALIZE & MERGE
      const unifiedList = [
        // --- Map Tours ---
        ...(tours || []).map((t) => ({
          id: t.id,
          title: t.title,
          description: t?.description,
          slug: t.slug,
          type: "tour",
          date: t?.updatedAt,
          image: t.page_banner?.background?.url || null,
          pricingMode: t.pricingMode || "N/A",
          pricingPeriods: t.pricingPeriods || [],
          price: t.pricingPeriods?.[0]?.pricePerParticipant || 0,
          categories: t.categories || [],
          link: `/tour/${t.slug}`,
        })),

        // --- Map Courses ---
        ...(courses || []).map((c) => ({
          id: c.id,
          title: c.meta_title || "Untitled Course",
          description: c?.meta_description,
          slug: c?.slug,
          type: "course",
          date: c?.updatedAt,
          image: c?.og_image?.url || null,
          pricingMode: c?.pricingMode || "N/A",
          pricingPeriods: c?.pricingPeriods || [],
          price: c.pricingPeriods?.[0]?.pricePerParticipant || 0,
          categories: c.categories || [],
          link: `/courses/${c.slug}`,
        })),
      ];

      return unifiedList;
    } catch (err) {
      ctx.body = err;
    }
  },

  // ✅ NEW: Availability Check Endpoint
  async checkAvailability(ctx) {
    const { slug, date, type } = ctx.query; // type = 'tour' or 'course'

    if (!slug || !date || !type) {
      return ctx.badRequest("Missing slug, date, or type");
    }

    try {
      // 1. Fetch the Product (Tour or Course) to find TOTAL CAPACITY
      const collectionName =
        type === "tour"
          ? "api::tour.tour"
          : "api::courses-collection.courses-collection";

      const product = await strapi.db.query(collectionName).findOne({
        where: { slug: slug },
        populate: ["pricingPeriods"],
      });

      if (!product) return ctx.notFound("Activity not found");

      // 2. Find the Active Pricing Period (for Max Capacity)
      const targetDate = parseISO(date);
      const activePeriod = product.pricingPeriods?.find((p) => {
        const start = parseISO(p.validFrom);
        const end = p.validTo ? parseISO(p.validTo) : new Date("2099-12-31");
        return isWithinInterval(targetDate, { start, end });
      });

      if (!activePeriod) {
        // Optional: If no pricing, maybe it's not bookable? For now returning 0.
        return ctx.send({
          available: 0,
          error: "No season found for this date",
        });
      }

      // 3. Define Total Capacity
      let totalCapacity =
        product.pricingMode === "static_per_booking"
          ? 1
          : activePeriod.maxParticipantsIncluded || 20;

      // 4. Count "Sold Seats" using Deep Filtering
      // We look for bookings that have items -> pointing to a session -> matching our product & date

      const relationField = type === "tour" ? "tour" : "courses_collection"; // Map to session field name

      // Define Start/End of the requested day for filtering
      const dayStart = startOfDay(targetDate).toISOString();
      const dayEnd = endOfDay(targetDate).toISOString();

      const validBookings = await strapi.entityService.findMany(
        "api::booking.booking",
        {
          filters: {
            status: { $ne: "cancelled" }, // Ignore cancelled
            items: {
              session: {
                // Match the specific Product
                [relationField]: {
                  slug: slug,
                },
                // Match the specific Date Range
                startDateTime: {
                  $gte: dayStart,
                  $lte: dayEnd,
                },
              },
            },
          },
          populate: {
            items: {
              populate: {
                session: {
                  populate: [relationField],
                },
              },
            },
          },
        }
      );

      // 5. Sum up the guests from the valid items
      let soldSeats = 0;

      validBookings.forEach((booking) => {
        // A booking might have multiple items (e.g. diving + snorkeling).
        // We only care about the item matching THIS session/date.
        if (booking.items) {
          booking.items.forEach((item) => {
            const session = item.session;
            if (session) {
              // Check if this item's session matches our target date & product
              const sessionDate = parseISO(session.startDateTime);
              const isSameDay = isWithinInterval(sessionDate, {
                start: startOfDay(targetDate),
                end: endOfDay(targetDate),
              });
              const isSameProduct = session[relationField]?.slug === slug;

              if (isSameDay && isSameProduct) {
                soldSeats += item.itemGuestCount || 0;
              }
            }
          });
        }
      });

      // 6. Private Charter Logic override
      if (product.pricingMode === "static_per_booking") {
        // If even ONE seat is sold, the whole boat is taken
        if (soldSeats > 0) soldSeats = 1;
      }

      // 7. Result
      const available = totalCapacity - soldSeats;

      return ctx.send({
        total: totalCapacity,
        booked: soldSeats,
        available: available > 0 ? available : 0,
        isPrivate: product.pricingMode === "static_per_booking",
      });
    } catch (err) {
      console.error("Check Availability Error:", err);
      return ctx.badRequest("Inventory check failed");
    }
  },
};
