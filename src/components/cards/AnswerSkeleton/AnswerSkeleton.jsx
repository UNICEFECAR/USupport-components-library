import React from "react";
import { Box } from "../../boxes";
import { Icon } from "../../icons";

import "./answer-skeleton.scss";

/**
 * AnswerSkeleton
 *
 * Skeleton placeholder for Answer card.
 *
 * @returns {jsx}
 */
export const AnswerSkeleton = () => {
  return (
    <Box liquidGlass classes="answer-skeleton">
      <div className="answer-skeleton__date-row">
        <Icon name="calendar" size="sm" />
        <div className="answer-skeleton__line answer-skeleton__line--date shimmer" />
      </div>

      <div className="answer-skeleton__labels">
        <div className="answer-skeleton__label shimmer" />
        <div className="answer-skeleton__label shimmer" />
      </div>

      <div className="answer-skeleton__line answer-skeleton__line--title shimmer" />
      <div className="answer-skeleton__line answer-skeleton__line--title-secondary shimmer" />

      <div className="answer-skeleton__description">
        <div className="answer-skeleton__line answer-skeleton__line--description shimmer" />
        <div className="answer-skeleton__line answer-skeleton__line--description shimmer" />
      </div>

      <div className="answer-skeleton__button shimmer" />

      <div className="answer-skeleton__author-row">
        <div className="answer-skeleton__line answer-skeleton__line--author shimmer" />
        <div className="answer-skeleton__avatar shimmer" />
        <div className="answer-skeleton__line answer-skeleton__line--author-name shimmer" />
      </div>

      <div className="answer-skeleton__schedule-row">
        <div className="answer-skeleton__schedule-left">
          <Icon name="calendar" size="sm" />
          <div className="answer-skeleton__line answer-skeleton__line--schedule shimmer" />
        </div>
        <div className="answer-skeleton__likes shimmer" />
      </div>
    </Box>
  );
};
