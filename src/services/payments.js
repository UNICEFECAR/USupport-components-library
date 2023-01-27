import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/payments`;

/**
 * used to create payment intent.
 *
 * @param {string} consultationId - the id of an existing consultation
 *
 * @returns {Promise} - Promise object represents the response from the server containing the client secret
 */
async function createPaymentIntent(consultationId) {
  const response = await http.post(
    `${API_ENDPOINT}/one-time/create-payment-intent`,
    { consultationId: consultationId }
  );

  return response;
}

/**
 * used to create retrieve payment history for existent users.
 *
 * @returns {Promise} - Promise object represents the response from the server containing the client secret
 */
async function getPaymentHistory() {
  const response = await http.get(`${API_ENDPOINT}/one-time/history`);

  return response;
}

/**
 * used to refund payment intent.
 *
 * @param {string} consultaitonId - the id of an existing consultation
 *
 * @returns {Promise} - Promise object represents the response from the server containing the client secret
 */
async function refund(consultationId) {
  const response = await http.post(`${API_ENDPOINT}/one-time/refund`, {
    consultationId: consultationId,
  });

  return response;
}

const exportedFunctions = {
  createPaymentIntent,
  getPaymentHistory,
  refund,
};

export default exportedFunctions;
