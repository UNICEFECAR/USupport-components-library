import React, { useContext } from "react";
import PropTypes from "prop-types";

import useWindowDimensions from "../../../utils/useWindowDimensions";
import { ThemeContext } from "../../../utils/theme-context";
import { ButtonWithIcon } from "../ButtonWithIcon";

import "./circle-icon-button.scss";

/**
 * CircleIconButton
 *
 * Circlurar button with icon
 *
 * @return {jsx}
 */
export const CircleIconButton = ({
  iconName,
  label,
  circleSize,
  iconSize,
  classes,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const { theme } = useContext(ThemeContext);

  const trimmedLabel = typeof label === "string" ? label.trim() : "";
  const ariaLabel = props["aria-label"] || trimmedLabel || iconName;

  return (
    <ButtonWithIcon
      color="red"
      iconName={iconName}
      iconSize={iconSize}
      iconColor={theme === "highContrast" ? "#ed5657" : "#fff"}
      onlyIcon={isMobile || !label}
      label={isMobile || !label ? "" : label}
      size="md"
      circleSize={circleSize}
      classes={classes}
      web
      aria-label={ariaLabel}
      {...props}
    />
  );
};

CircleIconButton.propTypes = {
  /**
   * Name of the icon
   */
  iconName: PropTypes.string.isRequired,
  /**
   * Text to render inside the button
   */
  label: PropTypes.string,

  /**
   * Size of the circle
   */
  circleSize: PropTypes.oneOf(["sm", "md"]),

  /**
   * Size of the icon
   */
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Additional classes to add to the component
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CircleIconButton.defaultProps = {
  iconName: "phone-emergency",
  circleSize: "sm",
  iconSize: "lg",
};
