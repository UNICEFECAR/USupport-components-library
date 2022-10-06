import React from "react";
import PropTypes from "prop-types";
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
    <div
      className={[
        `grid-item xs-${xs} md-${md} lg-${lg}`,
        classNames(classes),
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

GridItem.propTypes = {
  /**
   * Number of columns to span on extra small screens
   */
  xs: PropTypes.oneOf([1, 2, 3, 4]),

  /**
   * Number of columns to span on medium screens
   */
  md: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),

  /**
   * Number of columns to span on large screens
   */
  lg: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  /**
   * Additional classes to be added to the grid item
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

GridItem.defaultProps = {
  xs: 4,
  md: null,
  lg: null,
};
