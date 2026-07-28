const KEEP_ME_SIGNED_IN_KEY = "keep-me-signed-in";

export function setKeepMeSignedIn(enabled) {
  if (enabled) {
    localStorage.setItem(KEEP_ME_SIGNED_IN_KEY, "true");
  } else {
    localStorage.removeItem(KEEP_ME_SIGNED_IN_KEY);
  }
}

export function isKeepMeSignedIn() {
  return localStorage.getItem(KEEP_ME_SIGNED_IN_KEY) === "true";
}

export function clearKeepMeSignedIn() {
  localStorage.removeItem(KEEP_ME_SIGNED_IN_KEY);
}

/** Call from login success — persists or clears the flag only. */
export function applyKeepMeSignedInOnLogin(keepMeSignedIn) {
  if (keepMeSignedIn) {
    setKeepMeSignedIn(true);
  } else {
    clearKeepMeSignedIn();
  }
}
