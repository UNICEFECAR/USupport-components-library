import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Icon } from "../../icons";

import "./label.scss";

/**
 * Label
 *
 * Label component
 *
 * @return {jsx}
 */
export const Label = ({ text, onClick, classes, showSuccess }) => {
  return (
    <div
      className={["label-component", classNames(classes)].join(" ")}
      onClick={onClick}
    >
      <p className="small-text">{text}</p>
      {showSuccess && <Icon name="check" size="sm" />}
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

  /**
   * Additional classes to be added to the Label component
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  showSuccess: PropTypes.bool,
};

Label.defaultProps = {
  text: "",
  onClick: () => {},
  classes: null,
};
