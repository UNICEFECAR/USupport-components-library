import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { CheckBox } from "../CheckBox";
import { ThemeContext } from "../../../utils";

import "./check-box-group.scss";

/**
 * CheckBoxGroup
 *
 * CheckBoxGroup component
 *
 * @return {jsx}
 */
export const CheckBoxGroup = ({
  name,
  options,
  setOptions,
  label,
  classes,
}) => {
  const { theme } = useContext(ThemeContext);

  const handleSelect = (value) => {
    let newOptions = [...options];

    newOptions = newOptions.map((option) => {
      if (option.value === value) {
        option.isSelected = !option.isSelected;
      }
      return option;
    });

    setOptions(newOptions);
  };

  const renderAllOptions = () => {
    return options?.map((option, index) => {
      return (
        <CheckBox
          name={name}
          label={option.label}
          isChecked={option.isSelected}
          classes="checkbox-group__options-container__checkbox"
          setIsChecked={() => {
            handleSelect(option.value);
          }}
          key={index}
        />
      );
    });
  };

  return (
    <div className={["checkbox-group", classNames(classes)].join(" ")}>
      {label && (
        <p
          className={[
            "text checkbox-group__label",
            "checkbox-group__label--dark",
          ].join(" ")}
        >
          {label}
        </p>
      )}
      <div className="checkbox-group__options-container">
        {renderAllOptions()}
      </div>
    </div>
  );
};

CheckBoxGroup.propTypes = {
  /**
   * Name of the CheckBoxGroup
   * */
  name: PropTypes.string,

  /**
   * Options for the CheckBoxGroup
   * */
  options: PropTypes.arrayOf(PropTypes.object),

  /**
   * Function to set the options
   * */
  setOptions: PropTypes.func,

  /**
   * Label for the CheckBoxGroup
   * */
  label: PropTypes.string,

  /**
   *  Classes to add to the CheckBoxGroup
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CheckBoxGroup.defaultProps = {
  name: "",
  options: [],
  setOptions: () => {},
};
