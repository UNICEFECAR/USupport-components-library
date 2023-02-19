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
  campaignData,
  validCampaigns,
  enrolledCampaignsForSlot,
  t,
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");
  const isLive = consultation
    ? checkIsFiveMinutesBefore(new Date(consultation.time).getTime())
    : false;
  const isPast = consultation
    ? new Date(consultation.time).getTime() < new Date().getTime()
    : false;

  const imageUrl = AMAZON_S3_BUCKET + "/" + (consultation?.image || "default");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();

  const handleAvailabilityChange = ({
    campaignId = null,
    isCampaignAvailableInSlot = null,
  }) => {
    if (consultation) handleCancelConsultation(consultation);
    else if (campaignId) {
      if (isCampaignAvailableInSlot) {
        handleSetUnavailable(campaignId);
      } else {
        handleSetAvailable(campaignId);
      }
    } else {
      isAvailable ? handleSetUnavailable(null) : handleSetAvailable(null);
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
        isAvailable === "campaign"
          ? "provider-availability--campaign"
          : isAvailable
          ? "provider-availability--available"
          : "provider-availability--unavailable",
        consultation ? "provider-availability--booked" : "",
        isLive ? "provider-availability--live" : "",
        classNames(classes),
      ].join(" ")}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isAvailable === "campaign" && (
        <img
          src={AMAZON_S3_BUCKET + "/" + campaignData?.sponsorImage}
          className="provider-availability__sponsor-image"
        />
      )}
      {consultation && (
        <div className="provider-availability__content">
          {width < 768 && (
            <img className="provider-availability__image" src={imageUrl} />
          )}
          {width >= 768 && (
            <div
              className={`provider-availability__content__price ${
                consultation.price > 0
                  ? "provider-availability__content__price--paid"
                  : "provider-availability__content__price--free"
              }`}
            >
              <p className="small-text">
                {consultation.price > 0
                  ? `${consultation.price}${currencySymbol}`
                  : t("free")}
              </p>
            </div>
          )}
          {width >= 1150 && (
            <p className="small-text provider-availability__name">
              {consultation.clientName}
            </p>
          )}
        </div>
      )}

      {width >= 1150 && (
        <>
          {!isLive && !consultation && !campaignData && (
            <p className="small-text provider-availability__available-text">
              {isAvailable ? t("available") : t("not_available")}
            </p>
          )}
          {!isLive && !consultation && campaignData && (
            <p className="small-text">{campaignData.sponsorName}</p>
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

            {validCampaigns?.length > 0 && (
              <div className="provider-availability__controls__campaign">
                {validCampaigns.map((campaign) => {
                  const isCampaignAvailableInSlot =
                    enrolledCampaignsForSlot?.some(
                      (x) => x.campaignId === campaign.campaignId
                    );
                  return (
                    <div
                      className="provider-availability__controls__single provider-availability__controls__single--campaign"
                      key={campaign.campaignId}
                    >
                      <img
                        src={AMAZON_S3_BUCKET + "/" + campaign.sponsorImage}
                        className="provider-availability__controls__single__image"
                      />
                      <p className="small-text">{campaign.campaignName}</p>
                      <Icon
                        name={
                          isCampaignAvailableInSlot
                            ? "circle-close"
                            : "circle-actions-success"
                        }
                        onClick={() =>
                          handleAvailabilityChange({
                            campaignId: campaign.campaignId,
                            isCampaignAvailableInSlot,
                          })
                        }
                        color="#373737"
                      />
                    </div>
                  );
                })}
              </div>
            )}
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
