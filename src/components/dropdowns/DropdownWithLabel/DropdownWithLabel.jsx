import React from "react";
import PropTypes from "prop-types";

import "./dropdown-with-label.scss";
import classNames from "classnames";
import { Dropdown } from "../Dropdown/Dropdown";

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
  return (
    <div className={["dropdown-with-label", classNames(classes)].join(" ")}>
      <p
        className={[
          "text",
          "dropdown-with-label__label",
          classNames(labelClasses),
        ].join(" ")}
      >
        {label}
      </p>
      <Dropdown {...props} />
    </div>
  );
};

DropdownWithLabel.propTypes = {
  // Add propTypes here
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
