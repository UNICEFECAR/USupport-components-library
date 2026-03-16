import React from "react";

import { Icon } from "../../icons";
import { Box } from "../Box";
import { NewButton } from "../../buttons";
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
  handleViewAssessment,
  t,
}) => {
  return (
    <Box classes="baseline-assesment-box" liquidGlass>
      <div className="baseline-assessment-dashboard__box__content__part__inner-box__icon">
        <Icon name="document" size="lg" color="#6a4ffb" />
      </div>
      <div className="baseline-assesment-box__status">
        <StatusBadge
          label={t(status)}
          status={status === "completed" ? "active" : "in-progress"}
        />
      </div>
      <div className="baseline-assesment-box__content">
        <ProgressBar
          progress={progress}
          showPercentage
          classes="baseline-assesment-box__progress"
        />
        <p className="baseline-assesment-box__meta">
          {t("started_at", { date: getDateView(startedAt) })} ·{" "}
          {currentPosition}/27
        </p>
        <NewButton onClick={handleViewAssessment} size="lg" isFullWidth>
          {status === "in_progress" ? t("continue") : t("view")}
        </NewButton>
      </div>
    </Box>
  );
};
