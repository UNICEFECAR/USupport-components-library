import React from "react";

import "./basline-assesment-result.scss";

/**
 * BaselineAssesmentResult
 *
 * Baseline assesment result summary
 *
 * @returns {jsx}
 */
export const BaselineAssesmentResult = ({ label, score, classes }) => {
  return (
    <div className={["baseline-assesment-result", classes].join(" ")}>
      <p>
        {label}: {score}
      </p>
    </div>
  );
};
