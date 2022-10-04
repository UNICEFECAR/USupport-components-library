import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button/Button";
import { Icon } from "../../icons/Icon/Icon";

import "./buttonwithicon.scss";

/**
 * ButtonWithIcon
 *
 * Button with icon component
 *
 * @return {jsx}
 */
export const ButtonWithIcon = ({
  iconName,
  iconSize,
  iconColor,
  onlyIcon,
  classes,
  ...rest
}) => {
  return (
    <Button
      classes={["btn--with-icon", onlyIcon ? "btn--only-icon" : "", classes]}
      {...rest}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </Button>
  );
};

ButtonWithIcon.propTypes = {
  /**
   * Name of the icon to render
   **/
  iconName: PropTypes.string.isRequired,

  /**
   * Size of the icon
   */
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Color of the icon
   * */
  iconColor: PropTypes.string,

  /**
   *  Should the button only render the icon?
   **/
  onlyIcon: PropTypes.bool,

  /**
   * Additional classes to add to the button
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ButtonWithIcon.defaultProps = {
  iconSize: "md",
  iconColor: null,
  onlyIcon: false,
  classes: "",
};
