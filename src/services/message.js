import http from "./http";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/messaging`;

async function getChatData(chatId, { limit, before } = {}) {
  const params = new URLSearchParams({ chatId });
  if (limit != null) params.set("limit", String(limit));
  if (before != null) params.set("before", String(before));
  const response = await http.get(`${API_ENDPOINT}/?${params.toString()}`);
  return response;
}

async function sendMessage(payload) {
  const response = await http.put(`${API_ENDPOINT}/`, payload);
  return response;
}

async function getAllChatData(providerDetailId, clientDetailId) {
  const response = await http.get(
    `${API_ENDPOINT}/all-chat-data?providerDetailId=${providerDetailId}&clientDetailId=${clientDetailId}`
  );
  return response;
}

const exportedFunctions = {
  getChatData,
  sendMessage,
  getAllChatData,
};

export default exportedFunctions;
