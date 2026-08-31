import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../../icons/Icon/Icon";

import "./peer-support-badge.scss";

/**
 * PeerSupportBadge
 *
 * U-FRIEND badge for peer support providers
 *
 * @return {jsx}
 */
export const PeerSupportBadge = ({ label = "U-FRIEND", classes }) => {
  return (
    <div
      className={["peer-support-badge", classes].filter(Boolean).join(" ")}
    >
      <Icon name="heart" size="sm" color="#FFFFFF" />
      <p className="small-text">{label}</p>
    </div>
  );
};

PeerSupportBadge.propTypes = {
  label: PropTypes.string,
  classes: PropTypes.string,
};
