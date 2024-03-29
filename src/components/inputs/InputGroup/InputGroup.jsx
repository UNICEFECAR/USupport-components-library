import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { Input } from "../Input";
import { Icon } from "../../icons";
import { ButtonWithIcon } from "../../buttons/ButtonWithIcon";
import { Error } from "../../errors";

import "./input-group.scss";

/**
 * InputGroup
 *
 * Group of inputs with the option to add/delete inputs
 *
 * @return {jsx}
 */
export const InputGroup = ({
  options,
  maxShown,
  label,
  handleParentChange,
  addMoreText,
  removeText,
  errorMessage,
}) => {
  const [initialCount, setInitialCount] = useState(1);
  const [data, setData] = useState();

  useEffect(() => {
    // Set the inital count to the number of options with a value
    // If there are no options with a value, set the initial count to 1
    setInitialCount(options.filter((x) => x.value !== "").length || 1);
    let newData = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      newData.push({
        value: option,
        selectedIndex: i,
      });
    }
    if (newData.length === 0) {
      newData.push({
        value: "",
        selectedIndex: 0,
      });
    }
    setData(newData);
  }, [options]);

  const handleChange = (value, index) => {
    const newData = [...data];
    newData[index].value = value;
    setData(newData);

    handleParentChange(data);
  };

  // Add a new input only if the previous one has a value
  const handleAddOption = () => {
    const canAddMore = data.filter((x) => x.value !== "").length !== 0;
    if (canAddMore) {
      setData((prev) => [...prev, { value: "", selectedIndex: initialCount }]);
      setInitialCount((prev) => prev + 1);
    }
  };

  // Remove the option at the given index
  const handleRemove = (index) => {
    setInitialCount((prev) => prev - 1);
    let newData = [...data];
    newData = newData.filter((item) => item.selectedIndex !== index);
    setData(newData);
    handleParentChange(newData);
  };

  const canAddMoreOptions = useMemo(() => {
    return initialCount < maxShown && options.length === initialCount;
  }, [initialCount, maxShown, options.length]);

  return (
    <div className="input-group">
      <div className="inut-group__inputs-list">
        {data &&
          data.slice(0, initialCount).map((item, index) => {
            return (
              <div key={index} className="input-group__inputs-list__single">
                <Input
                  value={item.value}
                  onChange={(e) => handleChange(e.currentTarget.value, index)}
                  label={`${label} ${index + 1}${index === 0 ? " *" : ""}`}
                  placeholder={label}
                />
                {(options.length > 1 ? true : index !== 0) && (
                  <ButtonWithIcon
                    color="red"
                    classes="input-group__inputs-list__single__remove-button"
                    iconColor="#eb5757"
                    iconName="trash"
                    iconSize="lg"
                    label={removeText}
                    type="ghost"
                    onClick={() => handleRemove(index)}
                  />
                )}
              </div>
            );
          })}
      </div>
      {errorMessage ? <Error message={errorMessage} /> : null}

      {canAddMoreOptions && (
        <div className="input-group__add-more" onClick={handleAddOption}>
          <Icon name="actions-plus" color="#9749FA" size="lg" />
          <p className="small-text input-group__add-more-text">{addMoreText}</p>
        </div>
      )}
    </div>
  );
};

InputGroup.propTypes = {
  // Add propTypes here
  /**
   * Array containing the options for the dropdowns
   */
  options: PropTypes.arrayOf(PropTypes.string),

  /**
   * Number of dropdowns to show initially
   */
  initialShown: PropTypes.number,

  /**
   * Maximum number of dropdowns to show
   */
  maxShown: PropTypes.number,

  /**
   * Function to set the state of the parent component
   */
  handleChange: PropTypes.func,

  /**
   * Label for the dropdowns
   */
  label: PropTypes.string,

  /**
   * Text for the add more button
   */
  addMoreText: PropTypes.string,

  /**
   * Error message to display
   */
  errorMessage: PropTypes.string,
};
