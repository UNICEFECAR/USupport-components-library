import React from "react";
import PropTypes from "prop-types";

import { RadioButton } from "../RadioButton/RadioButton";

/**
 * RadioButtonGroup
 *
 * RadioButtonGroup component
 *
 * @return {jsx}
 */
export const RadioButtonGroup = ({ name, options, selected, setSelected }) => {
  const renderAllOptions = () => {
    return options.map((option) => {
      return (
        <RadioButton
          name={name}
          label={option.lable}
          isChecked={selected === option.value}
          setIsChecked={() => setSelected(option.value)}
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
