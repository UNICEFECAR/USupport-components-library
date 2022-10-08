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
  return <div className={classNames(["radial-background", color, classes])} />;
};

RadialCircle.propTypes = {
  /**
   * Color of the radial circle
   * */
  color: PropTypes.oneOf(["blue", "purple"]),
  /**
   * Additional classes to be added to the grid item
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

RadialCircle.defaultProps = {
  color: "purple",
  classes: "",
};
