import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";

import "./button.scss";

/**
 * Button
 *
 * All buttons used in the app
 *
 * @return {jsx}
 */
export const Button = ({
  /* Add props here */
  text,
  iconName,
  size,
  color,
  secondary,
  ghost,
  emergency,
  disabled,
  onClick,
  ...rest
}) => {
  const mode = secondary
    ? "btn--secondary"
    : ghost
    ? "btn--ghost"
    : emergency
    ? "btn--emergency"
    : "btn--primary";

  return (
    <button
      className={[
        `btn btn--${size} btn--${color}`,
        mode,
        disabled && "btn--disabled",
      ].join(" ")}
      onClick={onClick}
      {...rest}
    >
      {emergency ? (
        <Icon name="phone-emergency" color={"#ffffff"} size={"large"} />
      ) : iconName ? (
        <Icon name={iconName} color={"#ffffff"} size={"medium"} />
      ) : null}
      {text ? <span>{text}</span> : null}
    </button>
  );
};

Button.propTypes = {
  /**
   * Text to render in the Button component
   * */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Icon to render in the Button component
   **/
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),

  /**
   * Size of the button, the default is medium
   * */
  size: PropTypes.oneOf(["small", "medium", "large", "xsmall"]),

  /**
   * Predifned colors for the button, the default is green
   **/
  color: PropTypes.oneOf(["green", "purple"]),

  /**
   * Is the button a secondary button?
   * */
  secondary: PropTypes.bool,

  /**
   * Is the button ghost mode?
   * */
  ghost: PropTypes.bool,

  /**
   * Is the button emergency bytton?
   * */
  emergency: PropTypes.bool,

  /**
   * Is the button disabled?
   */
  disabled: PropTypes.bool,

  /**
   * OnClick function to be called when the button is clicked
   * */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: null,
  secondary: false,
  emergency: false,
  ghost: false,
  disabled: false,
  size: "medium",
  onClick: undefined,
};
