import React from "react";
import PropTypes from "prop-types";

import "./dropdown.scss";
import { Box } from "../../boxes/Box/Box";
import { Icon } from "../../icons/Icon/Icon";

/**
 * Dropdown
 *
 * Dropdown component
 *
 * @return {jsx}
 */
export const Dropdown = ({ options, selected, setSelected, errorMessage }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChooseOption = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const renderAllOptions = () => {
    return (
      options &&
      options.map((option, index) => {
        return (
          <div
            className={[
              "option-container",
              selected
                ? selected.label === option.label && "option-selected"
                : null,
              option.isDisabled && "disabled",
            ].join(" ")}
            onClick={
              option.isDisabled ? () => {} : () => handleChooseOption(option)
            }
          >
            <p key={index}>{option.label}</p>
          </div>
        );
      })
    );
  };

  return (
    <>
      <Box
        boxShadow={1}
        borderSize="md"
        classes={["dropdown", isOpen && "dropdown--expanded"]}
        onClick={handleOnClick}
      >
        <div
          className={["heading", errorMessage ? "heading-error" : ""].join(" ")}
        >
          {selected ? (
            <p>{selected.label}</p>
          ) : (
            <p className="placeholder">Select</p>
          )}
          <Icon name="arrow-chevron-down" />
        </div>
        {isOpen ? (
          <div className="dropdown-content">{renderAllOptions()}</div>
        ) : null}
      </Box>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </>
  );
};

Dropdown.propTypes = {
  /**
   * Dropdown options
   */
  options: PropTypes.arrayOf(PropTypes.object),

  /**
   * Selected option
   * @default null
   * */
  selected: PropTypes.object,

  /**
   * Set selected option
   * */
  setSelected: PropTypes.func,

  /**
   * Error message
   * */
  errorMessage: PropTypes.string,
};

Dropdown.defaultProps = {
  options: [],
  selected: null,
  setSelected: () => {},
  errorMessage: "",
};
