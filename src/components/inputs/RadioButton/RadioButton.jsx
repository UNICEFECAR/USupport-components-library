import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./radio-button.scss";

/**
 * Radio Button component
 *
 * @return {jsx}
 */
export const RadioButton = ({
  label,
  disabled,
  isChecked,
  setIsChecked,
  classes,
  ...props
}) => {
  return (
    <div className={["radiobutton-wrapper", classNames(classes)].join(" ")}>
      <input
        type="radio"
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

RadioButton.propTypes = {
  /**
   * Label for the radio button if needed
   */
  label: PropTypes.string,

  /**
   * If the radio button is disabled
   * @default false
   * */
  disabled: PropTypes.bool,

  /**
   * If the radio button is checked
   **/
  isChecked: PropTypes.bool,

  /**
   * Function to set the radio button state
   * */
  setIsChecked: PropTypes.func,

  /**
   * Additional props to pass to the radio button
   * */
  rest: PropTypes.any,
};

RadioButton.defaultProps = {
  disabled: false,
};
