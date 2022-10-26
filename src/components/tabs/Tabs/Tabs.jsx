import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import { Box } from "../../boxes/Box";

import "./tabs.scss";

/**
 * Tabs
 *
 * Tabs component
 *
 * @return {jsx}
 */
export const Tabs = ({ options, handleSelect }) => {
  const NO_OPTIONS_TO_RENDER = 4;
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOptionSelected, setIsMoreOptionSelected] = useState(false);

  const handleOnSelect = (option) => {
    handleSelect ? handleSelect(option) : () => {};
    setIsOpen(false);
  };

  const renderOptions = () => {
    if (options) {
      return options
        ? options.map((option, index) => {
            if (index >= NO_OPTIONS_TO_RENDER) {
              return;
            }
            return (
              <div
                className={[
                  "tab",
                  option.isSelected ? "tab--selected" : "",
                  option.isInactive ? "tab--inactive" : "",
                ].join(" ")}
                onClick={
                  option.isInactive
                    ? () => {}
                    : () => {
                        handleSelect(index);
                        setIsMoreOptionSelected(false);
                      }
                }
                key={index}
              >
                <p className="paragraph">{option.label}</p>
              </div>
            );
          })
        : null;
    }
  };

  const renderShowMoreOptions = () => {
    if (options) {
      return options.map((option, index) => {
        if (index >= NO_OPTIONS_TO_RENDER) {
          return (
            <div
              className={[
                "option",
                option.isSelected ? "option--selected" : "",
                option.isInactive ? "option--inactive" : "",
              ].join(" ")}
              onClick={
                option.isInactive
                  ? () => {}
                  : () => {
                      handleOnSelect(index);
                      setIsMoreOptionSelected(option.isSelected);
                    }
              }
              key={index}
            >
              <p className="paragraph">{option.label}</p>
            </div>
          );
        }
      });
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="tabs">
        {renderOptions()}
        {options.length > NO_OPTIONS_TO_RENDER && (
          <p
            className={[
              "text",
              "show-more__text",
              isMoreOptionSelected ? "show-more__text--selected" : "",
            ].join(" ")}
            onClick={() => setIsOpen(!isOpen)}
          >
            +{options.length - NO_OPTIONS_TO_RENDER} more
          </p>
        )}
      </div>
      {isOpen ? (
        <Box shadow={1} classes="show-more">
          <div className="show-more__options">{renderShowMoreOptions()}</div>
        </Box>
      ) : null}
    </OutsideClickHandler>
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
