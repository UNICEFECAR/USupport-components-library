import React from "react";
import PropTypes from "prop-types";

import { HHLink } from "../HHLink/HHLink";
import { HHLogo } from "../HHLogo/HHLogo";

import "./hh-site-footer.scss";

/**
 * HHSiteFooter
 *
 * Program logo, tagline, partner logo and secondary links
 *
 * @return {jsx}
 */
export const HHSiteFooter = ({ logoStart, logoEnd, text, links, linksLabel }) => {
  return (
    <footer className="hh-site-footer hh__container">
      <div className="hh-site-footer__row">
        {logoStart && <HHLogo {...logoStart} />}
        <p className="hh-site-footer__text">{text}</p>
        {logoEnd && <HHLogo {...logoEnd} />}
      </div>

      {links?.length > 0 && (
        <nav aria-label={linksLabel}>
          <ul className="hh-site-footer__links">
            {links.map((link) => (
              <li key={link.to}>
                <HHLink to={link.to} className="hh-site-footer__link">
                  {link.label}
                </HHLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </footer>
  );
};

HHSiteFooter.propTypes = {
  logoStart: PropTypes.object,
  logoEnd: PropTypes.object,
  text: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({ to: PropTypes.string, label: PropTypes.string })
  ),
  linksLabel: PropTypes.string,
};
