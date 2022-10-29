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
  label,
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
          size="lg" //Refactor, if needed to receive size as prop
          classes="radio-button-selector-group__radio-button"
        />
      );
    });
  };

  return (
    <div
      className={["radio-button-selector-group", classNames(classes)].join(" ")}
    >
      {label ? <p className="text">{label}</p> : null}
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
   * Label for the radio button group
   * */
  label: PropTypes.string,

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
