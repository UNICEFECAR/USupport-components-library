import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes";
import { Icon } from "../../icons";

import "./statistic.scss";

/**
 * Statistic
 *
 * Statistic card component
 *
 * @return {jsx}
 */
export const Statistic = ({
  textBold,
  text,
  iconName,
  orientation,
  landscapeSize,
  hasIcon = true,
  tooltip,
}) => {
  return (
    <Box
      classes={[
        "statistic-card",
        landscapeSize === "sm" ? "statistic-card--sm" : "",
        orientation === "portrait" ? "statistic-card--portrait" : "",
      ].join(" ")}
    >
      <div className="statistic-card__icon-container">
        {hasIcon && (
          <Icon
            name={iconName}
            color="#9749FA"
            size="lg"
            classes="statistic-card__icon"
          />
        )}
      </div>
      {orientation === "portrait" ? (
        <h3
          className={[
            "statistic-card__text",
            !hasIcon && "statistic-card__text--no-icon",
          ].join(" ")}
        >
          {textBold}
          <br /> <span>{text}</span>
        </h3>
      ) : (
        <div>
          <h4
            className={[
              "statistic-card__text",
              !hasIcon && "statistic-card__text--no-icon",
            ].join(" ")}
          >
            {textBold}
          </h4>
        </div>
      )}
      {tooltip && (
        <div className="statistic-card__info-container">
          <Icon name="info" size="sm" />
          <p className="small-text">{tooltip}</p>
        </div>
      )}
    </Box>
  );
};

Statistic.propTypes = {
  /**
   * Text to be displayed in bold
   */
  textBold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Text to display
   */
  text: PropTypes.string,

  /**
   * Icon name
   */
  iconName: PropTypes.string,

  /**
   * Orientation
   * @values portrait, langscape
   * @default landscape
   */
  orientation: PropTypes.oneOf(["portrait", "landscape"]),

  /**
   * Landscape size
   * @values sm, lg
   * @default lg
   */
  landscapeSize: PropTypes.oneOf(["sm", "lg"]),
  /**
   * Whether to display the leading icon
   */
  hasIcon: PropTypes.bool,
  /**
   * Optional tooltip content
   */
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Statistic.defaultProps = {
  iconName: "therapy",
  orientation: "landscape",
  landscapeSize: "lg",
};
