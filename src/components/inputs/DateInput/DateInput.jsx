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
    <Input
      classes={classNames([...classes, "date-input"])}
      type="date"
      ref={inputRef}
      onFocus={() => {
        console.log("focus");
        inputRef.current?.showPicker();
      }}
      {...props}
    />
  );
};
