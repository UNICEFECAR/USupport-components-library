import React from "react";
import PropTypes from "prop-types";

import "./tabs.scss";
import { Box } from "../../boxes/Box/Box";

/**
 * Tabs
 *
 * Tabs component
 *
 * @return {jsx}
 */
export const Tabs = ({ options, handleSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnSelect = (option) => {
    handleSelect(option);
    setIsOpen(false);
  };

  const renderOptions = () => {
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

  const renderAllOptions = () => {
    if (options) {
      return options.map((option, index) => {
        return (
          <div
            className={[
              "option-container",
              option.isInactive ? "option-container-inactive" : "",
            ].join(" ")}
            onClick={
              option.isInactive ? () => {} : (option) => handleOnSelect(option)
            }
          >
            <p className="paragraph">{option.label}</p>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div className="tabs-container">
        {renderOptions()}
        {options.length > 4 && (
          <p
            className={[
              "show-more-text",
              isOpen && "show-more-text-selected",
            ].join(" ")}
            onClick={() => setIsOpen(!isOpen)}
          >
            +{options.length - 4} more
          </p>
        )}
      </div>
      {isOpen ? (
        <Box shadow={1} classes="show-more-container">
          <div className="show-more-option-container">{renderAllOptions()}</div>
        </Box>
      ) : null}
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
};

Tabs.defaultProps = {};
