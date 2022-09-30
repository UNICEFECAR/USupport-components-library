import React from "react";
import PropTypes from "prop-types";

import "./emoticon.scss";
import { Icon } from "../Icon/Icon";

/**
 * Emoteicon component
 *
 * @return {jsx}
 */
export const Emoticon = ({ name, size }) => {
  return <Icon name={name} classes={`emoticon emoticon--${size}`} />;
};

Emoticon.propTypes = {
  /**
   * Name of the icon to render from the sprite file (e.g. "filter")
   * */
  name: PropTypes.string.isRequired,
  /**
   * Size of the icon
   * */
  size: PropTypes.oneOf(["small", "large"]),
};

Emoticon.defaultProps = {
  // Add default props here
};
