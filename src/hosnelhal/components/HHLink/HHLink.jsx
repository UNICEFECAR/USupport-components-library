import React from "react";
import PropTypes from "prop-types";

import { useHHRoot } from "../HHRoot/HHRoot";

/**
 * HHLink
 *
 * Internal links (`to`) use the router link given to HHRoot, external
 * links and files (`href`) use a plain anchor.
 *
 * @return {jsx}
 */
export const HHLink = ({ to, href, children, ...props }) => {
  const { linkComponent: RouterLink } = useHHRoot();

  if (to && RouterLink) {
    return (
      <RouterLink to={to} {...props}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a href={to || href} {...props}>
      {children}
    </a>
  );
};

HHLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
};
