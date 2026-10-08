import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./hh-media-frame.scss";

/**
 * HHMediaFrame
 *
 * Rounded, bordered frame around a viewer (video, audio, PDF, image)
 *
 * @return {jsx}
 */
export const HHMediaFrame = ({ className, children }) => {
  return <div className={classNames("hh-media-frame", className)}>{children}</div>;
};

HHMediaFrame.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
