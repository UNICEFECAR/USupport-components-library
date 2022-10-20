import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box";
import { Icon } from "../../icons/Icon";
import OutsideClickHandler from "react-outside-click-handler";
import { Error } from "../../errors/Error";

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
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
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
            <p className="text">{selected.label}</p>
          ) : (
            <p className="text placeholder">{placeholder}</p>
          )}
          <Icon name="arrow-chevron-down" />
        </div>
        <div className="dropdown-content">
          <div className="dropdown-content__options-container">
            {renderAllOptions()}
          </div>
        </div>
      </Box>
      {errorMessage ? <Error message={errorMessage} /> : null}
    </OutsideClickHandler>
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
