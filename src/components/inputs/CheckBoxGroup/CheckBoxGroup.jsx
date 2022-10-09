import React from "react";
import PropTypes from "prop-types";

import { CheckBox } from "../Checkbox";

/**
 * CheckBoxGroup
 *
 * CheckBoxGroup component
 *
 * @return {jsx}
 */
export const CheckBoxGroup = ({ name, options, setOptions }) => {
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

  return <>{renderAllOptions()}</>;
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
};

CheckBoxGroup.defaultProps = {
  name: "",
  options: [],
  setOptions: () => {},
};
