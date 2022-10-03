import React from "react";
import PropTypes from "prop-types";

import "./textarea.scss";

/**
 * InputTextArea
 *
 * Input TextArea component
 *
 * @return {jsx}
 */
export const TextArea = ({ label, ...rest }) => {
  return (
    <div className="text-area--container">
      <p className="label">{label}</p>
      <textarea className="text-area" {...rest}></textarea>
    </div>
  );
};

InputTextArea.propTypes = {
  /**
   * Input label
   **/
  label: PropTypes.string,
};

InputTextArea.defaultProps = {
  // Add defaultProps here
};
