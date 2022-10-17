import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { CheckBox } from "../CheckBox/CheckBox";
import classNames from "classnames";

import "./check-box-selector.scss";

/**
 * CheckBoxSelector
 *
 * CheckBoxSelector component
 *
 * @return {jsx}
 */
export const CheckBoxSelector = ({
  size,
  isChecked,
  setIsChecked,
  disabled,
  classes,
  ...props
}) => {
  return (
    <Box
      shadow={1}
      classes={[
        "check-box-selector",
        `check-box-selector--${size}`,
        disabled ? "check-box-selector--disabled" : "",
        classNames(classes),
      ].join(" ")}
    >
      <CheckBox
        disabled={disabled}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        classes={"check-box-selector__check-box"}
        {...props}
      />
    </Box>
  );
};

CheckBoxSelector.propTypes = {
  /**
   * Size of the checkbox selector
   * @default "md"
   * */
  size: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Is the checkbox checked
   * @default false
   * */
  isChecked: PropTypes.bool,

  /**
   * Function to set the checkbox checked state
   * */
  setIsChecked: PropTypes.func,

  /**
   * If the checkbox is disabled
   * @default false
   * */
  disabled: PropTypes.bool,

  /**
   * Additional classes to add to the component
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Additional props to pass to the checkbox
   * */
  props: PropTypes.object,
};

CheckBoxSelector.defaultProps = {
  size: "md",
  disabled: false,
};
