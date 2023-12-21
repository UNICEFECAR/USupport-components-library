import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ThemeContext } from "@USupport-components-library/utils";
import "./box.scss";

/**
 * Box
 *
 * A base box component that will be used as a wrapper
 *
 * @return {jsx}
 */
export const Box = ({ borderSize, boxShadow, classes, children, ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[
        "box",
        `box--border-radius-${borderSize}`,
        `box--box-shadow-${theme === "dark" ? 3 : boxShadow}`,
        classNames(classes),
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

Box.propTypes = {
  /**
   * How large should the border radius of the box be?
   */
  borderSize: PropTypes.oneOf(["xs", "sm", "md", "lg"]),

  /**
   * Which is the box shadow of the box?
   */
  boxShadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
