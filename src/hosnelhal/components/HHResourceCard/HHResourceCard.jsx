import React from "react";
import PropTypes from "prop-types";

import { HHButton } from "../HHButton/HHButton";
import { HHIcon } from "../HHIcon/HHIcon";
import { HHLink } from "../HHLink/HHLink";

import "./hh-resource-card.scss";

/**
 * HHResourceCard
 *
 * Library item: image with the format and length on it, title, description,
 * an open link and an optional download link
 *
 * @return {jsx}
 */
export const HHResourceCard = ({
  to,
  image,
  label,
  labelIcon,
  meta,
  metaIcon,
  title,
  description,
  openLabel,
  download,
}) => {
  return (
    <article className="hh-resource-card">
      <div className="hh-resource-card__media">
        <HHLink to={to} className="hh-resource-card__image" tabIndex={-1} aria-hidden="true">
          {image && <img src={image} alt="" loading="lazy" />}
        </HHLink>
        <div className="hh-resource-card__meta">
          <span className="hh-resource-card__chip hh-resource-card__label">
            {labelIcon && (
              <HHIcon
                name={labelIcon}
                size={16}
                className={`hh-resource-card__icon hh-resource-card__icon--${labelIcon}`}
              />
            )}
            {label}
          </span>
          {meta && (
            <span className="hh-resource-card__chip">
              {metaIcon && (
                <HHIcon name={metaIcon} size={14} className="hh-resource-card__icon" />
              )}
              {meta}
            </span>
          )}
        </div>
      </div>

      <div className="hh-resource-card__content">
        <h3 className="hh-resource-card__title">
          <HHLink to={to} className="hh-resource-card__title-link">
            {title}
          </HHLink>
        </h3>
        {description && (
          <p className="hh-resource-card__description">{description}</p>
        )}
        <div className="hh-resource-card__actions">
          <HHButton
            variant="text"
            to={to}
            className="hh-resource-card__open"
            aria-hidden="true"
            tabIndex={-1}
          >
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
  /** HHIcon name shown before the format */
  labelIcon: PropTypes.string,
  /** Length, e.g. "6 min" */
  meta: PropTypes.node,
  /** HHIcon name shown before the length */
  metaIcon: PropTypes.string,
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
