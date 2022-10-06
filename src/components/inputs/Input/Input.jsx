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
  value,
  onChange,
  ...props
}) => {
  return (
    <>
      <div
        className={[
          "input-container",
          disabled && "disabled",
          errorMessage && "error",
        ].join(" ")}
      >
        {label ? <p className="text label">{label}</p> : null}
        <div className="input-wrapper">
          {preInput ? preInput : null}
          <input
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            type={type}
            disabled={disabled}
            className="input"
            {...props}
          />
          {children ? children : null}
        </div>
      </div>
      {errorMessage ? (
        <p className="small-text error-message">{errorMessage}</p>
      ) : null}
    </>
  );
};

Input.propTypes = {
  /**
   * Input type
   *@default "text"
   **/
  type: PropTypes.oneOf(["text"]),

  /**
   * Input label
   **/
  label: PropTypes.string,

  /**
   * Input disabled
   * @default false
   **/
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  type: "text",
  disabled: false,
};
