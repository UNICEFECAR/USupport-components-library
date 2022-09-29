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
   * Label for the checkbox if needed
   */
  text: PropTypes.string,

  /**
   * If the checkbox is disabled
   * @default false
   * */
  disabled: PropTypes.bool,

  /**
   * If the checkbox is checked
   **/
  isChecked: PropTypes.bool,

  /**
   * Function to set the checkbox state
   * */
  setIsChecked: PropTypes.func,

  /**
   *
   * */
  rest: PropTypes.any,
};

RadioButton.defaultProps = {
  disabled: false,
};
