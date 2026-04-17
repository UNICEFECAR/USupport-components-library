import React from "react";
import PropTypes from "prop-types";

import { Box } from "../../boxes/Box/Box";

import "./status-badge.scss";

/**
 * StatusBadge
 *
 * ACtive/Inactive status badge
 *
 * @return {jsx}
 */
export const StatusBadge = ({ label, status, withBox }) => {
  if (withBox) {
    return (
      <Box borderSize="lg" boxShadow="1" liquidGlass classes="status-badge__box">
        <div className={`status-badge status-badge--${status}`}>
          <p className="small-text status-badge__label">{label}</p>
        </div>
      </Box>
    );
  }

  return (
    <div className={`status-badge status-badge--${status}`}>
      <p className="small-text status-badge__label">{label}</p>
    </div>
  );
};

StatusBadge.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["active", "inactive", "in-progress"]).isRequired,
  withBox: PropTypes.bool,
};

StatusBadge.defaultProps = {
  withBox: true,
};
