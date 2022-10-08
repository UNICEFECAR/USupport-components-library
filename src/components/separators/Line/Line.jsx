import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./line.scss";

/**
 * Line
 *
 * Line separator component
 *
 * @return {jsx}
 */
export const Line = ({ classes }) => {
  return <div className={["line", classNames(classes)].join(" ")} />;
};

Line.propTypes = {
  /**
   * Additional classes
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Line.defaultProps = {
  // Add defaultProps here
};
