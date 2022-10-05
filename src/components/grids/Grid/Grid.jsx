import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../../boxes/Box/Box";

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
    <Box classes={`grid ${classNames(classes)}`} style={style} {...props}>
      {children}
    </Box>
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
