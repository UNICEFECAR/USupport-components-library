import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./hh-skeleton.scss";

/**
 * HHSkeleton
 *
 * Shimmering placeholder shown while content loads. One block, or several
 * text lines (the last one shorter) with `lines`. Hidden from screen
 * readers - announce the loading state on the surrounding region.
 *
 * @return {jsx}
 */
export const HHSkeleton = ({
  width = "100%",
  height = "1em",
  aspectRatio,
  lines,
  radius = "sm",
  className,
}) => {
  if (lines) {
    return (
      <span className={classNames("hh-skeleton-lines", className)} aria-hidden="true">
        {Array.from({ length: lines }, (_, index) => (
          <span
            key={index}
            className={`hh-skeleton hh-skeleton--${radius}`}
            style={{ width: index === lines - 1 && lines > 1 ? "60%" : width, height }}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      className={classNames("hh-skeleton", `hh-skeleton--${radius}`, className)}
      style={{ width, height: aspectRatio ? "auto" : height, aspectRatio }}
      aria-hidden="true"
    />
  );
};

HHSkeleton.propTypes = {
  /** Any CSS width */
  width: PropTypes.string,
  /** Any CSS height; per line when `lines` is set */
  height: PropTypes.string,
  /** e.g. "16 / 9" - takes precedence over height */
  aspectRatio: PropTypes.string,
  /** Render this many text lines instead of one block */
  lines: PropTypes.number,
  radius: PropTypes.oneOf(["sm", "lg", "none"]),
  className: PropTypes.string,
};

/**
 * HHLoadingRegion
 *
 * Wraps skeletons: screen readers hear `label`, everyone else sees the
 * placeholders
 *
 * @return {jsx}
 */
export const HHLoadingRegion = ({ label, className, children }) => {
  return (
    <div className={className} role="status" aria-busy="true">
      <span className="hh__visually-hidden">{label}</span>
      {children}
    </div>
  );
};

HHLoadingRegion.propTypes = {
  /** e.g. "Loading…" */
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
