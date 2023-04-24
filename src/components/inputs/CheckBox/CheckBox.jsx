import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./check-box.scss";

/**
 * CheckBox
 *
 * CheckBox component
 *
 * @return {jsx}
 */
export const CheckBox = ({
  label,
  isChecked,
  setIsChecked,
  disabled,
  classes,
  ...props
}) => {
  return (
    <div
      className={["checkbox-wrapper", classNames(classes)].join(" ")}
      onClick={
        disabled
          ? () => {}
          : (e) => {
              e.stopPropagation();
              setIsChecked(!isChecked);
            }
      }
    >
      <input
        type="checkbox"
        checked={isChecked}
        className={[isChecked ? "checked" : ""]}
        disabled={disabled}
        onChange={() => {}}
        {...props}
      />
      {label ? <p className="text label">{label}</p> : null}
    </div>
  );
};

CheckBox.propTypes = {
  /**
   * Label for the checkbox if needed
   **/
  label: PropTypes.string,

  /**
   * Is the checkbox checked
   **/
  isChecked: PropTypes.bool,

  /**
   * Function to set the checkbox checked state
   **/
  setIsChecked: PropTypes.func,

  /**
   * If the checkbox is disabled
   *
   **/
  disabled: PropTypes.bool,

  /**
   * Additional classes to add to the checkbox wrapper
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Additional props to pass to the checkbox
   **/
  props: PropTypes.object,
};

CheckBox.defaultProps = {
  disabled: false,
};
