import React from "react";
import PropTypes from "prop-types";
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon";
import useWindowDimensions from "../../../utils/useWindowDimensions";

/**
 * EmergencyButton
 *
 * Button with icon component
 *
 * @return {jsx}
 */
export const EmergencyButton = ({ classes, ...props }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  return (
    <ButtonWithIcon
      color="purple"
      iconName="phone-emergency"
      iconSize="lg"
      iconColor="#fff"
      onlyIcon={isMobile}
      label={isMobile ? "" : "SOS Center"}
      size="md"
      classes={classes}
      web
      {...props}
    />
  );
};

EmergencyButton.propTypes = {
  /**
   * Additional classes to add to the component
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

EmergencyButton.defaultProps = {
  classes: "",
};
