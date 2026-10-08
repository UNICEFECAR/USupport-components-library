import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { HHIcon } from "../HHIcon/HHIcon";

import "./hh-search-input.scss";

/**
 * HHSearchInput
 *
 * Search field that submits on Enter or with the search button
 *
 * @return {jsx}
 */
export const HHSearchInput = ({
  id = "hh-search",
  value,
  label,
  placeholder,
  submitLabel,
  onSubmit,
}) => {
  const [query, setQuery] = useState(value || "");

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query.trim());
  };

  return (
    <form className="hh-search" role="search" onSubmit={handleSubmit}>
      <label className="hh__visually-hidden" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="hh-search__input"
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="hh-search__button" aria-label={submitLabel}>
        <HHIcon name="search" />
      </button>
    </form>
  );
};

HHSearchInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
