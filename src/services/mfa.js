import {
  startAuthentication,
  startRegistration,
  browserSupportsWebAuthn,
} from "@simplewebauthn/browser";

import http from "./http";

const API = `${import.meta.env.VITE_API_ENDPOINT}/v1/admin`;

export const isPasskeySupported = () => browserSupportsWebAuthn();

export async function loginCredentials(email, password, role) {
  return http.post(`${API}/login/credentials`, {
    email: email.toLowerCase(),
    password,
    role,
  });
}

export async function passkeyMfaOptions(mfaSessionId) {
  return http.post(`${API}/mfa/passkey/options`, { mfaSessionId });
}

export async function passkeyMfaVerify(mfaSessionId, assertion) {
  return http.post(`${API}/mfa/passkey/verify`, {
    mfaSessionId,
    ...assertion,
  });
}

export async function emailMfaRequest(mfaSessionId) {
  return http.post(`${API}/mfa/email/request`, { mfaSessionId });
}

export async function emailMfaVerify(mfaSessionId, otp) {
  return http.post(`${API}/mfa/email/verify`, { mfaSessionId, otp });
}

export async function completePasskeyMfa(mfaSessionId) {
  const { data: options } = await passkeyMfaOptions(mfaSessionId);
  const assertion = await startAuthentication({ optionsJSON: options });
  return passkeyMfaVerify(mfaSessionId, assertion);
}

export async function getMfaSettings() {
  return http.get(`${API}/mfa/settings`);
}

export async function updateMfaSettings(enabled, password) {
  return http.patch(`${API}/mfa/settings`, { enabled, password });
}

export async function registerPasskeyOptions() {
  return http.post(`${API}/mfa/passkey/register/options`, {});
}

export async function registerPasskeyVerify(name, attestation) {
  return http.post(`${API}/mfa/passkey/register/verify`, {
    name,
    ...attestation,
  });
}

export async function listPasskeys() {
  return http.get(`${API}/mfa/passkey/credentials`);
}

export async function deletePasskey(passkeyId) {
  return http.delete(`${API}/mfa/passkey/credentials/${passkeyId}`);
}

export async function registerPasskey(name) {
  const { data: options } = await registerPasskeyOptions();
  const attestation = await startRegistration({ optionsJSON: options });
  return registerPasskeyVerify(name, attestation);
}

const exportedFunctions = {
  isPasskeySupported,
  loginCredentials,
  passkeyMfaOptions,
  passkeyMfaVerify,
  emailMfaRequest,
  emailMfaVerify,
  completePasskeyMfa,
  getMfaSettings,
  updateMfaSettings,
  registerPasskey,
  listPasskeys,
  deletePasskey,
};

export default exportedFunctions;
