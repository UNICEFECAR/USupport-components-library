import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Error } from "../../errors/Error";

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
  ...props
}) => {
  return (
    <div
      className={[
        "textarea--container",
        `textarea--container--${size}`,
        classNames(classes),
      ].join(" ")}
    >
      {label ? <p className="text label">{label}</p> : null}
      <textarea
        placeholder={placeholder}
        className="textarea text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...props}
      />
      {errorMessage ? <Error message={errorMessage} /> : null}
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
   * Additional props to be passed to the input
   * */
  props: PropTypes.object,
};

Textarea.defaultProps = {
  size: "md",
};
