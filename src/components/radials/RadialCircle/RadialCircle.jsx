import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./radial-circle.scss";

/**
 * RadialCircle
 *
 * Radial circle component to be rendered as a background
 *
 * @return {jsx}
 */
export const RadialCircle = ({ color, classes }) => {
  return (
    <div
      className={["radial-background", color, classNames(classes)].join(" ")}
    />
  );
};

RadialCircle.propTypes = {
  /**
   * Color of the radial circle
   * */
  color: PropTypes.oneOf(["blue", "purple"]),

  /**
   * Additional classes to be added to the radial circle
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

RadialCircle.defaultProps = {
  color: "purple",
  classes: "",
};
