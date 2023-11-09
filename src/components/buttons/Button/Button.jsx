import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Loading } from "../../loaders/Loading/Loading";
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
  isSubmit,
  loading,
  ...props
}) => {
  return (
    <button
      className={[
        `btn btn--${size} btn--${color} btn--${type}`,
        web ? "btn--web" : "",
        classNames(classes),
      ].join(" ")}
      onClick={disabled || loading ? () => {} : onClick}
      disabled={disabled || loading}
      type={isSubmit ? "submit" : "button"}
      {...props}
    >
      <div className={"btn__content-container"}>
        {children}
        {loading ? <Loading size="sm" padding="0" margin="0" /> : label}
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
  type: PropTypes.oneOf(["primary", "secondary", "ghost", "text", "link"]),

  /**
   * Size of the button, the default is md
   * */
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),

  /**
   * Predifned colors for the button, the default is green
   **/
  color: PropTypes.oneOf(["green", "purple", "red"]),

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
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Button.defaultProps = {
  color: "green",
  type: "primary",
  disabled: false,
  size: "md",
  onClick: undefined,
  web: false,
  classes: "",
};
