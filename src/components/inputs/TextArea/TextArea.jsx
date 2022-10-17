import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Error } from "../../errors/Error";

import "./textarea.scss";

/**
 * TextArea
 *
 * TextArea component
 *
 * @return {jsx}
 */
export const TextArea = ({
  label,
  value,
  onChange,
  classes,
  errorMessage,
  ...props
}) => {
  return (
    <div className={["text-area--container", classNames(classes)].join(" ")}>
      {label ? <p className="text label">{label}</p> : null}
      <textarea
        className="text-area text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...props}
      />
      {errorMessage ? <Error message={errorMessage} /> : null}
    </div>
  );
};

TextArea.propTypes = {
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
   * Additional props to be passed to the input
   * */
  props: PropTypes.object,
};

TextArea.defaultProps = {
  // Add defaultProps here
};
