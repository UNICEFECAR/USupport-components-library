import React from "react";
import PropTypes from "prop-types";

import "./emoticon.scss";
import { Icon } from "../Icon/Icon";

/**
 * Emoticon component
 *
 * @return {jsx}
 */
export const Emoticon = ({ name, size }) => {
  // TODO: lg icon not working due to the linear gradient
  return (
    <Icon name={`${name}-${size}`} classes={`emoticon emoticon--${size}`} />
  );
};

Emoticon.propTypes = {
  /**
   * Name of the icon to render from the sprite file (e.g. "filter")
   * */
  name: PropTypes.string.isRequired,

  /**
   * Size of the icon
   * */
  size: PropTypes.oneOf(["sm", "lg"]),
};

Emoticon.defaultProps = {
  size: "sm",
};
