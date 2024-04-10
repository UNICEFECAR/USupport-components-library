import { useState, useEffect, createRef, useContext } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "../../../utils";

import "./pin-input.scss";

/**
 * PinInput
 *
 * Pin input for code verification
 *
 * @return {jsx}
 */
export const PinInput = ({ length, secret, onChange }) => {
  const { theme } = useContext(ThemeContext);

  const [values, setValues] = useState(Array(length).fill(""));
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRefs = Array.from({ length }).map(() => createRef());

  const handleOnChange = (index, val) => {
    let newValue = [...values];
    const trimmedVal = val.slice(0, 1);
    newValue[index] = trimmedVal;

    if (val === "" && index > 0) {
      setFocusIndex(index - 1);
    } else if (val && index < length - 1) {
      setFocusIndex(index + 1);
    }

    setValues(newValue);

    setTimeout(() => {
      onChange(newValue.join(""));
    }, 0);
  };

  const handleKeyDown = (index, e) => {
    if (e.keyCode === 8 && !values[index]) {
      if (index > 0) {
        setFocusIndex(index - 1);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let pastedData = e.clipboardData.getData("text/plain");

    pastedData = pastedData.replace(/\D/g, "");

    const pastedArray = pastedData.split("").slice(0, length);

    setValues((prevValues) => {
      let newValue = [...prevValues];
      pastedArray.forEach((char, i) => {
        newValue[i] = char;
      });
      onChange(newValue.join(""));
      return newValue;
    });

    setFocusIndex(pastedArray.length - 1);
  };

  useEffect(() => {
    if (inputRefs[focusIndex] && inputRefs[focusIndex].current) {
      inputRefs[focusIndex].current.focus();
    }
  }, [focusIndex]);

  return (
    <div className="pin-input" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => {
        return (
          <input
            key={index}
            ref={inputRefs[index]}
            type={secret ? "password" : "number"}
            value={values[index]}
            onChange={(e) => handleOnChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className={[
              "pin-input__input",
              theme === "dark" && "pin-input__input--dark",
            ].join(" ")}
            autoComplete="off"
            name={Math.random().toString(36).substring(7)}
          />
        );
      })}
    </div>
  );
};

PinInput.propTypes = {
  /**
   * The length of the pin input
   */
  length: PropTypes.number.isRequired,

  /**
   * Whether to hide the input
   */
  secret: PropTypes.bool,

  /**
   * Callback function when the value changes
   */
  onChange: PropTypes.func.isRequired,
};

PinInput.defaultProps = {
  secret: false,
};
