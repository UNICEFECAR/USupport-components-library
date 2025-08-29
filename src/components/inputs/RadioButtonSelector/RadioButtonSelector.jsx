import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Box } from "../../boxes/Box/Box";
import { RadioButton } from "../RadioButton/RadioButton";
import { ThemeContext } from "../../../utils";

import "./radio-button-selector.scss";

/**
 * RadioButtonSelector
 *
 * RadioButtonSelector component
 *
 * @return {jsx}
 */
export const RadioButtonSelector = ({ size, disabled, classes, ...props }) => {
  const { theme } = useContext(ThemeContext);

  console.log("Props.selected", props.isChecked);

  return (
    <Box
      classes={[
        "radio-button-selector",
        `radio-button-selector--${size}`,
        disabled ? "radio-button-selector--disabled" : "",
        props.isChecked &&
          theme === "highContrast" &&
          "radio-button-selector--hc-selected",
        classNames(classes),
      ].join(" ")}
    >
      <RadioButton
        disabled={disabled}
        classes={"radio-button-selector__radio-button"}
        {...props}
      />
    </Box>
  );
};

RadioButtonSelector.propTypes = {
  /**
   * Size of the radio button selector
   * @default "md"
   * */
  size: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * If the radio button is disabled
   * @default false
   * */
  disabled: PropTypes.bool,

  /**
   * Additional classes to pass to the radio button selector
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Additional props to pass to the radio button
   * */
  props: PropTypes.object,
};

RadioButtonSelector.defaultProps = {
  size: "md",
  disabled: false,
};
