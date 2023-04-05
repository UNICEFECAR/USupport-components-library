import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./emoticon.scss";
import { Icon } from "../Icon";

/**
 * Emoticon component
 *
 * @return {jsx}
 */
export const Emoticon = ({ name, size = "sm", ...rest }) => {
  return (
    <Icon
      name={[`${name}-${size === "lg" ? "lg" : "sm"}`].join(" ")}
      classes={`emoticon emoticon--${size}`}
      {...rest}
    />
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
  size: PropTypes.oneOf(["xs", "sm", "lg"]),
};

Emoticon.defaultProps = {
  size: "sm",
};
