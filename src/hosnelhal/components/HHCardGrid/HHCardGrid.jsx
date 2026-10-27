import React from "react";
import PropTypes from "prop-types";

import "./hh-card-grid.scss";

/**
 * HHCardGrid
 *
 * Responsive list of cards: one column on phones, up to four on desktop
 *
 * @return {jsx}
 */
export const HHCardGrid = ({ children, labelledBy }) => {
  return (
    <ul className="hh-card-grid" aria-labelledby={labelledBy}>
      {React.Children.map(children, (child) =>
        child ? <li className="hh-card-grid__item">{child}</li> : null
      )}
    </ul>
  );
};

HHCardGrid.propTypes = {
  children: PropTypes.node,
  labelledBy: PropTypes.string,
};
