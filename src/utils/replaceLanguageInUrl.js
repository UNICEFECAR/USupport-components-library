export default function replaceLanguageInUrl(newLanguage) {
  const { pathname, search, hash } = window.location;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0) {
    segments[0] = newLanguage;
  } else {
    segments.unshift(newLanguage);
  }

  const newPath = "/" + segments.join("/") + search + hash;

  window.history.replaceState(null, "", newPath);
}

const getLanguageFromUrl = () => {
  const url = window.location.pathname;
  const segments = url.split("/");
  return segments[1];
};

export { replaceLanguageInUrl, getLanguageFromUrl };
