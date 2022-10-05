import React from "react";
import PropTypes from "prop-types";

import "./inputpassword.scss";
import { Input } from "../Input/Input";
import { Icon } from "../../icons/Icon/Icon";

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
          color={"#7F2EE5"}
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
