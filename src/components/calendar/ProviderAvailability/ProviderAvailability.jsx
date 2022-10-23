import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon";

import "./provider-availability.scss";
import classNames from "classnames";

/**
 * ProviderAvailability
 *
 * Provider availability card
 *
 * @return {jsx}
 */
export const ProviderAvailability = ({
  isAvailable,
  availableText,
  unavailableText,
  classes,
}) => {
  return (
    <div
      className={[
        "provider-availability",
        isAvailable
          ? "provider-availability--available"
          : "provider-availability--unavailable",
        classNames(classes),
      ].join(" ")}
    >
      <div
        className={[
          "provider-availability__circle-indicator",
          isAvailable
            ? "provider-availability__circle-indicator--active"
            : "provider-availability__circle-indicator--inactive",
        ].join(" ")}
      />

      <p className="text">{isAvailable ? availableText : unavailableText}</p>
      <div className="provider-availability__icon-container">
        <Icon name="three-dots-vertical" />
      </div>
    </div>
  );
};

ProviderAvailability.propTypes = {
  /**
   * If the provider is available or not
   */
  isAvailable: PropTypes.bool,

  /**
   * Text(translated in the used language) to display when the provider is available
   */
  availableText: PropTypes.string,

  /**
   * Text(translated in the used language) to display when the provider is unavailable
   */
  unavailableText: PropTypes.string,

  /**
   * Additional classes to be added to the provier availability component
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ProviderAvailability.defaultProps = {
  isAvailable: false,
  availableText: "Available",
  unavailableText: "Unavailable",
};
