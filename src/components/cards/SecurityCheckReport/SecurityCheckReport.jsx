import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes";
import { Grid, GridItem } from "../../grids";
import { Icon } from "../../icons";

import {
  getDateView,
  useWindowDimensions,
  getTimeAsString,
} from "../../../utils";

import "./security-check-report.scss";

/**
 * SecurityCheckReport
 *
 * Security check report component
 *
 * @return {jsx}
 */
export const SecurityCheckReport = ({ securityCheck, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();
  const {
    clientName,
    providerName,
    numberOfIssues,
    consultationTime,
    answers,
  } = securityCheck;
  return (
    <Box
      classes={`security-check-report ${
        isOpen ? "security-check-report--open" : ""
      }`}
      boxShadow={2}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Grid classes="security-check-report__grid">
        <GridItem
          md={4}
          lg={2}
          classes="security-check-report__grid__client-name"
        >
          <div>
            <p>
              <strong>{t("client")}: </strong>
              {clientName}
            </p>
          </div>
          {width < 768 && (
            <Icon
              name="arrow-chevron-down"
              classes={`security-check-report__arrow`}
              color="#20809E"
            />
          )}
        </GridItem>
        <GridItem
          md={4}
          lg={3}
          classes="security-check-report__grid__provider-name"
        >
          <p>
            <strong>{t("provider")}: </strong>
            {providerName}
          </p>
          {width >= 768 && width < 1366 && (
            <Icon
              name="arrow-chevron-down"
              classes={`security-check-report__arrow`}
              color="#20809E"
            />
          )}
        </GridItem>

        <GridItem md={4} lg={4} classes="security-check-report__provider-name">
          <p>
            <strong>{t("consultation_date")}: </strong>
            {getDateView(consultationTime)} -{" "}
            {getTimeAsString(consultationTime)}
          </p>
        </GridItem>

        <GridItem md={4} lg={2}>
          <div
            className={`security-check-report__grid__issues-container ${
              numberOfIssues === 4
                ? "security-check-report__grid__issues-container--danger"
                : ""
            }`}
          >
            <p>
              {numberOfIssues} {numberOfIssues === 1 ? t("issue") : t("issues")}
            </p>
          </div>
        </GridItem>

        {width >= 1366 && (
          <GridItem md={1} lg={1}>
            <Icon
              name="arrow-chevron-down"
              classes={`security-check-report__arrow`}
              color="#20809E"
            />
          </GridItem>
        )}
      </Grid>
      {isOpen && (
        <Grid classes="security-check-report__answers-grid">
          <GridItem
            md={8}
            lg={12}
            classes="security-check-report__answers-grid__heading"
          >
            <h4>{t("content_heading")}</h4>
          </GridItem>

          {Object.keys(answers).map((key, index) => {
            if (key === "moreDetails" && !answers[key]) return null;
            return (
              <GridItem
                classes="security-check-report__answers-grid__item"
                key={index}
              >
                <p className="text">{t(`question_${index + 1}`)}</p>
                <p
                  className={`security-check-report__answers-grid__item__answer ${
                    answers[key] === true || key === "moreDetails"
                      ? "security-check-report__answers-grid__item__answer--danger"
                      : ""
                  }`}
                >
                  <strong>
                    {key === "moreDetails"
                      ? answers[key]
                      : answers[key] === true
                      ? t("yes")
                      : t("no")}
                  </strong>
                </p>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

SecurityCheckReport.propTypes = {
  // Add propTypes here
};

SecurityCheckReport.defaultProps = {
  // Add defaultProps here
};
