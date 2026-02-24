import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./card.scss";

/**
 * Card
 *
 * A base card component
 *
 * @return {jsx}
 */
export const Card = ({ children, borderColor, liquidGlass, classes }) => {
  return (
    <div
      className={classNames(
        "card",
        `card--border-${borderColor}`,
        { "card--liquid-glass": liquidGlass },
        classes
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  borderColor: PropTypes.string,
  liquidGlass: PropTypes.bool,
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Card.defaultProps = {
  liquidGlass: false,
};
