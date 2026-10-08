import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./hh-page-intro.scss";

/**
 * HHPageIntro
 *
 * Page heading with an optional eyebrow and lead paragraph. The "hero"
 * variant sits on a soft panel, the "page" variant uses the primary colour.
 *
 * @return {jsx}
 */
export const HHPageIntro = ({ variant = "page", eyebrow, title, lead, children }) => {
  return (
    <div className={classNames("hh-page-intro", `hh-page-intro--${variant}`)}>
      <div className="hh-page-intro__copy">
        {eyebrow && <p className="hh-page-intro__eyebrow">{eyebrow}</p>}
        <h1 className="hh-page-intro__title">{title}</h1>
        {lead && <p className="hh-page-intro__lead">{lead}</p>}
      </div>
      {children}
    </div>
  );
};

HHPageIntro.propTypes = {
  variant: PropTypes.oneOf(["hero", "page"]),
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  lead: PropTypes.node,
  children: PropTypes.node,
};
