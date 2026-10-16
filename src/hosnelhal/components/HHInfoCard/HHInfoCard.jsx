import React from "react";
import PropTypes from "prop-types";

import { HHPanel } from "../HHPanel/HHPanel";

import "./hh-info-card.scss";

/**
 * HHInfoCard
 *
 * Card with a title and text, e.g. a step in a guide
 *
 * @return {jsx}
 */
export const HHInfoCard = ({ as: Tag = "h3", variant = "soft", marker, title, children }) => {
  return (
    <HHPanel as="div" variant={variant} className="hh-info-card">
      {marker != null && marker !== "" && (
        <span className="hh-info-card__marker">{marker}</span>
      )}
      <Tag className="hh-info-card__title">{title}</Tag>
      <div className="hh-info-card__text">{children}</div>
    </HHPanel>
  );
};

HHInfoCard.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(["soft", "bordered"]),
  marker: PropTypes.node,
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};
