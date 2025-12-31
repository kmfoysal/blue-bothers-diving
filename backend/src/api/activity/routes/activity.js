const { createCoreRouter } = require("@strapi/strapi").factories;

// module.exports = createCoreRouter('api::activity.activity');

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/activities", // The endpoint will be /api/activities
      handler: "activity.getAllActivities",
      config: {
        auth: false, // Publicly accessible
      },
    },
    // ✅ NEW ROUTE
    {
      method: "GET",
      path: "/availability/check",
      handler: "activity.checkAvailability",
      config: { auth: false }, // Public access
    },
  ],
};
