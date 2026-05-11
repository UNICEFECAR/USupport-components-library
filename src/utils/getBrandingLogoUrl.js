/**
 * S3 logo URL for the active country and theme (matches Footer / Navbar).
 *
 * @param {object} [options]
 * @param {"light"|"dark"|"highContrast"} [options.theme="light"]
 * @param {string|null|undefined} [options.countryCode] If omitted, uses `localStorage.country` or "KZ".
 * @returns {string}
 */
export function getBrandingLogoUrl({ theme = "light", countryCode } = {}) {
  const bucket = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;
  const darkSuffix = theme === "light" ? "" : "-dark";

  let country;
  if (countryCode !== undefined) {
    country = countryCode;
  } else if (typeof localStorage !== "undefined") {
    country = localStorage.getItem("country") || "KZ";
  } else {
    country = "KZ";
  }

  if (country && country !== "global") {
    return `${bucket}/logo-horizontal-${country}${darkSuffix}`;
  }

  return `${bucket}/logo-horizontal${darkSuffix}`;
}
