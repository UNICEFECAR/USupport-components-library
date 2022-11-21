import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import classNames from "classnames";
import { Icon } from "../../icons/Icon";
import { ButtonWithIcon } from "../../buttons/ButtonWithIcon";

import { useWindowDimensions } from "../../../utils/useWindowDimensions";
import { specialistPlaceholder } from "../../../assets";

import "./provider-availability.scss";

/**
 * ProviderAvailability
 *
 * Provider availability card
 *
 * @return {jsx}
 */
export const ProviderAvailability = ({
  availableText,
  unavailableText,
  setAvailableText,
  setUnavailableText,
  viewProfileText,
  proposeConsultationText,
  cancelAppointmentText,
  joinConsultationText,
  handleSetUnavailable,
  handleSetAvailable,
  handleProposeConsultation,
  handleCancelConsultation,
  handleViewProfile,
  handleJoinConsultation,
  slot,
  classes,
  isAvailable,
}) => {
  // TOOO: Calculate this from the slot
  const isLive = false;
  const consultation = false;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();

  const handleAvailabilityChange = () => {
    if (consultation) handleCancelConsultation();
    else {
      isAvailable ? handleSetUnavailable() : handleSetAvailable();
    }
  };
  const handleMenuSecondClick = () => {
    if (consultation) {
      handleViewProfile();
    } else {
      handleProposeConsultation();
    }
  };

  const menuFirstText = consultation
    ? cancelAppointmentText
    : isAvailable
    ? setUnavailableText
    : setAvailableText;
  const menuSecondText = consultation
    ? viewProfileText
    : proposeConsultationText;

  const menuFirstIcon = consultation
    ? "close-x"
    : isAvailable
    ? "circle-close"
    : "circle-actions-success";
  const menuSecondIcon = consultation ? "person" : "share-front";

  return (
    <div
      className={[
        "provider-availability",
        isMenuOpen ? "provider-availability--active" : "",
        isAvailable
          ? "provider-availability--available"
          : "provider-availability--unavailable",
        consultation ? "provider-availability--booked" : "",
        isLive ? "provider-availability--live" : "",
        classNames(classes),
      ].join(" ")}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {consultation && (
        <>
          <img
            className="provider-availability__image"
            src={specialistPlaceholder}
          />
          {width >= 1150 && (
            <p className="small-text provider-availability__name">
              {"John Doe"}
            </p>
          )}
        </>
      )}

      {width >= 1150 && (
        <>
          {!isLive && !consultation && (
            <p className="small-text provider-availability__available-text">
              {isAvailable ? availableText : unavailableText}
            </p>
          )}
          <div className="provider-availability__icon-container">
            <Icon name="three-dots-vertical" color="#20809E" />
          </div>
        </>
      )}

      {isMenuOpen ? (
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
          <div className="provider-availability__controls">
            <div
              className="provider-availability__controls__single"
              onClick={handleAvailabilityChange}
            >
              <Icon size="md" name={menuFirstIcon} color="#373737" />
              <p className="small-text">{menuFirstText}</p>
            </div>

            <div
              className="provider-availability__controls__single"
              onClick={handleMenuSecondClick}
            >
              <Icon size="md" name={menuSecondIcon} color="#373737" />
              <p className="small-text">{menuSecondText}</p>
            </div>
            {isLive ? (
              <ButtonWithIcon
                iconName="consultation"
                label={joinConsultationText}
                onClick={handleJoinConsultation}
                size="md"
                iconSize="md"
                iconColor="#FFFFFF"
                type="primary"
                color="purple"
                classes="provider-availability__controls__join-button"
              />
            ) : null}
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

ProviderAvailability.propTypes = {
  /**
   * If the provider is available or not
   */
  isAvailable: PropTypes.bool,

  /**
   * Text(translated in the used language) to display when the provider is available
   */
  availableText: PropTypes.string,

  /**
   * Text(translated in the used language) to display when the provider is unavailable
   */
  unavailableText: PropTypes.string,

  /**
   * Additional classes to be added to the provier availability component
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ProviderAvailability.defaultProps = {
  isAvailable: false,
  availableText: "You are available",
  unavailableText: "You are unavailable",
  setAvailableText: "Set as available",
  setUnavailableText: "Set as unavailable",
  viewProfileText: "View personal profile",
  proposeConsultationText: "Propose consultation",
  cancelAppointmentText: "Cancel appointment",
  joinConsultationText: "Join consultation",
};
