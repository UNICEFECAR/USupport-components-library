import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/email`;

/**
 * used to send an email
 *
 * @param {string} subject text written in the subjet of the email
 * @param {string} title the title of the email
 * @param {string} text the text of the email
 * @param {string} email email for reply-to
 *
 * @returns {boolean} false if there was a problem with the email
 */
async function sendAdmin({ subject, title, text, email }) {
  const response = await http.post(`${API_ENDPOINT}/admin`, {
    subject,
    title,
    text,
    email,
  });

  return response;
}

const exportedFunctions = {
  sendAdmin,
};

export default exportedFunctions;
