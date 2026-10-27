import React from "react";
import PropTypes from "prop-types";

import { Box } from "../../boxes";
import { Grid, GridItem } from "../../grids";

import "./report-detail-card.scss";

/**
 * ReportDetailCard
 *
 * Detail section card for country-admin report views.
 * Matches CampaignDetails / SponsorDetails field layout:
 * section title + "Label: value" grid.
 *
 * @return {jsx}
 */
export const ReportDetailCard = ({
  title,
  fields = [],
  note,
  children,
  columns = 2,
  classes,
}) => {
  const fieldSpan = {
    md: columns === 1 ? 8 : 4,
    lg: columns === 1 ? 12 : columns === 3 ? 4 : 6,
  };

  return (
    <Box
      classes={[
        "report-detail-card",
        classes,
      ]
        .filter(Boolean)
        .join(" ")}
      boxShadow={2}
      borderSize="sm"
    >
      {title ? <h4 className="report-detail-card__title">{title}</h4> : null}

      {fields.length > 0 ? (
        <Grid classes="report-detail-card__fields">
          {fields.map((field, index) => (
            <GridItem
              key={field.key || field.label || index}
              md={field.md || fieldSpan.md}
              lg={field.lg || fieldSpan.lg}
              classes="report-detail-card__field"
            >
              <p className="text">
                {field.label}:{" "}
                <strong
                  className={
                    field.isIdentifier
                      ? "report-detail-card__identifier"
                      : undefined
                  }
                >
                  {field.value ?? "—"}
                </strong>
              </p>
            </GridItem>
          ))}
        </Grid>
      ) : null}

      {children ? (
        <div className="report-detail-card__body">{children}</div>
      ) : null}

      {note ? <p className="small-text report-detail-card__note">{note}</p> : null}
    </Box>
  );
};

ReportDetailCard.propTypes = {
  /**
   * Section title
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Field rows rendered as "Label: value"
   */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node,
      ]),
      isIdentifier: PropTypes.bool,
      md: PropTypes.number,
      lg: PropTypes.number,
    })
  ),

  /**
   * Optional helper note under the fields
   */
  note: PropTypes.string,

  /**
   * Optional custom content under the fields
   */
  children: PropTypes.node,

  /**
   * Number of field columns on large screens (1, 2, or 3)
   */
  columns: PropTypes.oneOf([1, 2, 3]),

  /**
   * Additional classes
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
