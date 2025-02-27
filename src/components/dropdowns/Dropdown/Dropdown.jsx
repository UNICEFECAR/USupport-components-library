import React, { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import PropTypes from "prop-types";

import { Box } from "../../boxes/Box";
import { Icon } from "../../icons/Icon";
import { Error } from "../../errors/Error";
import { ThemeContext } from "../../../utils";

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
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  let placeholderText = "Select";
  if (!placeholder || placeholder === "Select") {
    const language = localStorage.getItem("language");
    switch (language) {
      case "en":
        placeholderText = "Select";
        break;
      case "kk":
        placeholderText = "Таңдау";
        break;
      case "ru":
        placeholderText = "Выбрать";
        break;
      case "pl":
        placeholderText = "Wybierz";
        break;
      default:
        placeholderText = "Select";
    }
  }

  const selectedLabel =
    options.find((option) => option.value === selected)?.label || "";

  const handleOnClick = () => {
    if (disabled) return;
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
          <li
            key={index}
            className={[
              "option-container",
              selected ? selected === option.value && "option-selected" : "",
              selected === option.value &&
                theme === "dark" &&
                "option-selected--dark",
              option.isDisabled && "disabled",
            ].join(" ")}
            tabIndex={0}
            role="menuitem"
            onKeyDown={(event) => {
              const { activeElement } = document;
              const key = event.key;
              if (key === "Enter") {
                handleChooseOption(option.value);
              } else if (key === "ArrowUp") {
                event.preventDefault();
                if (activeElement.previousElementSibling) {
                  activeElement.previousElementSibling.focus();
                }
              } else if (key === "ArrowDown") {
                event.preventDefault();
                if (activeElement.nextElementSibling) {
                  activeElement.nextElementSibling.focus();
                }
              }
            }}
            onClick={
              option.isDisabled
                ? () => {}
                : () => handleChooseOption(option.value)
            }
          >
            <p
              role="link"
              className="text dropdown-content__single-option"
              key={index}
            >
              {option.label}
            </p>
          </li>
        );
      })
    );
  };

  const [isFirstOpen, setIsFirstOpen] = useState(true);

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <Box
        boxShadow={"1"}
        borderSize="md"
        classes={[
          "dropdown",
          theme === "dark" && "dropdown--dark",
          isOpen ? "dropdown--expanded" : "",
          disabled ? "dropdown--disabled" : "",
        ]}
      >
        <div
          tabIndex={0}
          role="navigation"
          className={["heading", errorMessage ? "heading-error" : ""].join(" ")}
          onFocus={(e) => {
            e.stopPropagation();
            if (isFirstOpen) {
              handleOnClick();
            }
            setTimeout(() => {
              setIsFirstOpen(false);
            }, 150);
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (disabled) return;
            if (isOpen && !isFirstOpen) {
              setIsOpen(false);
              setTimeout(() => {
                setIsFirstOpen(true);
              }, 150);
            } else {
              setIsOpen(true);
              setTimeout(() => {
                setIsFirstOpen(false);
              }, 150);
            }
          }}
        >
          {selected ? (
            <p className="text">{selectedLabel}</p>
          ) : (
            <p className="text placeholder">{placeholderText}</p>
          )}
          <Icon
            name="arrow-chevron-down"
            color={theme === "dark" ? "#fff" : "#373737"}
          />
        </div>
        <div
          className={[
            "dropdown-content",
            theme === "dark" && "dropdown-content--dark",
          ].join(" ")}
        >
          <ul role="menubar" className="dropdown-content__options-container">
            {renderAllOptions()}
          </ul>
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
   * The value of the selected option
   * @default null
   * */
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
  disabled: false,
};
