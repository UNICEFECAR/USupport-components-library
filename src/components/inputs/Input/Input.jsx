import React from "react";
import PropTypes from "prop-types";
import { Error } from "../../errors/Error";
import classNames from "classnames";

import "./input.scss";

/**
 * Input
 *
 * Base Text input component
 *
 * @return {jsx}
 */
export const Input = ({
  value,
  type,
  label,
  disabled,
  errorMessage,
  children,
  preInput,
  classes,
  ...props
}) => {
  return (
    <div
      className={[
        "input-container",
        disabled && "disabled",
        classNames(classes),
      ].join(" ")}
    >
      {label ? <p className="text label">{label}</p> : null}
      <div className={["input-wrapper", errorMessage ? "error" : ""].join(" ")}>
        {preInput ? preInput : null}
        <input
          type={type}
          disabled={disabled}
          className="input text"
          value={value}
          {...props}
        />
        {children ? children : null}
      </div>
      {errorMessage && !disabled ? <Error message={errorMessage} /> : null}
    </div>
  );
};

Input.propTypes = {
  /**
   * The value of the input
   */
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),

  /**
   * Input type
   *
   **/
  type: PropTypes.oneOf(["text", "password", "number", "date"]),

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
