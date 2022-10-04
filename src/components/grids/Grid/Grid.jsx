import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./grid.scss";

/**
 * Grid
 *
 * Grid component
 *
 * @return {jsx}
 */
export const Grid = ({ classes, style, children, ...props }) => {
  return (
    <div className={`grid ${classNames(classes)}`} style={style} {...props}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  /**
   * Additional classes to be added to the grid
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Additional styles to be added to the Grid
   **/
  style: PropTypes.object,
};

Grid.defaultProps = {
  classes: "",
  style: null,
};
