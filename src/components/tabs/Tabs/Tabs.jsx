import React from "react";
import PropTypes from "prop-types";

import "./tabs.scss";

/**
 * Tabs
 *
 * Tabs component with horizontal scroll
 *
 * @return {jsx}
 */
export const Tabs = ({ options, handleSelect, t = () => {} }) => {
  const handleOnSelect = (index) => {
    if (handleSelect) {
      handleSelect(index);
    }
  };

  const renderOptions = () => {
    if (!options || !Array.isArray(options)) {
      return null;
    }

    return options.map((option, index) => (
      <div
        className={[
          "tab",
          option.isSelected ? "tab--selected" : "",
          option.isInactive ? "tab--inactive" : "",
        ].join(" ")}
        onClick={option.isInactive ? undefined : () => handleOnSelect(index)}
        key={index}
      >
        <p className="paragraph">{option.label}</p>
      </div>
    ));
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs">{renderOptions()}</div>
    </div>
  );
};

Tabs.propTypes = {
  /**
   * options to be displayed
   * */
  options: PropTypes.arrayOf(PropTypes.object),

  /**
   * handleSelect function to be called when an option is selected
   **/
  handleSelect: PropTypes.func,

  /**
   * translation function
   **/
  t: PropTypes.func,
};

Tabs.defaultProps = {
  options: [],
  t: () => {},
};
