import React from "react";
import PropTypes from "prop-types";

import { HHLink } from "../HHLink/HHLink";

import "./hh-section-header.scss";

/**
 * HHSectionHeader
 *
 * Section title with an optional "view all" style link
 *
 * @return {jsx}
 */
export const HHSectionHeader = ({ as: Tag = "h2", title, id, action }) => {
  return (
    <div className="hh-section-header">
      <Tag className="hh-section-header__title" id={id}>
        {title}
      </Tag>
      {action && (
        <HHLink to={action.to} className="hh-section-header__action">
          {action.label}
        </HHLink>
      )}
    </div>
  );
};

HHSectionHeader.propTypes = {
  as: PropTypes.elementType,
  title: PropTypes.node.isRequired,
  id: PropTypes.string,
  action: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
  }),
};
