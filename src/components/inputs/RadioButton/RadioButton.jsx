import React from "react";
import PropTypes from "prop-types";

import "./radioButton.scss";

/**
 * Radio Button component
 *
 * @return {jsx}
 */
export const RadioButton = ({
  text,
  disabled,
  isChecked,
  setIsChecked,
  ...rest
}) => {
  return (
    <div
      className={["radiobutton-wrapper", disabled ? "disabled" : ""].join(" ")}
    >
      <input
        type="radio"
        checked={isChecked}
        onChange={disabled ? () => {} : () => setIsChecked(!isChecked)}
        className={[isChecked ? "checked" : ""]}
        {...rest}
      />
      {text ? <p className="text">{text}</p> : null}
    </div>
  );
};

RadioButton.propTypes = {
  /**
   * Label for the radio button if needed
   */
  text: PropTypes.string,

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
