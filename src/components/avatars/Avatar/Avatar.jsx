import React from "react";
import PropTypes from "prop-types";

import "./avatar.scss";

import { specialistPlaceholder } from "../../../assets";

/**
 * Avatar
 *
 * Avatar component
 *
 * @return {jsx}
 */
export const Avatar = ({ image, size }) => {
  return <img src={image} alt="avatar" className={`avatar avatar--${size}`} />;
};

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
};

Avatar.defaultProps = {
  image: specialistPlaceholder,
  size: "md",
};
