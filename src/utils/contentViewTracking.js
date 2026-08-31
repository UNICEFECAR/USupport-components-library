const VIEW_TRACKING_PREFIX = "content-view";

// A view is counted at most once per content item within this window. The
// blocks that fire view events are remounted whenever their page re-renders
// through a loading state, so an in-memory guard is not enough on its own.
export const CONTENT_VIEW_DEDUPE_MS = 30 * 60 * 1000;

const getStorage = () => {
  try {
    if (typeof window === "undefined") return null;
    return window.sessionStorage;
  } catch {
    // Storage can throw in private browsing / blocked-cookie contexts
    return null;
  }
};

/**
 * Returns true when a view event for the given content should be sent, and
 * stamps it so subsequent calls within CONTENT_VIEW_DEDUPE_MS return false.
 *
 * @param {string} contentType - "article" | "video" | "podcast"
 * @param {number|string} contentId
 * @returns {boolean}
 */
export const shouldTrackContentView = (contentType, contentId) => {
  if (!contentType || contentId === undefined || contentId === null) {
    return false;
  }

  const storage = getStorage();
  // Without storage we cannot dedupe across remounts, but we must not drop
  // tracking entirely - the caller still guards the common in-place case.
  if (!storage) return true;

  const key = `${VIEW_TRACKING_PREFIX}:${contentType}:${contentId}`;

  try {
    const lastTrackedAt = Number(storage.getItem(key)) || 0;
    if (Date.now() - lastTrackedAt < CONTENT_VIEW_DEDUPE_MS) {
      return false;
    }
    storage.setItem(key, String(Date.now()));
    return true;
  } catch {
    return true;
  }
};
