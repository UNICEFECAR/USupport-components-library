import React from "react";
import PropTypes from "prop-types";

import { HHLink } from "../HHLink/HHLink";

import "./hh-back-link.scss";

/**
 * HHBackLink
 *
 * Link back to the parent page; the arrow follows the text direction
 *
 * @return {jsx}
 */
export const HHBackLink = ({ to, children }) => {
  return (
    <HHLink to={to} className="hh-back-link">
      <span className="hh-back-link__arrow" aria-hidden="true">
        ←
      </span>
      {children}
    </HHLink>
  );
};

HHBackLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
