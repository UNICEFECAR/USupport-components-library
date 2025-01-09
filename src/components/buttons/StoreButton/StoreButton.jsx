import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Icon } from "../../icons/Icon";
import { Button } from "../Button";
import { ThemeContext } from "@USupport-components-library/utils";

import "./store-button.scss";

/**
 * StoreButton
 *
 * StoreButton component
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

  return (
    <Button
      type="secondary"
      classes={["btn--store", theme === "dark" && "btn--store--dark"].join(" ")}
      {...props}
    >
      {store === "google-play" ? (
        <Icon name={icon} size="lg" />
      ) : (
        <Icon
          name={icon}
          size="lg"
          color={
            store !== "google-play"
              ? theme === "dark"
                ? "#fff"
                : "#373737"
              : undefined
          }
        />
      )}
      <div className="btn__text-container">
        <p className="download">{downloadText}</p>
        <p className="text label">{label}</p>
      </div>
    </Button>
  );
};

StoreButton.propTypes = {
  /**
   * Store to render in the StoreButton component
   **/
  store: PropTypes.oneOf(["google-play", "app-store"]).isRequired,
};
