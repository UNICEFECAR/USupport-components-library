import React, { useContext } from "react";
import classNames from "classnames";

import { Loading } from "../../loaders/Loading/Loading";
import { Icon } from "../../icons/Icon";

import { ThemeContext } from "../../../utils";

import "./new-button.scss";

/**
 * NewButton
 *
 * NewButton component
 *
 * @return {jsx}
 */
export const NewButton = ({
  children,
  label,
  type = "gradient",
  loading,
  disabled,
  classes,
  size = "md",
  onClick,
  iconName,
  iconColor,
  isFullWidth = false,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={[
        "button",
        `button--${type}`,
        `button--${size}`,
        isFullWidth ? "button--full-width" : "",
        classNames(classes),
      ].join(" ")}
      disabled={disabled || loading}
      onClick={disabled || loading ? () => {} : onClick}
      {...props}
    >
      <div className="button__content-container">
        {iconName && (
          <Icon
            name={iconName}
            size="sm"
            color={iconColor || "#ffffff"}
            classes="button__content-container__icon"
          />
        )}
        {children}
        {loading ? <Loading size="sm" padding="0" margin="0" /> : label}
      </div>
    </button>
  );
};
