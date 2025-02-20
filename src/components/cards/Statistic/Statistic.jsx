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
        <Icon
          name={iconName}
          color="#9749FA"
          size="lg"
          classes="statistic-card__icon"
        />
      </div>
      {orientation === "portrait" ? (
        <h3 className="statistic-card__text">
          {textBold}
          <br /> <span>{text}</span>
        </h3>
      ) : (
        <h4 className="statistic-card__text">
          {textBold}
          <br /> <span>{text}</span>
        </h4>
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
};

Statistic.defaultProps = {
  iconName: "therapy",
  orientation: "landscape",
  landscapeSize: "lg",
};
