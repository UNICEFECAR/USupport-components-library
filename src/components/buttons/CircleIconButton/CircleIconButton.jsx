import React from "react";
import PropTypes from "prop-types";

import "./circle-icon-button.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { ButtonWithIcon } from "../ButtonWithIcon";

/**
 * CircleIconButton
 *
 * Circlurar button with icon
 *
 * @return {jsx}
 */
export const CircleIconButton = ({ iconName, label, classes, ...props }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  return (
    <ButtonWithIcon
      color="purple"
      iconName={iconName}
      iconSize="lg"
      iconColor="#fff"
      onlyIcon={isMobile || !label}
      label={isMobile || !label ? "" : label}
      size="md"
      classes={classes}
      web
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
   * Additional classes to add to the component
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CircleIconButton.defaultProps = {
  iconName: "phone-emergency",
};
