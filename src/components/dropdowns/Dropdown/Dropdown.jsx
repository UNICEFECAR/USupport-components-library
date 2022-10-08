import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { Icon } from "../../icons/Icon/Icon";

import "./dropdown.scss";

/**
 * Dropdown
 *
 * Dropdown component
 *
 * @return {jsx}
 */
export const Dropdown = ({
  options,
  selected,
  setSelected,
  errorMessage,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChooseOption = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const renderAllOptions = () => {
    if (!isOpen) return <div />;
    return (
      options &&
      options.map((option, index) => {
        return (
          <div
            key={index}
            className={[
              "option-container",
              selected
                ? selected.label === option.label && "option-selected"
                : "",
              option.isDisabled && "disabled",
            ].join(" ")}
            onClick={
              option.isDisabled ? () => {} : () => handleChooseOption(option)
            }
          >
            <p className="text dropdown-content__single-option" key={index}>
              {option.label}
            </p>
          </div>
        );
      })
    );
  };

  return (
    <>
      <Box
        boxShadow={"1"}
        borderSize="md"
        classes={["dropdown", isOpen ? "dropdown--expanded" : ""]}
        onClick={handleOnClick}
      >
        <div
          className={["heading", errorMessage ? "heading-error" : ""].join(" ")}
        >
          {selected ? (
            <p>{selected.label}</p>
          ) : (
            <p className="placeholder">{placeholder}</p>
          )}
          <Icon name="arrow-chevron-down" />
        </div>
        <div className="dropdown-content">{renderAllOptions()}</div>
      </Box>
      {errorMessage ? (
        <p className="small-text error-message">{errorMessage}</p>
      ) : null}
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

  /**
   * Placeholder
   * */
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  options: [],
  selected: null,
  setSelected: () => {},
  errorMessage: "",
  placeholder: "Select",
};
