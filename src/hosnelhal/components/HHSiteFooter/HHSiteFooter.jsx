import React from "react";
import PropTypes from "prop-types";

import { HHButton } from "../HHButton/HHButton";
import { HHLink } from "../HHLink/HHLink";
import { HHLogo } from "../HHLogo/HHLogo";

import "./hh-site-footer.scss";

const HeartIcon = () => (
  <span className="hh-site-footer__heart" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/**
 * HHSiteFooter
 *
 * Three-column footer: brand + partner, quick links, support CTA
 *
 * @return {jsx}
 */
export const HHSiteFooter = ({
  logoStart,
  logoEnd,
  tagline,
  supportedByLabel,
  linksTitle,
  links,
  linksLabel,
  action,
  copyright,
}) => {
  return (
    <footer className="hh-site-footer">
      <div className="hh-site-footer__inner hh__container">
        <div className="hh-site-footer__columns">
          <div className="hh-site-footer__brand">
            {logoStart && <HHLogo size="md" {...logoStart} />}
            {tagline && <p className="hh-site-footer__tagline">{tagline}</p>}
            {supportedByLabel && (
              <p className="hh-site-footer__supported-by">{supportedByLabel}</p>
            )}
            {logoEnd && <HHLogo size="md" {...logoEnd} />}
          </div>

          {links?.length > 0 && (
            <div className="hh-site-footer__quick-links">
              {linksTitle && (
                <h2 className="hh-site-footer__heading">{linksTitle}</h2>
              )}
              <nav aria-label={linksLabel || linksTitle}>
                <ul className="hh-site-footer__links">
                  {links.map((link) => (
                    <li key={link.to || link.label}>
                      {link.onClick ? (
                        <button
                          type="button"
                          className="hh-site-footer__link"
                          onClick={link.onClick}
                        >
                          {link.label}
                        </button>
                      ) : (
                        <HHLink to={link.to} className="hh-site-footer__link">
                          {link.label}
                        </HHLink>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {action && (
            <div className="hh-site-footer__support">
              <div className="hh-site-footer__support-title">
                <HeartIcon />
                <h2 className="hh-site-footer__heading">{action.title || action.label}</h2>
              </div>
              {action.description && (
                <p className="hh-site-footer__support-text">{action.description}</p>
              )}
              <HHButton
                to={action.to}
                variant="primary"
                className="hh-site-footer__cta"
              >
                {action.label}
              </HHButton>
            </div>
          )}
        </div>

        {copyright && <p className="hh-site-footer__copyright">{copyright}</p>}
      </div>
    </footer>
  );
};

HHSiteFooter.propTypes = {
  logoStart: PropTypes.object,
  logoEnd: PropTypes.object,
  tagline: PropTypes.string,
  supportedByLabel: PropTypes.string,
  linksTitle: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  linksLabel: PropTypes.string,
  action: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    title: PropTypes.node,
    description: PropTypes.node,
  }),
  copyright: PropTypes.string,
};
