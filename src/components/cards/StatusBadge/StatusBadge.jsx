import React from "react";
import PropTypes from "prop-types";

import "./status-badge.scss";

/**
 * StatusBadge
 *
 * ACtive/Inactive status badge
 *
 * @return {jsx}
 */
export const StatusBadge = ({ label, status }) => {
  return (
    <div className={`status-badge status-badge--${status}`}>
      <p className="small-text">{label}</p>
    </div>
  );
};

StatusBadge.propTypes = {
  // Add propTypes here
};

StatusBadge.defaultProps = {
  // Add defaultProps here
};
