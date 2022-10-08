import React from "react";
import PropTypes from "prop-types";

import "./textarea.scss";
import classNames from "classnames";

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
      <p className="label">{label}</p>
      <textarea
        className="text-area"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...rest}
      />
      {errorMessage ? (
        <p className="small-text error-message">{errorMessage}</p>
      ) : null}
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
