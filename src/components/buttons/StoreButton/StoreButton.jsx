import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Icon } from "../../icons/Icon";
import { Button } from "../Button";
import { ThemeContext } from "@USupport-components-library/utils";

import "./store-button.scss";

/**
 * StoreButton
 *
 * StoreButton component with high contrast mode support
 *
 * @return {jsx}
 */
export const StoreButton = ({
  downloadText,
  store,
  browserLabel,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const icon =
    store === "google-play"
      ? "google-play"
      : store === "web"
        ? "globe"
        : "app-store";

  const label =
    store === "google-play"
      ? "Google Play"
      : store === "web"
        ? browserLabel
        : "App Store";

  const handleClick = () => {
    if (store === "google-play") {
      window.open(
        "https://play.google.com/store/apps/details?id=org.unicef.ecar.usupport",
        "_blank",
      );
    } else if (store === "app-store") {
      window.open(
        "https://apps.apple.com/kz/app/usupport/id6447319853",
        "_blank",
      );
    } else if (store === "web") {
      window.location.href = `/client/${localStorage.getItem(
        "language",
      )}/register-preview`;
      window.scrollTo(0, 0);
    }
  };

  const getStoreButtonClasses = () => {
    const classes = ["btn--store"];

    if (theme === "highContrast") {
      classes.push("btn--store--high-contrast", "btn--high-contrast");
    }

    return classes.join(" ");
  };

  const getIconColor = () => {
    if (theme === "highContrast") {
      return undefined;
    }

    if (store !== "google-play") {
      return theme === "dark" ? "#fff" : "#373737";
    }

    return undefined;
  };

  return (
    <Button
      type={theme === "highContrast" ? "primary" : "secondary"}
      classes={getStoreButtonClasses()}
      onClick={handleClick}
      aria-label={`${downloadText} ${label}`}
      {...props}
    >
      <Icon
        name={icon}
        size="xl"
        color={getIconColor()}
        aria-hidden={theme === "highContrast" ? "true" : undefined}
      />
      <div className="btn__text-container">
        <p className="download">{downloadText}</p>
        <p className="text label">{label}</p>
      </div>
    </Button>
  );
};
