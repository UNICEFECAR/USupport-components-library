import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import { InputSearch } from "../";
import { Box } from "../../boxes";
import { Icon } from "../../icons";

import "./input-with-dropdown.scss";

/**
 * InputWithDropdown
 *
 * InputWithDropdown
 *
 * @return {jsx}
 */
export const InputWithDropdown = ({
  label,
  options,
  setOptions,
  selectedOptions,
  setSelectedOptions,
  initialOptions,
  classes,
  t,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState("");

  const handleChange = (value) => {
    setData(value);

    let optionsCopy = [];
    const lowerCaseOptions = initialOptions.map((option) => {
      return { label: option.label.toLocaleLowerCase(), id: option.id };
    });
    const alreadyExist = lowerCaseOptions.find(
      (option) => option.label === value.toLocaleLowerCase()
    );

    if (!alreadyExist) optionsCopy.push({ label: value, id: value });

    const filteredOptions = initialOptions.filter((option) =>
      option.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );

    optionsCopy.push(...filteredOptions);

    setOptions(optionsCopy);
  };

  const handleSelectTag = (option) => {
    const copySelectedOptions = [...selectedOptions];
    const exists = selectedOptions.find((item) => {
      return item.id === option.id;
    });

    if (!exists) {
      copySelectedOptions.push(option);

      setSelectedOptions(copySelectedOptions);
      setOptions([...initialOptions]);
      setData("");
      setIsActive(false);
    }
  };

  const handleRemoveSelectedTag = (option) => {
    const selectedOptionsCopy = [...selectedOptions];
    const index = selectedOptionsCopy.indexOf(option);
    selectedOptionsCopy.splice(index, 1);
    setSelectedOptions(selectedOptionsCopy);
  };

  const renderAllSuggestions = () => {
    return options.map((option) => {
      const isSelected = selectedOptionsLc().includes(
        option.label.toLowerCase()
      );
      return (
        <div
          onClick={() => handleSelectTag(option)}
          key={option.index ? option.index : option.label}
          className={[
            "input-with-dropdown__option-container",
            isSelected ? "input-with-dropdown__option-container--selected" : "",
          ].join(" ")}
        >
          <p className="text">{option.label}</p>
        </div>
      );
    });
  };

  const selectedOptionsLc = useCallback(() => {
    return selectedOptions.map((x) => x.label.toLowerCase());
  }, [selectedOptions]);

  const renderSelectedOptions = () => {
    return selectedOptions.map((option) => {
      return (
        <div
          className={["input-with-dropdown__tag"].join(" ")}
          key={option.index ? option.index : option.label}
        >
          <p className="text">{option.label}</p>
          <Icon
            name="close-x"
            classes="input-with-dropdown__tag__icon"
            onClick={() => handleRemoveSelectedTag(option)}
          />
        </div>
      );
    });
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsActive(false)}>
      <div
        className={["input-with-dropdown-wrapper", classNames(classes)].join(
          " "
        )}
      >
        <p className="text input-with-dropdown__label">{label}</p>
        <Box classes={["input-with-dropdown", classNames(classes)].join(" ")}>
          <div className="input-with-dropdown__input-container">
            <InputSearch
              {...rest}
              onChange={handleChange}
              value={data}
              classes="input-with-dropdown__input"
              onClick={() => setIsActive(true)}
            />
            {isActive && (
              <div className="input-with-dropdown__input-container__options-container">
                {renderAllSuggestions()}
              </div>
            )}
          </div>
        </Box>
        {selectedOptions.length > 0 && !isActive && (
          <div className="input-with-dropdown__selected-tags-wrapper">
            <p className="text input-with-dropdown__label">
              {t("selected_tags")}
            </p>
            <div className="input-with-dropdown__tags-container">
              {renderSelectedOptions()}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

InputWithDropdown.propTypes = {
  // Add propTypes here
};

InputWithDropdown.defaultProps = {
  // Add defaultProps here
};
