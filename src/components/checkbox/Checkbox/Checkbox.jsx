import React, { useState } from "react";
import PropTypes from "prop-types";

import "./checkbox.scss";

/**
 * Checkbox
 *
 * Checkbox component
 *
 * @return {jsx}
 */
export const Checkbox = ({ text, disabled }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={["checkbox-wrapper", disabled ? "disabled" : ""].join(" ")}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={disabled ? () => {} : () => setIsChecked(!isChecked)}
        className={[isChecked ? "checked" : ""]}
      />
      {text ? <p className="text">{text}</p> : null}
    </div>
  );
};

Checkbox.propTypes = {
  /**
   * Label for the checkbox if needed
   */
  label: PropTypes.string,

  /**
   * If the checkbox is disabled
   * @default false
   * */
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  disabled: false,
};
