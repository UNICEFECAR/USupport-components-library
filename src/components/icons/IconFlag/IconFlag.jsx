import React from "react";
import PropTypes from "prop-types";

import "./iconflag.scss";
import { Icon } from "../Icon";

/**
 * IconFlag
 *
 * IconFlag component
 *
 * @return {jsx}
 */
export const IconFlag = ({ flagName }) => {
  return <Icon name={`flag-${flagName}`} size="md" />;
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
