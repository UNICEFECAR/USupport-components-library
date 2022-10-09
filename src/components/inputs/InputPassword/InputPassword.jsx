import React from "react";
import PropTypes from "prop-types";

import "./input-password.scss";
import { Input } from "../Input";
import { Icon } from "../../icons/Icon";

/**
 * InputPassword
 *
 * Input Password component
 *
 * @return {jsx}
 */
export const InputPassword = ({ ...props }) => {
  const [inputType, setInputType] = React.useState("password");

  return (
    <Input type={inputType} {...props}>
      <div
        onClick={() =>
          setInputType(inputType === "password" ? "text" : "password")
        }
        className="icon-wrapper"
      >
        <Icon
          name={inputType === "text" ? "hide" : "view"}
          size="md"
          color={"#7f2ee5"}
        />
      </div>
    </Input>
  );
};

InputPassword.propTypes = {
  // Add propTypes here
};

InputPassword.defaultProps = {
  label: "Password",
  placeholder: "Password",
};
