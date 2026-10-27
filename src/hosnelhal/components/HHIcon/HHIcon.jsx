import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ICONS = {
  play: <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />,
  volume: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" {...STROKE} />
    </>
  ),
  muted: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
      <path d="m16 9.5 5 5m0-5-5 5" {...STROKE} />
    </>
  ),
  fullscreen: <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" {...STROKE} />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" {...STROKE} />
      <path d="m20 20-4-4" {...STROKE} />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" {...STROKE} strokeWidth={2.5} />,
  chevronDown: <path d="m6 9.5 6 6 6-6" {...STROKE} strokeWidth={2.5} />,
};

/**
 * HHIcon
 *
 * Decorative icon; give the surrounding control an accessible name
 *
 * @return {jsx}
 */
export const HHIcon = ({ name, size = 20, className }) => {
  return (
    <svg
      className={classNames("hh-icon", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
};

HHIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};
