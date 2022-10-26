import React from "react";
import PropTypes from "prop-types";

import "./button-only-icon.scss";
import { Button } from "../Button/Button";
import { Icon } from "../../icons/Icon";

/**
 * ButtonOnlyIcon
 *
 * Button only with icon
 *
 * @return {jsx}
 */
export const ButtonOnlyIcon = ({ iconName, iconColor, iconSize, ...rest }) => {
  return (
    <Button
      classes="btn--transparent"
      size="xs"
      onlyIcon
      type="ghost"
      {...rest}
    >
      <Icon color={iconColor} name={iconName} size={iconSize} />
    </Button>
  );
};

ButtonOnlyIcon.propTypes = {
  /**
   * Icon name
   * @default "arrow-chevron-back"
   */
  iconName: PropTypes.string.isRequired,

  /**
   * Icon color
   * @default "#20809E"
   * */
  iconColor: PropTypes.string,

  /**
   * Size of the icon
   * @default "md"
   * */
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),
};

ButtonOnlyIcon.defaultProps = {
  iconName: "arrow-chevron-back",
  iconSize: "md",
  iconColor: "#20809E",
};
