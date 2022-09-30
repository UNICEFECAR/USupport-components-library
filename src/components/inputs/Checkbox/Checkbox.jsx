import React from "react";
import PropTypes from "prop-types";

import "./checkbox.scss";

/**
 * CheckBox
 *
 * CheckBox component
 *
 * @return {jsx}
 */
export const Checkbox = ({
  label,
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
      {label ? <p className="label">{label}</p> : null}
    </div>
  );
};

CheckBox.propTypes = {
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

CheckBox.defaultProps = {
  disabled: false,
};
