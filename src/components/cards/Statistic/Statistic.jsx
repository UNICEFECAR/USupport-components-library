import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";

import "./statistic.scss";
import { Icon } from "../../icons/Icon/Icon";

/**
 * Statistic
 *
 * Statistic card component
 *
 * @return {jsx}
 */
export const Statistic = ({ text, iconName, orientation, landscapeSize }) => {
  console.log("orientation", orientation);
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
          classes="statistic-card__icon-container__icon"
        />
      </div>
      <h4 className="paragraph statistic-card__text">{text}</h4>
    </Box>
  );
};

Statistic.propTypes = {
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
