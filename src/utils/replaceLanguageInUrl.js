const platforms = ["client", "provider", "country-admin", "global-admin"];

export default function replaceLanguageInUrl(newLanguage) {
  const { pathname, search, hash } = window.location;
  const segments = pathname.split("/").filter(Boolean);

  // if none of the segments are in the platforms array, then we are in the website
  const isInWebsite = platforms.every(
    (platform) => !segments.includes(platform)
  );

  if (isInWebsite) {
    segments[0] = newLanguage;
  } else if (segments.length > 0) {
    segments[1] = newLanguage;
  } else {
    segments.unshift(newLanguage);
  }

  const newPath = "/" + segments.join("/") + search + hash;
  window.history.replaceState(null, "", newPath);
}

const getLanguageFromUrl = () => {
  const url = window.location.pathname;
  const segments = url.split("/").filter(Boolean);
  const isInWebsite = platforms.every(
    (platform) => !segments.includes(platform)
  );
  if (isInWebsite) {
    return segments[0];
  }
  return segments[1];
};

export { replaceLanguageInUrl, getLanguageFromUrl };
