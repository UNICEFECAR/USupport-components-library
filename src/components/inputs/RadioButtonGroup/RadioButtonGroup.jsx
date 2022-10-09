import React from "react";
import PropTypes from "prop-types";

import { RadioButton } from "../RadioButton";

/**
 * RadioButtonGroup
 *
 * RadioButtonGroup component
 *
 * @return {jsx}
 */
export const RadioButtonGroup = ({ name, options, selected, setSelected }) => {
  const renderAllOptions = () => {
    return options.map((option, index) => {
      return (
        <RadioButton
          name={name}
          label={option.label}
          isChecked={selected === option.value}
          setIsChecked={() => setSelected(option.value)}
          key={index}
        />
      );
    });
  };

  return <>{renderAllOptions()}</>;
};

RadioButtonGroup.propTypes = {
  /**
   * Name of the radio button group
   * */
  name: PropTypes.string,

  /**
   * Options for the radio button group
   * */
  options: PropTypes.arrayOf(PropTypes.object),

  /**
   * Selected option
   * */
  selected: PropTypes.string,

  /**
   * Function to set the selected option
   * */
  setSelected: PropTypes.func,
};

RadioButtonGroup.defaultProps = {
  selected: "",
};
