import React from "react";
import PropTypes from "prop-types";

import "./button-selector.scss";
import classNames from "classnames";
import { Icon } from "../../icons/Icon";

import { specialistPlaceholder } from "../../../assets";

/**
 * ButtonSelector
 *
 * ButtonSelector component
 *
 * @return {jsx}
 */
export const ButtonSelector = ({
  label,
  iconName,
  avatar,
  disabled,
  classes,
}) => {
  return (
    <button
      disabled={disabled}
      className={["btn-selector", classNames(classes)].join(" ")}
    >
      {iconName && (
        <Icon
          classes="btn-selector__left-icon"
          name="share"
          color="#A6B4B8"
          size="sm"
        />
      )}
      {avatar && (
        <img className="btn-selector__avatar" src={specialistPlaceholder} />
      )}
      <p className="btn-selector__label">{label}</p>
      <div className="btn-selector__right-icon-container">
        <Icon name="arrow-chevron-forward" color="#3D527B" size="sm" />
      </div>
    </button>
  );
};

ButtonSelector.propTypes = {
  /**
   * Label to render in the ButtonSelector component
   */
  label: PropTypes.string,

  /**
   * Name of the left icon to render
   */
  iconName: PropTypes.string,

  // TODO: Figure out what proptype an image should be
  /**
   * Avatar image to render
   */
  avatar: PropTypes.string,

  /**
   * Is the button disabled?
   */
  disabled: PropTypes.bool,

  /**
   * Additional classes to be added to the button
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ButtonSelector.defaultProps = {
  iconName: "",
  avatar: "has",
  label: "Share the application",
};
