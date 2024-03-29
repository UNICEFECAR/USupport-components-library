import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ThemeContext } from "../../../utils";

import "./toggle.scss";

/**
 * Toggle
 *
 * Toggle component
 *
 * @return {jsx}
 */
export const Toggle = ({
  isToggled,
  setParentState,
  shouldChangeState,
  isDisabled,
  classes,
  label,
  labelClasses,
}) => {
  const { theme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(isToggled);

  const handleChange = () => {
    if (isDisabled) return;
    if (shouldChangeState) {
      setChecked(!checked);
    }
    setParentState(!checked);
  };

  // Always make sure that the checked state is in sync with the parent state
  useEffect(() => {
    if (isToggled !== checked) {
      setChecked(isToggled);
    }
  }, [isToggled, checked]);

  return (
    <div className="toggle-wrapper">
      {label && (
        <p
          className={[
            `text toggle__label ${labelClasses}`,
            theme === "dark" && "toggle__label--dark",
          ].join(" ")}
        >
          {label}
        </p>
      )}
      <label
        className={[
          "toggle",
          isDisabled ? "toggle-disabled" : "",
          classNames(classes),
        ].join(" ")}
      >
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="toggle__slider" />
      </label>
    </div>
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
   * Set the toggle value in the parent component
   */
  setParentState: PropTypes.func,

  /**
   * Should the toggle change state
   */
  shouldChangeState: PropTypes.bool,

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
  setParentState: () => {},
  shouldChangeState: true,
};
