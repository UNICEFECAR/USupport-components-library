import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DropdownWithLabel } from "../DropdownWithLabel/DropdownWithLabel";
import { Icon } from "../../icons";
import { ButtonWithIcon } from "../../buttons/ButtonWithIcon";
import { Error } from "../../errors";

import "./dropdown-group.scss";

/**
 * DropdownGroup
 *
 * Grooup of dropdowns with the option to add more dynamically
 *
 * @param {array} options objects with the following structure:
 *                {label:"Label", value:"value",selected:"false"}
 * @param {integer} maxShown the maximum ammount of dropdowns to display
 * @param {function} handleChange function to set the state of the parent component
 * @return {jsx}
 */
export const DropdownGroup = ({
  options,
  initialShown = 1,
  maxShown = 3,
  handleChange,
  label,
  addMoreText,
  errorMessage,
}) => {
  const [initialCount, setInitialCount] = useState(initialShown);
  const [data, setData] = useState();

  useEffect(() => {
    let newData = [];
    // Set the inital count to the number of selected option
    // If there are no selected options, set the initial count to 1
    setInitialCount(options.filter((x) => x.selected).length || 1);
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      newData.push({
        label: option.label,
        value: option.value,
        selected: option.selected,
        selectedIndex:
          option.selectedIndex !== -1 ? option.selectedIndex : null,
      });
    }
    // Sort new data so the selected options come first
    newData.sort((a, b) => {
      if (a.selected === true && b.selected === false) {
        return -1;
      }
      if (a.selected === false && b.selected === true) {
        return 1;
      }
      return 0;
    });
    setData(newData);
  }, [options]);

  const handleSelect = (value, index) => {
    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      const option = newData[i];
      if (option.selectedIndex === index) {
        option.selected = false;
        option.selectedIndex = null;
      }

      if (option.value === value) {
        option.selected = true;
        option.selectedIndex = index;
      }
    }
    setData(newData);
    handleChange(newData);
  };

  const handleRemove = (value, index) => {
    setInitialCount((prev) => prev - 1);
    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      const option = newData[i];

      if (option.value === value && option.selectedIndex === index) {
        option.selected = false;
        option.selectedIndex = null;
      }
    }
    setData(newData);
    handleChange(newData);
  };

  const handleAddOption = () => {
    setInitialCount((prev) => prev + 1);
  };

  return (
    <div className="dropdown-group">
      <div className="dropdown-group__dropdowns-list">
        {data &&
          data.slice(0, initialCount).map((option, index) => {
            const selected =
              data.find((x) => x.selected && x.selectedIndex === index)
                ?.value || null;
            return (
              <div
                key={index}
                className="dropdown-group__dropdowns-list__single"
              >
                <DropdownWithLabel
                  label={`${label} ${index + 1}`}
                  options={[...options].filter((x) => {
                    if (x.selected && x.selectedIndex !== index) {
                      return false;
                    }
                    return true;
                  })}
                  selected={selected}
                  setSelected={(value) => handleSelect(value, index)}
                />
                {index + 1 === initialCount && initialCount > 1 && (
                  <ButtonWithIcon
                    color="red"
                    classes="dropdown-group__dropdowns-list__single__remove-button"
                    iconColor="#eb5757"
                    iconName="trash"
                    iconSize="lg"
                    label="Remove"
                    type="ghost"
                    onClick={() => handleRemove(selected, index)}
                  />
                )}
              </div>
            );
          })}
      </div>
      {errorMessage ? <Error message={errorMessage} /> : null}
      {initialCount < maxShown && (
        <div className="dropdown-group__add-more" onClick={handleAddOption}>
          <Icon name="actions-plus" color="#9749FA" size="lg" />
          <p className="small-text dropdown-group__add-more-text">
            {addMoreText}
          </p>
        </div>
      )}
    </div>
  );
};

DropdownGroup.propTypes = {
  // Add propTypes here
};

DropdownGroup.defaultProps = {
  // Add defaultProps here
};
