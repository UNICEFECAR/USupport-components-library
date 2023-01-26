import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import classNames from "classnames";
import { ButtonWithIcon } from "../../buttons/ButtonWithIcon";
import { Icon } from "../../icons/Icon";
import { useWindowDimensions } from "../../../utils/useWindowDimensions";
import { checkIsFiveMinutesBefore } from "../../../utils";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./provider-availability.scss";

/**
 * ProviderAvailability
 *
 * Provider availability card
 *
 * @return {jsx}
 */
export const ProviderAvailability = ({
  handleSetUnavailable,
  handleSetAvailable,
  handleProposeConsultation,
  handleCancelConsultation,
  handleViewProfile,
  handleJoinConsultation,
  classes,
  isAvailable,
  consultation,
  dayIndex,
  t,
}) => {
  const isLive = consultation
    ? checkIsFiveMinutesBefore(new Date(consultation.time).getTime())
    : false;
  const isPast = consultation
    ? new Date(consultation.time).getTime() < new Date().getTime()
    : false;

  const imageUrl = AMAZON_S3_BUCKET + "/" + (consultation?.image || "default");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();

  const handleAvailabilityChange = () => {
    if (consultation) handleCancelConsultation(consultation);
    else {
      isAvailable ? handleSetUnavailable() : handleSetAvailable();
    }
  };
  const handleMenuSecondClick = () => {
    if (consultation) {
      handleViewProfile(consultation, isPast);
    } else {
      handleProposeConsultation();
    }
  };

  const consultationDetailsText = "Consultation details";

  const menuFirstText = consultation
    ? t("cancel")
    : isAvailable
    ? t("set_not_available")
    : t("set_available");
  const menuSecondText = consultation
    ? isPast
      ? t("consultation_details")
      : t("view_profile")
    : t("suggest_consultation");

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
        <div className="provider-availability__content">
          <div
            className={`provider-availability__content__price ${
              consultation.price > 0
                ? "provider-availability__content__price--paid"
                : "provider-availability__content__price--free"
            }`}
          >
            <p>{consultation.price > 0 ? consultation.price : t("free")}</p>
          </div>
          {width >= 1150 && (
            <p className="small-text provider-availability__name">
              {consultation.clientName}
            </p>
          )}
        </div>
      )}

      {width >= 1150 && (
        <>
          {!isLive && !consultation && (
            <p className="small-text provider-availability__available-text">
              {isAvailable ? t("available") : t("not_available")}
            </p>
          )}
          <div className="provider-availability__icon-container">
            <Icon name="three-dots-vertical" color="#20809E" />
          </div>
        </>
      )}

      {isMenuOpen ? (
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
          <div
            className={`provider-availability__controls ${
              dayIndex >= 5 && width < 1300
                ? "provider-availability__controls__right-0"
                : ""
            } ${
              1 >= dayIndex && width < 1300
                ? "provider-availability__controls__left-0"
                : ""
            }`}
          >
            {consultation && isPast ? null : (
              <div
                className="provider-availability__controls__single"
                onClick={handleAvailabilityChange}
              >
                {consultation?.status === "suggested" ? (
                  <h4 className="paragraph provider-availability__suggested-label">
                    {t("suggested")}
                  </h4>
                ) : (
                  <>
                    <Icon size="md" name={menuFirstIcon} color="#373737" />
                    <p className="small-text">{menuFirstText}</p>
                  </>
                )}
              </div>
            )}

            {consultation ? (
              <div
                className="provider-availability__controls__single"
                onClick={handleMenuSecondClick}
              >
                <Icon size="md" name={menuSecondIcon} color="#373737" />
                <p className="small-text">{menuSecondText}</p>
              </div>
            ) : null}
            {isLive ? (
              <ButtonWithIcon
                iconName="consultation"
                label={t("join_consultation")}
                onClick={() => handleJoinConsultation(consultation)}
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
   * Additional classes to be added to the provier availability component
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ProviderAvailability.defaultProps = {
  isAvailable: false,
};
