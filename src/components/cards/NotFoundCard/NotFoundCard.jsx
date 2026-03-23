import React, { useContext } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "@USupport-components-library/utils";
import {
  Icon,
  NewButton,
  RadialCircle,
} from "@USupport-components-library/src";

import notFoundIllustration from "@USupport-components-library/src/assets/not-found-transparent.png";

import "./not-found.scss";

const ICON_ACCENT = "#20809e";

/**
 * NotFoundCard
 *
 * @return {jsx}
 */
export const NotFoundCard = ({
  mode,
  iconName,
  title,
  subtitle,
  radialColor,
  headingText,
  descriptionLine1,
  descriptionLine2,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  imageSrc,
  imageAlt,
  isRtl,
}) => {
  const { theme } = useContext(ThemeContext);
  const iconColor = theme === "dark" ? "#54cfd9" : ICON_ACCENT;

  const illustration = imageSrc || notFoundIllustration;

  if (mode === "illustrated") {
    return (
      <div
        className={`not-found-card not-found-card--radial-${radialColor} ${
          isRtl ? "not-found-card--rtl" : ""
        }`}
      >
        <RadialCircle color={radialColor} classes="not-found-card__glow" />
        <div className="not-found-card__card not-found-card__card--illustrated">
          <div className="not-found-card__media">
            <img
              src={illustration}
              alt={imageAlt || ""}
              className="not-found-card__image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="not-found-card__body">
            <h3 className="not-found-card__heading">{headingText}</h3>
            {descriptionLine1 ? (
              <p className="not-found-card__line">{descriptionLine1}</p>
            ) : null}
            {descriptionLine2 ? (
              <p className="not-found-card__line">{descriptionLine2}</p>
            ) : null}
            {(primaryLabel || secondaryLabel) && (
              <div className="not-found-card__actions">
                {primaryLabel && onPrimaryClick ? (
                  <NewButton
                    type="solid"
                    size="md"
                    label={primaryLabel}
                    onClick={onPrimaryClick}
                    classes="not-found-card__action-btn"
                  />
                ) : null}
                {secondaryLabel && onSecondaryClick ? (
                  <NewButton
                    type="outline"
                    size="md"
                    label={secondaryLabel}
                    onClick={onSecondaryClick}
                    classes="not-found-card__action-btn"
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`not-found-card not-found-card--radial-${radialColor}`}>
      <RadialCircle color={radialColor} classes="not-found-card__glow" />
      <div className="not-found-card__card not-found-card__card--simple">
        <div className="not-found-card__icon-wrap" aria-hidden>
          <Icon name={iconName} size="xl" color={iconColor} />
        </div>
        <h3 className="not-found-card__title">{title}</h3>
        {subtitle ? (
          <p className="not-found-card__subtitle">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
};

NotFoundCard.propTypes = {
  mode: PropTypes.oneOf(["simple", "illustrated"]),
  iconName: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  radialColor: PropTypes.oneOf(["blue", "purple"]),
  headingText: PropTypes.string,
  descriptionLine1: PropTypes.string,
  descriptionLine2: PropTypes.string,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  onSecondaryClick: PropTypes.func,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  isRtl: PropTypes.bool,
};

NotFoundCard.defaultProps = {
  mode: "simple",
  subtitle: "",
  radialColor: "blue",
  descriptionLine1: "",
  descriptionLine2: "",
  primaryLabel: "",
  secondaryLabel: "",
  onPrimaryClick: undefined,
  onSecondaryClick: undefined,
  imageSrc: "",
  imageAlt: "",
  isRtl: false,
};
