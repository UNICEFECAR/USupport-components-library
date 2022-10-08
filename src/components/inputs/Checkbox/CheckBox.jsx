import React from "react";
import PropTypes from "prop-types";

import "./check-box.scss";

/**
 * CheckBox
 *
 * CheckBox component
 *
 * @return {jsx}
 */
export const CheckBox = ({
  label,
  isChecked,
  setIsChecked,
  disabled,
  ...props
}) => {
  return (
    <div className={["checkbox-wrapper"].join(" ")}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={disabled ? () => {} : () => setIsChecked(!isChecked)}
        className={[isChecked ? "checked" : ""]}
        disabled={disabled}
        {...props}
      />
      {label ? <p className="text label">{label}</p> : null}
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
   *
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
