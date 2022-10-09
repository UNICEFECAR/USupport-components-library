import React from "react";
import PropTypes from "prop-types";

import "./input.scss";

/**
 * Input
 *
 * Base Text input component
 *
 * @return {jsx}
 */
export const Input = ({
  type,
  label,
  disabled,
  errorMessage,
  children,
  preInput,
  ...props
}) => {
  return (
    <>
      <div className={["input-container", disabled && "disabled"].join(" ")}>
        {label ? <p className="text label">{label}</p> : null}
        <div
          className={["input-wrapper", errorMessage ? "error" : ""].join(" ")}
        >
          {preInput ? preInput : null}
          <input
            type={type}
            disabled={disabled}
            className="input text"
            {...props}
          />
          {children ? children : null}
        </div>
      </div>
      {errorMessage && !disabled ? (
        <p className="small-text error-message">{errorMessage}</p>
      ) : null}
    </>
  );
};

Input.propTypes = {
  /**
   * Input type
   *
   **/
  type: PropTypes.oneOf(["text"]),

  /**
   * Input label
   **/
  label: PropTypes.string,

  /**
   * Input disabled
   *
   **/
  disabled: PropTypes.bool,

  /**
   * Input error message
   *
   * */
  errorMessage: PropTypes.string,

  /**
   * Input children
   *
   * */
  children: PropTypes.node,

  /**
   * Input preInput
   *
   * */
  preInput: PropTypes.node,
};

Input.defaultProps = {
  type: "text",
  disabled: false,
};
