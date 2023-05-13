import React, { useState } from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import { Error } from "../../errors";

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
  ...rest
}) => {
  return (
    <div className={["phone-input-wrapper", classes].join(" ")}>
      {label ? <p className="text label">{label}</p> : null}
      <PhoneInput
        containerClass="input-phone-container"
        inputClass={[
          "input-phone-container__input",
          errorMessage && "input-phone-container__input--error",
        ].join(" ")}
        buttonClass="input-phone-container__button"
        dropdownClass="input-phone-container__dropdown"
        searchClass="input-phone-container__search"
        enableSearch
        value={value}
        excludeCountries={"ru"}
        {...rest}
      />
      {errorMessage ? <Error message={errorMessage} /> : null}
    </div>
  );
};

InputPhone.propTypes = {
  // Add propTypes here
};
