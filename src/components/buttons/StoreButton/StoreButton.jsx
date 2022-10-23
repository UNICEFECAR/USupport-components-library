import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon";
import { Button } from "../Button";

import "./store-button.scss";

/**
 * StoreButton
 *
 * StoreButton component
 *
 * @return {jsx}
 */
export const StoreButton = ({ downloadText, store, ...props }) => {
  const icon = store === "google-play" ? "google-play" : "app-store";
  const label = store === "google-play" ? "Google Play" : "App Store";

  return (
    <Button type="secondary" classes="btn--store" {...props}>
      <Icon name={icon} size="lg" />
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
