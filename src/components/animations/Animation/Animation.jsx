import React from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";

/**
 * Animation
 *
 * Lottie animation to be used only for .json files
 *
 * @return {jsx}
 */
export const Animation = ({ json }) => {
  return <Lottie animationData={json} loop={true} />;
};

Animation.propTypes = {
  /**
   * Animation json file
   * */
  json: PropTypes.object.isRequired,
};

Animation.defaultProps = {};
