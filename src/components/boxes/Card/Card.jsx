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
export const Card = ({
  children,
  borderColor,
  liquidGlass,
  classes,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        "card",
        `card--border-${borderColor}`,
        { "card--liquid-glass": liquidGlass },
        classes
      )}
      onClick={onClick}
      {...rest}
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
  onClick: PropTypes.func,
};

Card.defaultProps = {
  liquidGlass: false,
};
