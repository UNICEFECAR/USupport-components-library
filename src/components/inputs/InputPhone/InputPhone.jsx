import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const PhoneInputComponent = PhoneInput.default
  ? PhoneInput.default
  : PhoneInput;

import { Error } from "../../errors";
import { ThemeContext } from "../../../utils";

import "./input-phone.scss";

/**
 * InputPhone
 *
 * Input phone component
 *
 * @return {jsx}
 */
export const InputPhone = ({
  value,
  label,
  errorMessage,
  classes,
  disabled,
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[
        "input-container",
        "phone-input-wrapper",
        disabled && "disabled",
        classNames(classes),
      ].join(" ")}
    >
      {label ? (
        <p
          className={[
            "text label",
            theme === "dark" ? "label--dark" : "",
            theme === "highContrast" ? "label--hc" : "",
          ].join(" ")}
        >
          {label}
        </p>
      ) : null}
      <PhoneInputComponent
        containerClass={[
          "input-phone-container",
          theme !== "light" && "input-phone-container--dark",
          errorMessage && "error",
        ].join(" ")}
        inputClass={[
          "input-phone-container__input",
          "text",
          theme !== "light" && "input-phone-container__input--dark",
        ].join(" ")}
        buttonClass="input-phone-container__button"
        dropdownClass="input-phone-container__dropdown"
        searchClass="input-phone-container__search"
        enableSearch
        value={value}
        excludeCountries={"ru"}
        disabled={disabled}
        {...rest}
      />
      {errorMessage && !disabled ? <Error message={errorMessage} /> : null}
    </div>
  );
};

InputPhone.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
};
