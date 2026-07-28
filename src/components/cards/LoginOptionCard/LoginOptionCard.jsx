import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../../icons";
import { Toggle } from "../../inputs";

import "./login-option-card.scss";

/**
 * Card row with icon, title, description, and toggle.
 */
export const LoginOptionCard = ({
  iconName,
  title,
  description,
  isToggled,
  onToggle,
  showInfoIcon = false,
  onInfoPress,
}) => {
  return (
    <div className="login-option-card">
      <div className="login-option-card__icon-circle">
        <Icon name={iconName} size="md" color="#9749fa" />
      </div>

      <div className="login-option-card__content">
        <div className="login-option-card__title-row">
          <p className="login-option-card__title">{title}</p>
          {showInfoIcon ? (
            <button
              type="button"
              className="login-option-card__info-button"
              onClick={onInfoPress}
              aria-label="More information"
            >
              <Icon name="info" size="sm" color="#9749fa" />
            </button>
          ) : null}
        </div>
        <p className="login-option-card__description">{description}</p>
      </div>

      <div className="login-option-card__toggle">
        <Toggle
          isToggled={isToggled}
          setParentState={onToggle}
          shouldChangeState={false}
          size="lg"
        />
      </div>
    </div>
  );
};

LoginOptionCard.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isToggled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  showInfoIcon: PropTypes.bool,
  onInfoPress: PropTypes.func,
};
