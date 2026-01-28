import React from "react";
import classNames from "classnames";

import "./card.scss";

/**
 * Card
 *
 * A base card component
 *
 * @return {jsx}
 */
export const Card = ({ children, borderColor, classes }) => {
  return (
    <div className={classNames("card", `card--border-${borderColor}`, classes)}>
      {children}
    </div>
  );
};
