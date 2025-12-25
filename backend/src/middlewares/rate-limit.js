const ratelimit = require("koa-ratelimit");

module.exports = ({ strapi }) => {
  // ✅ Define whitelist
  const WHITELIST = ["localhost"];

  return ratelimit({
    driver: "memory", // use Redis in production
    db: new Map(),
    duration: 60 * 1000, // 1 minute
    errorMessage: "Too many requests, slow down.",
    max: 1000,
    id: (ctx) => ctx?.ip,
    whitelist: (ctx) => WHITELIST.includes(ctx.ip),
    headers: {
      remaining: "Rate-Limit-Remaining",
      reset: "Rate-Limit-Reset",
      total: "Rate-Limit-Total",
    },
  });
};
