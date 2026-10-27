import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./hh-segmented-control.scss";

/**
 * HHSegmentedControl
 *
 * A few mutually exclusive options shown side by side, e.g. "Video" /
 * "Listen only"
 *
 * @return {jsx}
 */
export const HHSegmentedControl = ({ label, options, value, onChange, className }) => {
  return (
    <div className={classNames("hh-segmented-control", className)} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={classNames("hh-segmented-control__option", {
            "hh-segmented-control__option--selected": option.value === value,
          })}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

HHSegmentedControl.propTypes = {
  /** Accessible name of the group */
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.node.isRequired })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
