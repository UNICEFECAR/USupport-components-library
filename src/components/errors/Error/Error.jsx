import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./error.scss";

/**
 * Error
 *
 * Error message
 *
 * @return {jsx}
 */
export const Error = ({ message, classes }) => {
  return (
    <p className={["small-text error-message", classNames(classes)].join(" ")}>
      {message}
    </p>
  );
};

Error.propTypes = {
  /**
   * Error message
   * */
  message: PropTypes.string.isRequired,

  /**
   * Additional classes
   * */
  classes: PropTypes.string,
};
