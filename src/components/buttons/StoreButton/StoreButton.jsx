import React from "react";
import PropTypes from "prop-types";

import "./storebutton.scss";

import { Icon } from "../../icons/Icon/Icon";
import { Button } from "../Button/Button";

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
    <Button type="secondary" classes={["btn--store"]} {...rest}>
      <div className="content-container">
        <Icon name={icon} size="lg" />
        <div className="text-container">
          <p>Download from</p>
          <p>{label}</p>
        </div>
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

StoreButton.defaultProps = {
  // Add defaultProps here
};
