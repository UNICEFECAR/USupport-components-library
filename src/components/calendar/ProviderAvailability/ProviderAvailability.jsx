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
  hasNormalSlot,
  consultation,
  dayIndex,
  campaignData,
  validCampaigns,
  enrolledCampaignsForSlot,
  organizations,
  organizationForSlot,
  t,
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");
  const isLive = consultation
    ? checkIsFiveMinutesBefore(new Date(consultation.time).getTime())
    : false;
  const isPast = consultation
    ? new Date(consultation.time).getTime() < new Date().getTime()
    : false;

  const price = consultation?.couponPrice || consultation?.price;
  const isBookedWithCoupon = consultation?.campaignId;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();

  const handleAvailabilityChange = ({
    campaignId = null,
    isCampaignAvailableInSlot = null, // If the slot is already marked as available
    organizationId = null,
  }) => {
    if (consultation) {
      handleCancelConsultation(consultation);
    } else if (campaignId) {
      if (isCampaignAvailableInSlot) {
        handleSetUnavailable({ campaignId });
      } else {
        handleSetAvailable({ campaignId });
      }
    } else if (organizationId) {
      if (
        organizationForSlot &&
        organizationForSlot.organizationId === organizationId
      ) {
        handleSetUnavailable({ organizationId });
      } else {
        handleSetAvailable({ organizationId });
      }
    } else if (
      ((validCampaigns?.length > 0 && isAvailable === "campaign") ||
        (organizationForSlot && isAvailable === "organization")) &&
      hasNormalSlot
    ) {
      handleSetUnavailable({
        campaignId: validCampaigns?.map((x) => x.campaignId) || [],
        organizationId: organizationForSlot?.organizationId || null,
      });
    } else {
      hasNormalSlot
        ? handleSetUnavailable({ campaignId: null })
        : handleSetAvailable({ campaignId: null });
    }
  };

  const handleMenuSecondClick = () => {
    if (consultation) {
      handleViewProfile(consultation, isPast);
    } else {
      handleProposeConsultation();
    }
  };

  const menuFirstText = consultation
    ? t("cancel")
    : !isAvailable || !hasNormalSlot
    ? t("set_available")
    : t("set_not_available");
  const menuSecondText = consultation
    ? isPast
      ? t("consultation_details")
      : t("view_profile")
    : t("suggest_consultation");

  const menuFirstIcon = consultation
    ? "close-x"
    : !isAvailable || !hasNormalSlot
    ? "circle-actions-success"
    : "circle-close";
  const menuSecondIcon = consultation ? "person" : "share-front";

  const numberOfCampaignsSetAsAvailable =
    !consultation &&
    validCampaigns?.filter((campaign) => {
      return enrolledCampaignsForSlot?.some(
        (x) => x.campaignId === campaign.campaignId
      );
    })?.length;

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
        isBookedWithCoupon ? "provider-availability--coupon" : "",
        isLive ? "provider-availability--live" : "",
        classNames(classes),
      ].join(" ")}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isBookedWithCoupon && (
        <img
          src={AMAZON_S3_BUCKET + "/" + consultation?.sponsorImage}
          className="provider-availability__sponsor-badge"
        />
      )}
      {consultation?.organizationId && (
        <img
          src={AMAZON_S3_BUCKET + "/" + "organization"}
          className="provider-availability__sponsor-badge"
        />
      )}
      {(isAvailable === "campaign" || isAvailable === "organization") &&
        !consultation && (
          <div className="provider-availability__badge-container">
            {numberOfCampaignsSetAsAvailable > 0 && (
              <img
                src={
                  AMAZON_S3_BUCKET +
                  "/" +
                  (numberOfCampaignsSetAsAvailable > 1
                    ? "default-sponsor"
                    : campaignData?.sponsorImage)
                }
                className="provider-availability__sponsor-badge"
              />
            )}
            {organizationForSlot && (
              <img
                src={AMAZON_S3_BUCKET + "/" + "default-sponsor"}
                className="provider-availability__sponsor-badge"
              />
            )}
          </div>
        )}
      {consultation && (
        <div className="provider-availability__content">
          <div
            className={`provider-availability__content__price ${
              price > 0
                ? "provider-availability__content__price--paid"
                : "provider-availability__content__price--free"
            } ${
              isBookedWithCoupon
                ? "provider-availability__content__price--coupon"
                : ""
            }`}
          >
            <p className="provider-availability__content__price__text small-text">
              {price > 0 ? `${price}${currencySymbol}` : t("free")}
            </p>
          </div>

          {width >= 768 && (
            <p className="small-text provider-availability__name">
              {consultation.clientName}
            </p>
          )}
        </div>
      )}

      <>
        {!isLive && !consultation && !campaignData && !organizationForSlot && (
          <p className="small-text provider-availability__available-text">
            {isAvailable ? t("available") : t("not_available")}
          </p>
        )}
        {!isLive &&
          !consultation &&
          (campaignData || organizationForSlot) &&
          width >= 768 && (
            <p className="small-text provider-availability__content__campaign-name">
              {campaignData &&
                (numberOfCampaignsSetAsAvailable > 1
                  ? t("more_campaigns", {
                      amount: numberOfCampaignsSetAsAvailable,
                    })
                  : campaignData.campaignName)}
              <br />
              <span style={{ color: "#20809e" }}>
                {organizationForSlot && organizationForSlot.name}
              </span>
            </p>
          )}
        {width >= 1200 && (
          <div className="provider-availability__icon-container">
            <Icon name="three-dots-vertical" color="#20809E" />
          </div>
        )}
      </>

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

            {!consultation && validCampaigns?.length > 0 && (
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
                      onClick={() =>
                        handleAvailabilityChange({
                          campaignId: campaign.campaignId,
                          isCampaignAvailableInSlot,
                        })
                      }
                    >
                      <img
                        src={AMAZON_S3_BUCKET + "/" + campaign.sponsorImage}
                        className="provider-availability__controls__single__image"
                      />
                      <p className="small-text">{campaign.campaignName}</p>
                      <Icon
                        classes="provider-availability__controls__single--campaign__icon"
                        name={
                          isCampaignAvailableInSlot
                            ? "circle-close"
                            : "circle-actions-success"
                        }
                        color="#373737"
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {!consultation && organizations?.length > 0 && (
              <div className="provider-availability__controls__organization">
                {organizations.map((organization) => {
                  const isOrganizationAvailableInSlot = organizationForSlot
                    ? organizationForSlot.organizationId ===
                      organization.organizationId
                    : false;
                  return (
                    <div
                      className="provider-availability__controls__single provider-availability__controls__single--organization"
                      key={organization.organizationId}
                      onClick={() =>
                        handleAvailabilityChange({
                          organizationId: organization.organizationId,
                        })
                      }
                    >
                      <p className="small-text">{organization.name}</p>
                      <Icon
                        classes="provider-availability__controls__single--organization__icon"
                        name={
                          isOrganizationAvailableInSlot
                            ? "circle-close"
                            : "circle-actions-success"
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
  isAvailable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

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
