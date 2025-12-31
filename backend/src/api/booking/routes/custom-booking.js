module.exports = {
  routes: [
    {
      method: "POST",
      path: "/booking/initiate",
      handler: "custom-booking.initiate",
      config: { auth: false }, // Open for public checkout
    },
    {
      method: "POST",
      path: "/booking/confirm",
      handler: "custom-booking.confirm",
      config: { auth: false },
    },
  ],
};
