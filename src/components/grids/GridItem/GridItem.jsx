import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import classNames from "classnames";

import "./griditem.scss";

/**
 * GridItem
 *
 * GridItem component
 *
 * @return {jsx}
 */
export const GridItem = ({ xs, md, lg, children, classes, ...props }) => {
  return (
    <Box
      classes={[
        `grid-item xs-${xs} md-${md} lg-${lg}`,
        classNames(classes),
      ].join(" ")}
      {...props}
    >
      {children}
    </Box>
  );
};

GridItem.propTypes = {
  /**
   * Number of columns to span on extra small screens
   **/
  xs: PropTypes.oneOf([1, 2, 3, 4]),

  /**
   * Number of columns to span on medium screens
   **/
  md: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),

  /**
   * Number of columns to span on large screens
   **/
  xl: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  // Add defaultProps here
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

GridItem.defaultProps = {
  xs: 1,
  md: null,
  lg: null,
};
