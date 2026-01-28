import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Error } from "../../errors/Error";
import { ThemeContext } from "../../../utils";

import "./textarea.scss";

/**
 * Textarea
 *
 * Textarea component
 *
 * @return {jsx}
 */
export const Textarea = ({
  label,
  value,
  onChange,
  classes,
  errorMessage,
  placeholder,
  size,
  disabled,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[
        "textarea--container",
        `textarea--container--${size}`,
        disabled && "disabled",
        classNames(classes),
      ].join(" ")}
    >
      {label ? (
        <p
          className={[
            "text label",
            theme === "dark" ? "label--dark" : "",
            theme === "highContrast" ? "label--hc" : "",
          ].join(" ")}
        >
          {label}
        </p>
      ) : null}
      <div
        className={[
          "textarea-wrapper",
          theme !== "light" && "textarea-wrapper--dark",
          errorMessage ? "error" : "",
        ].join(" ")}
      >
        <textarea
          placeholder={placeholder}
          className={[
            "textarea text",
            theme !== "light" && "textarea--dark",
          ].join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.currentTarget.value)}
          {...props}
        />
      </div>
      {errorMessage && !disabled ? <Error message={errorMessage} /> : null}
    </div>
  );
};

Textarea.propTypes = {
  /**
   * Input label
   **/
  label: PropTypes.string,

  /**
   * Input value
   */
  value: PropTypes.string,

  /**
   * Function to be called when the input value changes
   * */
  onChange: PropTypes.func,

  /**
   * Additional classes to be added to the input
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Error message to be displayed
   * */
  errorMessage: PropTypes.string,

  /**
   * Size of the textarea
   */
  size: PropTypes.oneOf(["sm", "md"]),

  /**
   * Textarea disabled
   *
   **/
  disabled: PropTypes.bool,

  /**
   * Additional props to be passed to the input
   * */
  props: PropTypes.object,
};

Textarea.defaultProps = {
  size: "md",
  disabled: false,
};
