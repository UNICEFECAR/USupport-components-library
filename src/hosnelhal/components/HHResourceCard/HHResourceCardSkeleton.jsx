import React from "react";

import { HHSkeleton } from "../HHSkeleton/HHSkeleton";

import "./hh-resource-card.scss";

/**
 * HHResourceCardSkeleton
 *
 * Placeholder with the shape of HHResourceCard while the list loads
 *
 * @return {jsx}
 */
export const HHResourceCardSkeleton = () => {
  return (
    <div className="hh-resource-card hh-resource-card--skeleton" aria-hidden="true">
      <HHSkeleton aspectRatio="318 / 224" radius="none" />
      <div className="hh-resource-card__content">
        <div className="hh-resource-card__meta">
          <HHSkeleton width="4.4rem" height="1.2rem" />
          <HHSkeleton width="3.6rem" height="1.2rem" />
        </div>
        <HHSkeleton lines={2} height="1.9rem" className="hh-resource-card__title" />
        <HHSkeleton lines={3} height="1.4rem" className="hh-resource-card__description" />
        <div className="hh-resource-card__actions">
          <HHSkeleton width="6rem" height="1.6rem" />
          <HHSkeleton width="8rem" height="1.6rem" />
        </div>
      </div>
    </div>
  );
};
