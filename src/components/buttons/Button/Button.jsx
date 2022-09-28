import React from "react";
import PropTypes from "prop-types";

import "./button.scss";

/**
 * Button
 *
 * Base Button component
 *
 * @return {jsx}
 */
export const Button = ({
  children,
  label,
  type,
  size,
  color,
  disabled,
  web,
  classes,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={[
        `btn btn--${size} btn--${color} btn--${type}`,
        disabled && "btn--disabled",
        web && "btn--web",
        ...classes,
      ].join(" ")}
      onClick={onClick}
      {...rest}
    >
      <div className={"btn-content-container"}>
        {children}
        {label}
      </div>
    </button>
  );
};

Button.propTypes = {
  /**
   *Label to render in the Button component
   * */
  label: PropTypes.string,

  /**
   * Button type, the default is primary
   **/
  type: PropTypes.oneOf(["primary", "secondary", "ghost", "label"]),

  /**
   * Size of the button, the default is md
   * */
  size: PropTypes.oneOf(["sm", "md", "lg", "xs"]),

  /**
   * Predifned colors for the button, the default is green
   **/
  color: PropTypes.oneOf(["green", "purple"]),

  /**
   * Is the button disabled?
   */
  disabled: PropTypes.bool,

  /**
   * OnClick function to be called when the button is clicked
   * */
  onClick: PropTypes.func,

  /**
   * Is the button rendered in a web platform?
   **/
  web: PropTypes.bool,

  /**
   * Additional classes to be added to the button
   **/
  classes: PropTypes.arrayOf(PropTypes.string),
};

Button.defaultProps = {
  color: null,
  type: "primary",
  disabled: false,
  size: "md",
  onClick: undefined,
  web: false,
  classes: [],
};
