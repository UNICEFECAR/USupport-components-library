/**
 * Global scroll lock with reference counting.
 *
 * Some parts of the app use `react-modal` and others use custom backdrops.
 * When multiple overlays are open (or open/close quickly), direct style toggles
 * can fight each other. This utility ensures scroll is only restored when the
 * last lock is released.
 */
import { useEffect } from "react";

const LOCK_KEY = "__usupportScrollLockCount";
const STYLE_KEY = "__usupportScrollLockPrevStyles";
const HTML = () => document.documentElement;
const BODY = () => document.body;

function getCount() {
  return Number(window[LOCK_KEY] || 0);
}

function setCount(next) {
  window[LOCK_KEY] = next;
}

function savePrevStylesOnce() {
  if (window[STYLE_KEY]) return;
  window[STYLE_KEY] = {
    htmlOverflow: HTML().style.overflow,
    bodyOverflow: BODY().style.overflow,
  };
}

function restorePrevStyles() {
  const prev = window[STYLE_KEY];
  if (!prev) return;
  HTML().style.overflow = prev.htmlOverflow || "";
  BODY().style.overflow = prev.bodyOverflow || "";
  delete window[STYLE_KEY];
}

export function lockPageScroll() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const count = getCount();
  if (count === 0) {
    savePrevStylesOnce();
    HTML().style.overflow = "hidden";
    BODY().style.overflow = "hidden";
  }
  setCount(count + 1);
}

export function unlockPageScroll() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const count = getCount();
  const next = Math.max(0, count - 1);
  setCount(next);
  if (next === 0) {
    restorePrevStyles();
  }
}

/**
 * React hook wrapper around lock/unlock.
 */
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [isLocked]);
}

