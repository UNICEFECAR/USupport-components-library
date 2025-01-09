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
  return (
    <div
      style={{
        position: "relative",
      }}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.showPicker();
      }}
    >
      <p
        className="date-input-placeholder text"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.showPicker();
        }}
      >
        {props.value || props.placeholder}
      </p>

      <Input
        classes={classNames([...classes, "date-input"])}
        type="date"
        ref={inputRef}
        {...props}
      />
    </div>
  );
};
