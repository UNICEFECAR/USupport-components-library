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
  ...rest
}) => {
  return (
    <>
      <div className={["input-container", disabled && "disabled"].join(" ")}>
        {label ? <p className="label">{label}</p> : null}
        <div className={["input-wrapper", errorMessage && "error"].join(" ")}>
          {preInput ? preInput : null}
          <input type={type} disabled={disabled} className="input" {...rest} />
          {children ? children : null}
        </div>
      </div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
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
