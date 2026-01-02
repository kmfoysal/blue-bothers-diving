"use strict";

const {
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
} = require("date-fns");

module.exports = {
  // 1. Get All Activities (Combined Tours & Courses)
  async getAllActivities(ctx) {
    const { locale } = ctx.query;
    const lang = locale || "en";

    try {
      // Fetch TOURS
      const tours = await strapi.entityService.findMany("api::tour.tour", {
        locale: lang,
        populate: {
          page_banner: { populate: { background: true } },
          categories: true,
          pricingPeriods: { populate: { sessionPricingTiers: true } },
        },
      });

      // Fetch COURSES
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

      // Normalize & Merge
      const unifiedList = [
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

  // 2. Check Availability (With Session & Trip Details)
  async checkAvailability(ctx) {
    const { slug, date, type } = ctx.query; // type = 'tour' or 'course'

    if (!slug || !date || !type) {
      return ctx.badRequest("Missing slug, date, or type");
    }

    try {
      // A. Fetch the Product
      const collectionName =
        type === "tour"
          ? "api::tour.tour"
          : "api::courses-collection.courses-collection";

      const product = await strapi.db.query(collectionName).findOne({
        where: { slug: slug },
        populate: ["pricingPeriods"],
      });

      if (!product) return ctx.notFound("Activity not found");

      // B. Setup Date Helpers
      const relationField = type === "tour" ? "tour" : "courses_collection";
      const targetDate = parseISO(date);
      const dayStart = startOfDay(targetDate).toISOString();
      const dayEnd = endOfDay(targetDate).toISOString();

      // C. Fetch the Session
      const session = await strapi.db.query("api::session.session").findOne({
        where: {
          [relationField]: { id: product.id },
          startDateTime: {
            $gte: dayStart,
            $lte: dayEnd,
          },
        },
        populate: ["trip"],
      });

      // D. Find Active Pricing Period
      const activePeriod = product.pricingPeriods?.find((p) => {
        const start = parseISO(p.validFrom);
        const end = p.validTo ? parseISO(p.validTo) : new Date("2099-12-31");
        return isWithinInterval(targetDate, { start, end });
      });

      if (!activePeriod) {
        return ctx.send({
          available: 0,
          error: "No season found for this date",
        });
      }

      // E. Define Total Capacity
      let totalCapacity;
      if (product.pricingMode === "static_per_booking") {
        totalCapacity = 1;
      } else {
        totalCapacity =
          session?.capacity || activePeriod.maxParticipantsIncluded || 20;
      }

      // F. Count "Sold Seats"
      // ✅ FIX 1: Use 'bookingStatus' and 'bookingItems' in filters
      const validBookings = await strapi.entityService.findMany(
        "api::booking.booking",
        {
          filters: {
            bookingStatus: { $ne: "cancelled" }, // Updated from 'status'
            bookingItems: {
              // Updated from 'items'
              session: {
                [relationField]: {
                  slug: slug,
                },
                startDateTime: {
                  $gte: dayStart,
                  $lte: dayEnd,
                },
              },
            },
          },
          populate: {
            bookingItems: {
              // Updated from 'items'
              populate: {
                session: {
                  populate: [relationField],
                },
              },
            },
          },
        }
      );

      let soldSeats = 0;

      validBookings.forEach((booking) => {
        // ✅ FIX 2: Loop through 'bookingItems'
        if (booking.bookingItems) {
          booking.bookingItems.forEach((item) => {
            const itemSession = item.session;
            if (itemSession) {
              const sessionDate = parseISO(itemSession.startDateTime);
              const isSameDay = isWithinInterval(sessionDate, {
                start: startOfDay(targetDate),
                end: endOfDay(targetDate),
              });

              // Safe check for relation
              const relationData = itemSession[relationField];
              const isSameProduct = relationData?.slug === slug;

              if (isSameDay && isSameProduct) {
                soldSeats += item.itemGuestCount || 0;
              }
            }
          });
        }
      });

      if (product.pricingMode === "static_per_booking" && soldSeats > 0) {
        soldSeats = 1;
      }

      const available = totalCapacity - soldSeats;

      // G. Extract Trip/Boat Details
      const tripDetails = session?.trip
        ? {
            boatName: session.trip.boatName || session.trip.name,
            kind: session.trip.kind,
          }
        : null;

      // H. Return Response
      return ctx.send({
        total: totalCapacity,
        booked: soldSeats,
        available: available > 0 ? available : 0,
        isPrivate: product.pricingMode === "static_per_booking",
        boatName: tripDetails?.boatName || null,
        kind: tripDetails?.kind || null,
        isSessionAvailable: session ? true : false,
      });
    } catch (err) {
      console.error("Check Availability Error:", err);
      return ctx.badRequest("Inventory check failed");
    }
  },
};
