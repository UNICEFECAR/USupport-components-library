import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./toggle.scss";

/**
 * Toggle
 *
 * Toggle component
 *
 * @return {jsx}
 */
export const Toggle = ({ isToggled, onToggle, isDisabled, classes }) => {
  return (
    <label
      className={[
        "toggle",
        isDisabled ? "toggle-disabled" : "",
        classNames(classes),
      ].join(" ")}
    >
      <input
        type="checkbox"
        checked={isToggled}
        onChange={isDisabled ? () => {} : onToggle}
      />
      <span className="toggle__slider" />
    </label>
  );
};

Toggle.propTypes = {
  /**
   * Is the toggle checked
   */
  isToggled: PropTypes.bool,

  /**
   * Function to set the toggle checked state
   * */
  onToggle: PropTypes.func,

  /**
   * If the toggle is disabled
   * @default false
   * */
  isDisabled: PropTypes.bool,

  /**
   * Additional classes to pass to the toggle
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Toggle.defaultProps = {
  isDisabled: false,
};
