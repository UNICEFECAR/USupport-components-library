import React from "react";
import PropTypes from "prop-types";

import "./card-icon-and-label.scss";
import { Icon } from "../../icons/Icon";
import classNames from "classnames";

/**
 * CardIconAndLabel
 *
 * Component with an Icon and Label
 *
 * @return {jsx}
 */
export const CardIconAndLabel = ({ iconName, size, label, classes }) => {
  return (
    <div className={`card-icon-and-label size-${size} ${classNames(classes)}`}>
      <Icon name={iconName} size="lg" />
      <p className={`label ${size === "lg" ? "text" : "small-text"}`}>
        {label}
      </p>
    </div>
  );
};

CardIconAndLabel.propTypes = {
  /**
   * Icon name
   */
  iconName: PropTypes.oneOf(["therapy", "self-care", "community"]).isRequired,

  /**
   * Size of the card
   */
  size: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Label
   */
  label: PropTypes.string.isRequired,

  /**
   * Additional classes to be added to the CardIconAndLabel
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CardIconAndLabel.defaultProps = {
  iconName: "therapy",
  size: "lg",
  label: "Self care",
};
