import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHLanguageSelect } from "../HHLanguageSelect/HHLanguageSelect";
import { HHLink } from "../HHLink/HHLink";
import { HHLogo } from "../HHLogo/HHLogo";

import "./hh-site-header.scss";

/**
 * HHSiteHeader
 *
 * Logos, main navigation and the language dropdown
 *
 * @return {jsx}
 */
export const HHSiteHeader = ({
  logos,
  links,
  navLabel,
  languages = [],
  language,
  languageLabel,
  onLanguageChange,
}) => {
  return (
    <header className="hh-site-header hh__container">
      <div className="hh-site-header__logos">
        {logos.map((logo) => (
          <HHLogo key={logo.src} {...logo} />
        ))}
      </div>

      <nav className="hh-site-header__nav" aria-label={navLabel}>
        <ul className="hh-site-header__links">
          {links.map((link) => (
            <li key={link.to}>
              <HHLink
                to={link.to}
                className={classNames("hh-site-header__link", {
                  "hh-site-header__link--active": link.isActive,
                })}
                aria-current={link.isActive ? "page" : undefined}
              >
                {link.label}
              </HHLink>
            </li>
          ))}
        </ul>

        {languages.length > 1 && (
          <HHLanguageSelect
            languages={languages}
            value={language}
            label={languageLabel}
            onChange={onLanguageChange}
          />
        )}
      </nav>
    </header>
  );
};

HHSiteHeader.propTypes = {
  /** HHLogo props, see HHLogo */
  logos: PropTypes.arrayOf(PropTypes.object).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ).isRequired,
  navLabel: PropTypes.string,
  languages: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
  language: PropTypes.string,
  /** Accessible name of the language dropdown, e.g. "Language" */
  languageLabel: PropTypes.string,
  onLanguageChange: PropTypes.func,
};
