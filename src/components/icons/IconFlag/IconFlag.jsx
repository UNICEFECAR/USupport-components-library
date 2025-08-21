import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Icon } from "../Icon";
import { ThemeContext } from "../../../utils";

import "./iconflag.scss";

/**
 * IconFlag
 *
 * IconFlag component
 *
 * @return {jsx}
 */
export const IconFlag = ({ flagName }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Icon
      name={`flag-${flagName}`}
      size="md"
      aria-label={flagName}
      color={
        flagName === "global"
          ? theme === "highContrast"
            ? "#ffff00"
            : "#20809e"
          : null
      }
    />
  );
};

IconFlag.propTypes = {
  /**
   * Name of the flag
   * */
  flagname: PropTypes.string,
};

IconFlag.defaultProps = {
  // Add defaultProps here
};
