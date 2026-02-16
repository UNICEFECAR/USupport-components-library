import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

import { Error } from "../../errors";
import { ThemeContext } from "../../../utils";

import "./select.scss";

/**
 * Select
 *
 * inputs
 *
 * @return {jsx}
 */
export const Select = ({
  options,
  placeholder,
  errorMessage,
  handleChange,
  label,
  classes,
  maxMenuHeight = 200,
  isSearchable = true,
  isSmall = false,
  ...rest
}) => {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme !== "light";

  useEffect(() => {
    setSelectedOptions(options.filter((option) => option.selected));
  }, [options]);

  const handleSelect = (data) => {
    const values = data.map((option) => option.value);

    setSelectedOptions(data);
    handleChange(
      options.map((option) => {
        if (values.includes(option.value)) {
          option.selected = true;
        } else {
          option.selected = false;
        }
        return option;
      })
    );
  };

  return (
    <div className={classes}>
      {label ? <p className="text select-container__label">{label}</p> : null}
      <ReactSelect
        placeholder={<p className="select__placeholder">{placeholder}</p>}
        options={options}
        value={selectedOptions}
        onChange={handleSelect}
        className={[
          "select-container",
          isDark && "select-container--dark",
          isSmall && "select-container--small",
        ].join(" ")}
        classNamePrefix="select"
        classNames={{
          control: (state) => (isDark ? "select__control--dark" : ""),
          menu: (state) => (isDark ? "select__menu--dark" : ""),
          multiValue: (state) => (isDark ? "select__multi-value--dark" : ""),
          multiValueLabel: (state) =>
            isDark ? "select__multi-value__label--dark" : "",
          option: (state) => (isDark ? "select__option--dark" : ""),
          singleValue: (state) => (isDark ? "select__single-value--dark" : ""),
        }}
        closeMenuOnSelect={false}
        isMulti
        isSearchable={isSearchable}
        maxMenuHeight={maxMenuHeight}
        components={{
          ...makeAnimated(),
        }}
        {...rest}
      />
      {errorMessage && <Error message={errorMessage} />}
    </div>
  );
};

Select.propTypes = {
  // Add propTypes here
};

Select.defaultProps = {
  // Add defaultProps here
};
