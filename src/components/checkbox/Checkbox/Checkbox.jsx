import React from "react";
import PropTypes from "prop-types";

import "./checkbox.scss";

/**
 * Checkbox
 *
 * Checkbox component
 *
 * @return {jsx}
 */
export const Checkbox = ({
  text,
  isChecked,
  setIsChecked,
  disabled,
  ...rest
}) => {
  return (
    <div className={["checkbox-wrapper", disabled ? "disabled" : ""].join(" ")}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={disabled ? () => {} : () => setIsChecked(!isChecked)}
        className={[isChecked ? "checked" : ""]}
        {...rest}
      />
      {text ? <p className="text">{text}</p> : null}
    </div>
  );
};

Checkbox.propTypes = {
  /**
   * Label for the checkbox if needed
   **/
  label: PropTypes.string,

  /**
   * Is the checkbox checked
   **/
  isChecked: PropTypes.bool,

  /**
   * Function to set the checkbox checked state
   **/
  setIsChecked: PropTypes.func,

  /**
   * If the checkbox is disabled
   * @default false
   **/
  disabled: PropTypes.bool,

  /**
   * Additional props to pass to the checkbox
   **/
  rest: PropTypes.object,
};

Checkbox.defaultProps = {
  disabled: false,
};
