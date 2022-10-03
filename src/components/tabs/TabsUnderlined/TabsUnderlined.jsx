import React from "react";
import PropTypes from "prop-types";

import "./tabsunderlined.scss";

/**
 * TabsUnderlined
 *
 * TabsUnderlined component
 *
 * @return {jsx}
 */
export const TabsUnderlined = ({ options, handleSelect }) => {
  const renderAllOptions = () => {
    if (options) {
      return options
        ? options.map((option, index) => {
            return (
              <div
                className={[
                  "tab",
                  option.isSelected && "tab--selected",
                  option.isInactive && "tab--inactive",
                ].join(" ")}
                onClick={() => (option.isInactive ? {} : handleSelect(index))}
                key={index}
              >
                <h4 className="label">{option.label}</h4>
              </div>
            );
          })
        : null;
    }
  };

  return <div className="tabs-underlined-container">{renderAllOptions()}</div>;
};

TabsUnderlined.propTypes = {
  /**
   * options to be displayed
   */
  options: PropTypes.arrayOf(obj),

  /**
   *handleSelect function to be called when an option is selected
   **/
  handleSelect: PropTypes.func,
};

TabsUnderlined.defaultProps = {
  // Add defaultProps here
};
