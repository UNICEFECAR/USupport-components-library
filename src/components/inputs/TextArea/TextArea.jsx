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
  ...rest
}) => {
  return (
    <div className={["text-area--container", classNames(classes)].join(" ")}>
      <p className="text label">{label}</p>
      <textarea
        className="text-area text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...rest}
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
};

TextArea.defaultProps = {
  // Add defaultProps here
};
