const axios = require("axios");

module.exports = {
  async initializePayment(bookingData) {
    const auth = Buffer.from(
      `${process.env.SAFERPAY_USERNAME}:${process.env.SAFERPAY_PASSWORD}`
    ).toString("base64");

    const payload = {
      RequestHeader: {
        SpecVersion: "1.33",
        CustomerId: process.env.SAFERPAY_CUSTOMER_ID,
        RequestId: bookingData.bookingCode,
        RetryIndicator: 0,
      },
      TerminalId: process.env.SAFERPAY_TERMINAL_ID,
      Payment: {
        Amount: {
          Value: Math.round(bookingData.amount * 100), // Saferpay expects cents (e.g. 1000 for 10.00)
          CurrencyCode: bookingData.currency || "EUR",
        },
        OrderId: bookingData.bookingCode,
        Description: `Booking ${bookingData.bookingCode}`,
      },
      ReturnUrl: {
        Url: `${process.env.FRONTEND_URL}/confirmation?bookingCode=${bookingData.bookingCode}`,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.SAFERPAY_API_URL}/Payment/v1/PaymentPage/Initialize`,
        payload,
        { headers: { Authorization: `Basic ${auth}` } }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Saferpay Init Error:",
        error.response?.data || error.message
      );
      throw new Error("Payment Gateway Initialization Failed");
    }
  },

  async assertPayment(token) {
    const auth = Buffer.from(
      `${process.env.SAFERPAY_USERNAME}:${process.env.SAFERPAY_PASSWORD}`
    ).toString("base64");

    try {
      const response = await axios.post(
        `${process.env.SAFERPAY_API_URL}/Payment/v1/PaymentPage/Assert`,
        {
          RequestHeader: {
            SpecVersion: "1.33",
            CustomerId: process.env.SAFERPAY_CUSTOMER_ID,
            RequestId: `VERIFY-${Date.now()}`,
            RetryIndicator: 0,
          },
          Token: token,
        },
        { headers: { Authorization: `Basic ${auth}` } }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Saferpay Assert Error:",
        error.response?.data || error.message
      );
      throw new Error("Payment Verification Failed");
    }
  },
};
