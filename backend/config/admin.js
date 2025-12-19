module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
  // rateLimit: {
  //   enabled: true,
  //   interval: { hour: 1, min: 30 }, // time window
  //   max: 100, // max requests in window
  //   delayAfter: 1, // optional: start delaying after N requests
  //   timeWait: 3 * 1000, // delay in ms
  //   prefixKey: "${userEmail}:${ctx.request.path}:${ctx.request.ip}",
  //   whitelist: [], // IPs to skip rate limiting
   
  // },
  auditLogs: {
    enabled: env.bool("AUDIT_LOGS_ENABLED", true),
    retentionDays: 120, // how long to keep logs
  },
});
