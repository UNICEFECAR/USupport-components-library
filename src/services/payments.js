import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/payments`;

/**
 * used to create payment intent.
 *
 * @param {string} subject text written in the subjet of the email
 * @param {string} title the title of the email
 * @param {string} text the text of the email
 *
 * @returns {boolean} false if there was a problem with the email
 */
async function createPaymentIntent({ body }) {
  const response = await http.post(
    `${API_ENDPOINT}/one-time/create-payment-intent`,
    body
  );

  return response;
}

const exportedFunctions = {
  createPaymentIntent,
};

export default exportedFunctions;
