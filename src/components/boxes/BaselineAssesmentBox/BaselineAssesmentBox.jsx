import React from "react";
import PropTypes from "prop-types";

import { Box } from "../Box";
import { Button } from "../../buttons";
import { ProgressBar } from "../../others/ProgressBar";
import { getDateView } from "../../../utils";
import { StatusBadge } from "../../cards/StatusBadge";

import "./baseline-assesment-box.scss";

/**
 * BaselineAssesmentBox
 *
 * Baseline . assesment box
 *
 * @return {jsx}
 */
export const BaselineAssesmentBox = ({
  progress,
  status,
  startedAt,
  currentPosition,
  completionPercentage,
  handleViewSession,
  t,
}) => {
  return (
    <Box classes="baseline-assesment-box">
      <StatusBadge
        label={t(status)}
        status={status === "completed" ? "active" : "in-progress"}
      />
      <ProgressBar progress={progress} showPercentage />
      <p>{t("started_at", { date: getDateView(startedAt) })}</p>
      <p>{currentPosition}/27</p>
      <Button onClick={handleViewSession} variant="secondary">
        {status === "in_progress" ? t("continue") : t("view")}
      </Button>
    </Box>
  );
};

BaselineAssesmentBox.propTypes = {
  // Add propTypes here
};

BaselineAssesmentBox.defaultProps = {
  // Add defaultProps here
};
