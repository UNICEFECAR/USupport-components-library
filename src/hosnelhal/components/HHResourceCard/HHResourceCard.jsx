import React from "react";
import PropTypes from "prop-types";

import { HHButton } from "../HHButton/HHButton";
import { HHLink } from "../HHLink/HHLink";

import "./hh-resource-card.scss";

/**
 * HHResourceCard
 *
 * Library item: image, format and length, title, description, an open link
 * and an optional download link
 *
 * @return {jsx}
 */
export const HHResourceCard = ({
  to,
  image,
  label,
  meta,
  title,
  description,
  openLabel,
  download,
}) => {
  return (
    <article className="hh-resource-card">
      <HHLink to={to} className="hh-resource-card__media" tabIndex={-1} aria-hidden="true">
        {image && <img src={image} alt="" loading="lazy" />}
      </HHLink>

      <div className="hh-resource-card__content">
        <div className="hh-resource-card__meta">
          <span className="hh-resource-card__label">{label}</span>
          {meta && <span>{meta}</span>}
        </div>
        <h3 className="hh-resource-card__title">
          <HHLink to={to} className="hh-resource-card__title-link">
            {title}
          </HHLink>
        </h3>
        {description && (
          <p className="hh-resource-card__description">{description}</p>
        )}
        <div className="hh-resource-card__actions">
          <HHButton variant="text" to={to} aria-hidden="true" tabIndex={-1}>
            {openLabel}
          </HHButton>
          {download && (
            <HHButton
              variant="text"
              href={download.href}
              download
              onClick={download.onClick}
              aria-label={download.ariaLabel}
            >
              {download.label}
            </HHButton>
          )}
        </div>
      </div>
    </article>
  );
};

HHResourceCard.propTypes = {
  to: PropTypes.string.isRequired,
  image: PropTypes.string,
  /** Format, e.g. "Video" */
  label: PropTypes.node.isRequired,
  /** Length, e.g. "6 min" */
  meta: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  openLabel: PropTypes.node.isRequired,
  download: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    ariaLabel: PropTypes.string,
    onClick: PropTypes.func,
  }),
};
