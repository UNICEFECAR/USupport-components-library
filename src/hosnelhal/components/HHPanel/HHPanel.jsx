import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./hh-panel.scss";

/**
 * HHPanel
 *
 * Rounded section on the soft surface colour, or a bordered card
 *
 * @return {jsx}
 */
export const HHPanel = ({ as: Tag = "section", variant = "soft", className, children, ...props }) => {
  return (
    <Tag
      className={classNames("hh-panel", `hh-panel--${variant}`, className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

HHPanel.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(["soft", "bordered"]),
  className: PropTypes.string,
  children: PropTypes.node,
};
