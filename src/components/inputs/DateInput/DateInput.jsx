import React, { useRef } from "react";
import classNames from "classnames";
import { Input } from "../Input";

import "./date-input.scss";

/**
 * DateInput
 *
 * Date input component
 *
 * @return {jsx}
 */
export const DateInput = ({ classes = [], ...props }) => {
  const inputRef = useRef();
  const hasValue = !!props.value;
  return (
    <div
      className="date-input__container"
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.showPicker();
      }}
    >
      <Input
        classes={classNames([...classes, "date-input"])}
        type="date"
        ref={inputRef}
        {...props}
      >
        <p
          className={classNames("date-input__placeholder text", {
            "date-input__placeholder--placeholder": !hasValue,
          })}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.showPicker();
          }}
        >
          {props.value || props.placeholder}
        </p>
      </Input>
    </div>
  );
};
