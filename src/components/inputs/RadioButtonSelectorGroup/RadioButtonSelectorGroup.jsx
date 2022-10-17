import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { RadioButtonSelector } from "../RadioButtonSelector/RadioButtonSelector";

import "./radio-button-selector-group.scss";

/**
 * RadioButtonSelectorGroup
 *
 * RadioButtonSelectorGroup component
 *
 * @return {jsx}
 */
export const RadioButtonSelectorGroup = ({
  name,
  options,
  selected,
  setSelected,
  classes,
}) => {
  const renderAllOptions = () => {
    return options.map((option, index) => {
      return (
        <RadioButtonSelector
          name={name}
          label={option.label}
          isChecked={selected === option.value}
          setIsChecked={() => setSelected(option.value)}
          key={index}
        />
      );
    });
  };

  return (
    <div
      className={["radio-button-selector-group", classNames(classes)].join(" ")}
    >
      {renderAllOptions()}
    </div>
  );
};

RadioButtonSelectorGroup.propTypes = {
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

  /**
   * Additional classes to pass to the radio button selector group
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Additional props to pass to the radio button selector group
   *  */
  props: PropTypes.object,
};
