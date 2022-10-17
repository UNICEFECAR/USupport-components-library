import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../CheckBox";
import classNames from "classnames";

/**
 * CheckBoxGroup
 *
 * CheckBoxGroup component
 *
 * @return {jsx}
 */
export const CheckBoxGroup = ({ name, options, setOptions, classes }) => {
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
    return (
      options &&
      options.map((option, index) => {
        return (
          <CheckBox
            name={name}
            label={option.label}
            isChecked={option.isSelected}
            setIsChecked={() => {
              handleSelect(option.value);
            }}
            key={index}
          />
        );
      })
    );
  };

  return <div className={classNames(classes)}>{renderAllOptions()}</div>;
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
   *  Classes to add to the CheckBoxGroup
   * */
  classes: PropTypes.string,
};

CheckBoxGroup.defaultProps = {
  name: "",
  options: [],
  setOptions: () => {},
};
