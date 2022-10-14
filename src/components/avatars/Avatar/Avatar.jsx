import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./avatar.scss";

import { specialistPlaceholder } from "../../../assets";

/**
 * Avatar
 *
 * Avatar component
 *
 * @return {jsx}
 */
export const Avatar = ({ image, size, classes }) => (
  <img
    src={image}
    alt="avatar"
    className={[`avatar avatar--${size}`, classNames(classes)].join(" ")}
  />
);

Avatar.propTypes = {
  /**
   * Image url
   */
  image: PropTypes.string,

  /**
   * Size of the avatar
   * Options: sm, md, lg
   * Default: md
   * */
  size: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Additional classes
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Avatar.defaultProps = {
  image: specialistPlaceholder,
  size: "md",
  clаsses: "",
};
