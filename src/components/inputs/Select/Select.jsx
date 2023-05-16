import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

import { Error } from "../../errors";

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
  ...rest
}) => {
  const [selectedOptions, setSelectedOptions] = useState(null);

  useEffect(() => {
    setSelectedOptions(options.filter((option) => option.selected));
  }, []);

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
    <div className={classes} style={{ marginTop: "24px" }}>
      {label ? <p className="text select-container__label">{label}</p> : null}
      <ReactSelect
        placeholder={<p className="select__placeholder">{placeholder}</p>}
        options={options}
        value={selectedOptions}
        onChange={handleSelect}
        className="select-container"
        classNamePrefix={"select"}
        closeMenuOnSelect={false}
        isMulti
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
