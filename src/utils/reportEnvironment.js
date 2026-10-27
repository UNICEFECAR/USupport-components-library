// Best-effort diagnostic metadata, never used for access control or UI behaviour.
export const collectReportEnvironment = () => {
  const ua = navigator.userAgent || "";
  const browsers = [
    ["Edge", /Edg(?:A|iOS)?\/([\d.]+)/],
    ["Opera", /OPR\/([\d.]+)/],
    ["Firefox", /(?:Firefox|FxiOS)\/([\d.]+)/],
    ["Chrome", /(?:Chrome|CriOS)\/([\d.]+)/],
    ["Safari", /Version\/([\d.]+).*Safari/],
  ];
  const browser = browsers.find(([, pattern]) => pattern.test(ua));
  const systems = [
    ["Android", /Android[ /]([\d.]+)/],
    ["iOS", /(?:CPU(?: iPhone)? OS|iPhone OS) ([\d_]+)/],
    ["Windows", /Windows NT ([\d.]+)/],
    ["macOS", /Mac OS X ([\d_]+)/],
    ["Linux", /Linux/],
  ];
  const system = systems.find(([, pattern]) => pattern.test(ua));
  const tablet =
    /iPad|Tablet/i.test(ua) ||
    (/Android/i.test(ua) && !/Mobile/i.test(ua)) ||
    (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  const phone = !tablet && /Mobile|iPhone|iPod/i.test(ua);
  let timezone = null;
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    /* optional */
  }
  return {
    source: "web",
    deviceType: tablet
      ? "tablet"
      : phone
      ? "phone"
      : /Windows|Macintosh|Linux|X11/.test(ua)
      ? "desktop"
      : "unknown",
    browserName: browser?.[0] || null,
    browserVersion: browser ? ua.match(browser[1])?.[1] || null : null,
    osName: tablet && /Macintosh/.test(ua) ? "iOS" : system?.[0] || null,
    osVersion: system
      ? ua.match(system[1])?.[1]?.replace(/_/g, ".") || null
      : null,
    reporterTimezone: timezone,
    interfaceLanguage: (
      document.documentElement.lang ||
      localStorage.getItem("language") ||
      "en"
    ).slice(0, 16),
  };
};
export const createReportKey = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    ""
  );
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
    12,
    16
  )}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};
