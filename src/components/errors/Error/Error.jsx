import React from "react";
import PropTypes from "prop-types";

import "./error.scss";

/**
 * Error
 *
 * Error message
 *
 * @return {jsx}
 */
export const Error = ({ message }) => {
  return <p className="small-text error-message">{message}</p>;
};

Error.propTypes = {
  /**
   * Error message
   * */
  message: PropTypes.string.isRequired,
};

Error.defaultProps = {};
