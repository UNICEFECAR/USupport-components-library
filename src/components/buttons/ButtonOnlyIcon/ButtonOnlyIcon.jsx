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
export const ButtonOnlyIcon = ({ iconName, iconColor, ...rest }) => {
  return (
    <Button
      classes="btn--transparent"
      size="xs"
      onlyIcon
      type="ghost"
      {...rest}
    >
      <Icon color={iconColor} name={iconName} />
    </Button>
  );
};

ButtonOnlyIcon.propTypes = {
  /**
   * Icon name
   */
  iconName: PropTypes.string.isRequired,

  /**
   * Icon color
   * */
  iconColor: PropTypes.string,
};

ButtonOnlyIcon.defaultProps = {
  iconName: "arrow-chevron-back",
  iconColor: "#20809E",
};
