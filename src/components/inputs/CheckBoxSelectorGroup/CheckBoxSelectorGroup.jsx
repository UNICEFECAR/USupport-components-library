import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./check-box-selector-group.scss";
import { CheckBoxSelector } from "../CheckBoxSelector/CheckBoxSelector";

/**
 * CheckBoxSelectorGroup
 *
 * CheckBoxSelectorGroup component
 *
 * @return {jsx}
 */
export const CheckBoxSelectorGroup = ({
  name,
  options,
  setOptions,
  classes,
}) => {
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
          <CheckBoxSelector
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

  return (
    <div
      className={["check-box-selector-group", classNames(classes)].join(" ")}
    >
      {renderAllOptions()}
    </div>
  );
};

CheckBoxSelectorGroup.propTypes = {
  // Add propTypes here
};

CheckBoxSelectorGroup.defaultProps = {
  // Add defaultProps here
};
