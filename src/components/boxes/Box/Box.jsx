import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./box.scss";

/**
 * Box
 *
 * A base box component that will be used as a wrapper
 *
 * @return {jsx}
 */
export const Box = ({ borderSize, boxShadow, classes, children, ...args }) => {
  return (
    <div
      className={[
        "box",
        `box--border-radius-${borderSize}`,
        `box--box-shadow-${boxShadow}`,
        classNames(classes),
      ].join(" ")}
      {...args}
    >
      {children}
    </div>
  );
};

Box.propTypes = {
  /**
   * How large should the border radius of the box be?
   */
  borderSize: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Which is the box shadow of the box?
   */
  boxShadow: PropTypes.string,

  /**
   * Additional classes to be added to the box
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Box.defaultProps = {
  borderSize: "sm",
  boxShadow: "1",
};
