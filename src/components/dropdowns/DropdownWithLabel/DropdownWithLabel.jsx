import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Dropdown } from "../Dropdown";
import { ThemeContext } from "../../../utils";

import "./dropdown-with-label.scss";

/**
 * DropdownWithLabel
 *
 * Dropdown with a label text
 *
 * @return {jsx}
 */
export const DropdownWithLabel = ({
  label,
  classes,
  labelClasses,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={["dropdown-with-label", classNames(classes)].join(" ")}>
      {label ? (
        <p
          className={[
            "text label",
            theme === "dark" ? "label--dark" : "",
            theme === "highContrast" ? "label--hc" : "",
            classNames(labelClasses),
          ].join(" ")}
        >
          {label}
        </p>
      ) : null}
      <Dropdown {...props} />
    </div>
  );
};

DropdownWithLabel.propTypes = {
  /**
   * Label text for the dropdown
   *
   * */
  label: PropTypes.string,

  /**
   * Additional classes for the dropdown
   *
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Additional classes for the label
   *
   * */
  labelClasses: PropTypes.string,
};

DropdownWithLabel.defaultProps = {
  options: [
    { label: "Option 1", value: "option-1" },
    { label: "Option 2", value: "option-2" },
    { label: "Option 3", value: "option-3" },
  ],
  selected: null,
  setSelected: () => {},
  errorMessage: "",
  label: "Label",
};
