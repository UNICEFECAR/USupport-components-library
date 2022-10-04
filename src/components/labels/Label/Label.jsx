import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./label.scss";

/**
 * Label
 *
 * Label component
 *
 * @return {jsx}
 */
export const Label = ({ text, onClick, classes }) => {
  return (
    <div
      className={["label-component", classNames(classes)].join(" ")}
      onClick={onClick}
    >
      <p className="small-text">{text}</p>
    </div>
  );
};

Label.propTypes = {
  /**
   * Text to display
   */
  text: PropTypes.string.isRequired,

  /**
   * Function to call when clicked
   */
  onClick: PropTypes.func,
};

Label.defaultProps = {
  // Add defaultProps here
};
