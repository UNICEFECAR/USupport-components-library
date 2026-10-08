import React from "react";
import PropTypes from "prop-types";

import "./hh-info-card.scss";

/**
 * HHInfoCard
 *
 * Bordered card with a title and text, e.g. a step in a guide
 *
 * @return {jsx}
 */
export const HHInfoCard = ({ as: Tag = "h3", title, children }) => {
  return (
    <div className="hh-info-card">
      <Tag className="hh-info-card__title">{title}</Tag>
      <div className="hh-info-card__text">{children}</div>
    </div>
  );
};

HHInfoCard.propTypes = {
  as: PropTypes.elementType,
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};
