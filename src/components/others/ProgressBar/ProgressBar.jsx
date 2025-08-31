import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./progress-bar.scss";

/**
 * ProgressBar
 *
 * Progress bar component to show completion progress
 *
 * @return {jsx}
 */
export const ProgressBar = ({
  progress = 0,
  classes,
  showPercentage = false,
  height = "md",
  animated = true,
}) => {
  const progressPercentage = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={[
        "progress-bar",
        `progress-bar--${height}`,
        classNames(classes),
      ].join(" ")}
    >
      <div className="progress-bar__track">
        <div
          className={[
            "progress-bar__fill",
            animated && "progress-bar__fill--animated",
          ].join(" ")}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {showPercentage && (
        <span className="progress-bar__percentage">
          {Math.round(progressPercentage)}%
        </span>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  /**
   * Progress value from 0 to 100
   */
  progress: PropTypes.number,

  /**
   * Additional classes
   */
  classes: PropTypes.string,

  /**
   * Whether to show percentage text
   */
  showPercentage: PropTypes.bool,

  /**
   * Height of the progress bar
   */
  height: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Whether to animate the progress
   */
  animated: PropTypes.bool,
};
