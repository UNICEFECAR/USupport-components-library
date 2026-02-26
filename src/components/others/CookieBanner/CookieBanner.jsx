import React, { useState, useEffect } from "react";

import { Box } from "../../boxes/Box";
import { Toggle } from "../../inputs/Toggle";
import { NewButton } from "../../buttons";

import "./cookie-banner.scss";

/**
 * CookieBanner
 *
 * CookieBanner
 *
 * @return {jsx}
 */
export const CookieBanner = ({
  t,
  isInClient = false,
  text,
  cookieState,
  setCookieState,
}) => {
  const IS_PS = localStorage.getItem("country") === "PS";
  const [acceptAllCookies, setAcceptAllCookies] = useState(true);
  const [acceptOnlyNecessaryCookies, setAcceptOnlyNecessaryCookies] =
    useState(false);

  useEffect(() => {
    if (cookieState.isBannerOpen && cookieState.hasHandledCookies) {
      setAcceptAllCookies(cookieState.hasAcceptedAllCookies);
      setAcceptOnlyNecessaryCookies(cookieState.hasAcceptedNecessaryCookies);
    }
  }, [cookieState]);

  const handleSave = () => {
    localStorage.setItem("hasHandledCookies", 1);
    if (isInClient) {
      localStorage.setItem("acceptAllCookies", acceptAllCookies ? 1 : 0);
      localStorage.setItem(
        "acceptOnlyNecessaryCookies",
        acceptOnlyNecessaryCookies ? 1 : 0,
      );

      setCookieState({
        ...cookieState,
        hasAcceptedAllCookies: acceptAllCookies,
        hasAcceptedNecessaryCookies: acceptOnlyNecessaryCookies,
        hasHandledCookies: true,
        isBannerOpen: false,
      });
    } else {
      localStorage.setItem("acceptAllCookies", 1);
      setCookieState({
        ...cookieState,
        hasAcceptedCookies: true,
        hasHandledCookies: true,
        isBannerOpen: false,
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem("acceptAllCookies", 0);
    localStorage.setItem("acceptOnlyNecessaryCookies", 0);
    localStorage.setItem("hasHandledCookies", 1);
    setCookieState({
      ...cookieState,
      hasAcceptedAllCookies: false,
      hasAcceptedNecessaryCookies: false,
      hasHandledCookies: true,
      isBannerOpen: false,
    });
  };

  if (!cookieState.isBannerOpen || IS_PS) return null;

  return (
    <Box liquidGlass classes="cookie-banner">
      <h3>{t("cookie_banner_header")}</h3>
      <p>{text}</p>
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
        <NewButton
          size="md"
          label={t(isInClient ? "save" : "accept_all_cookies")}
          disabled={
            isInClient
              ? !acceptAllCookies && !acceptOnlyNecessaryCookies
              : false
          }
          onClick={handleSave}
        />
        {!isInClient && (
          <NewButton
            size="md"
            label={t("reject_all_cookies")}
            onClick={handleReject}
          />
        )}
      </div>
    </Box>
  );
};
