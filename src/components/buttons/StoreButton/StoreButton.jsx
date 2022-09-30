import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";
import { Button } from "../Button/Button";

import "./storebutton.scss";

/**
 * StoreButton
 *
 * StoreButton component
 *
 * @return {jsx}
 */
export const StoreButton = ({ store, ...rest }) => {
  const icon = store === "google-play" ? "google-play" : "app-store";
  const label = store === "google-play" ? "Google Play" : "App Store";

  return (
    <Button type="secondary" classes="btn--store" {...rest}>
      <Icon name={icon} size="lg" />
      <div className="btn__text-container">
        <p className="download">Download from</p>
        <p className="label">{label}</p>
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