"use strict";

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
};
