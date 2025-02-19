import React, { useState } from "react";

import { Box } from "../../boxes/Box";
import { Toggle } from "../../inputs/Toggle";
import { Button } from "../../buttons/Button";

import "./cookie-banner.scss";

/**
 * CookieBanner
 *
 * CookieBanner
 *
 * @return {jsx}
 */
export const CookieBanner = ({ t, isInClient = false }) => {
  const hasHandledCookies = !!Number(localStorage.getItem("hasHandledCookies"));
  const showBanner = !hasHandledCookies;

  const [acceptAllCookies, setAcceptAllCookies] = useState(true);
  const [acceptOnlyNecessaryCookies, setAcceptOnlyNecessaryCookies] =
    useState(false);
  const [showCookiePolicyBanner, setShowCookiePolicyBanner] =
    useState(showBanner);

  const handleSave = () => {
    setShowCookiePolicyBanner(false);
    localStorage.setItem("acceptAllCookies", acceptAllCookies ? 1 : 0);
    localStorage.setItem(
      "acceptOnlyNecessaryCookies",
      acceptOnlyNecessaryCookies ? 1 : 0
    );
    localStorage.setItem("hasHandledCookies", 1);
  };

  const handleReject = () => {
    setShowCookiePolicyBanner(false);
    localStorage.setItem("acceptAllCookies", 0);
    localStorage.setItem("acceptOnlyNecessaryCookies", 0);
    localStorage.setItem("hasHandledCookies", 1);
  };

  if (!showCookiePolicyBanner) return null;

  return (
    <Box className="cookie-banner">
      <h3>{t("cookie_banner_header")}</h3>
      <p>{t("cookie_banner_text")}</p>
      {isInClient && (
        <div>
          <Toggle
            label={t("accept_all_cookies")}
            isToggled={acceptAllCookies}
            setParentState={(val) => {
              if (val) {
                setAcceptAllCookies(true);
                setAcceptOnlyNecessaryCookies(false);
              } else {
                setAcceptAllCookies(false);
              }
            }}
          />
          <Toggle
            label={t("accept_necessary_cookies")}
            isToggled={acceptOnlyNecessaryCookies}
            setParentState={(val) => {
              if (val) {
                setAcceptAllCookies(false);
                setAcceptOnlyNecessaryCookies(true);
              } else {
                setAcceptOnlyNecessaryCookies(false);
              }
            }}
          />
        </div>
      )}
      <div className="cookie-banner__buttons">
        <Button
          size="md"
          label={t(isInClient ? "save" : "accept_all_cookies")}
          disabled={!acceptAllCookies && !acceptOnlyNecessaryCookies}
          onClick={handleSave}
        />
        {!isInClient && (
          <Button
            size="md"
            label={t("reject_all_cookies")}
            onClick={handleReject}
          />
        )}
      </div>
    </Box>
  );
};
