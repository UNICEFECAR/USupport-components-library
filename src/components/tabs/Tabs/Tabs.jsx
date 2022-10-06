import React from "react";
import PropTypes from "prop-types";

import "./tabs.scss";

/**
 * Tabs
 *
 * Tabs component
 *
 * @return {jsx}
 */
export const Tabs = ({ options, handleSelect, handleShowMore }) => {
  const renderAllOptions = () => {
    if (options) {
      return options
        ? options.map((option, index) => {
            if (index >= 4) {
              return;
            }
            return (
              <div
                className={[
                  "tab",
                  option.isSelected ? "tab--selected" : "",
                  option.isInactive ? "tab--inactive" : "",
                ].join(" ")}
                onClick={() => (option.isInactive ? {} : handleSelect(index))}
                key={index}
              >
                <p>{option.label}</p>
              </div>
            );
          })
        : null;
    }
  };

  return (
    <div className="tabs-container">
      {renderAllOptions()}
      {options.length > 4 && (
        <p className="show-more-text" onClick={handleShowMore}>
          +{options.length - 4} more
        </p>
      )}
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
   *  handleShowMore function to be called when show more is clicked
   **/
  handleShowMore: PropTypes.func,
};

Tabs.defaultProps = {
  // Add defaultProps here
};
