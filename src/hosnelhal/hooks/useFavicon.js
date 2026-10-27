import { useEffect } from "react";

/**
 * Show a program's icon in the browser tab while its pages are mounted and
 * restore the previous one afterwards
 *
 * @param {string} href - icon URL
 * @param {string} type - icon MIME type
 */
export const useFavicon = (href, type = "image/png") => {
  useEffect(() => {
    const icon = document.querySelector("link[rel~='icon']");
    if (!icon || !href) return undefined;

    const original = { href: icon.getAttribute("href"), type: icon.type };
    icon.type = type;
    icon.href = href;

    return () => {
      icon.type = original.type;
      icon.setAttribute("href", original.href);
    };
  }, [href, type]);
};
