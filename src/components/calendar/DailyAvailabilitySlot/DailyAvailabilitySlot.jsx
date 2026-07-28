import React, { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import classNames from "classnames";
import { ButtonWithIcon } from "../../buttons/ButtonWithIcon";
import { Icon } from "../../icons/Icon";
import {
  ThemeContext,
  checkIsFiveMinutesBefore,
  useWindowDimensions,
} from "../../../utils";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./daily-availability-slot.scss";

/**
 * DailyAvailabilitySlot
 *
 * Provider availability card
 *
 * @return {jsx}
 */
export const DailyAvailabilitySlot = ({
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
  isDisabled,
  t,
  countryHasNormalSlots,
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");
  const isLive = consultation
    ? checkIsFiveMinutesBefore(new Date(consultation.time).getTime())
    : false;
  const isPast = consultation
    ? new Date(consultation.time).getTime() < new Date().getTime()
    : false;
  const IS_KZ_COUNTRY = localStorage.getItem("country") === "KZ";

  const price = consultation?.couponPrice || consultation?.price;
  const isBookedWithCoupon = consultation?.campaignId;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const { theme } = useContext(ThemeContext);
  const isHighContrast = theme === "highContrast";
  const isDarkTheme = theme === "dark" || isHighContrast;
  const menuIconColor = isHighContrast
    ? "#ffff00"
    : isDarkTheme
      ? "#c1d7e0"
      : "#373737";
  const dotsIconColor = isLive
    ? "#ffffff"
    : isHighContrast
      ? "#ffff00"
      : isDarkTheme
        ? "#c1d7e0"
        : "#20809E";

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
      const campaignIds =
        isAvailable === "campaign"
          ? validCampaigns?.map((x) => x.campaignId)
          : [];
      const organizationIds =
        isAvailable === "organization"
          ? organizations?.map((x) => x.organizationId)
          : null;
      handleSetUnavailable({
        campaignId: campaignIds,
        organizationId: organizationIds,
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
        (x) => x.campaignId === campaign.campaignId,
      );
    })?.length;

  const hasNormalSlotItem =
    !(consultation && isPast) && (countryHasNormalSlots || hasNormalSlot);

  // Check if slot is in the past and has no availability
  const isPastWithNoAvailability = isDisabled && !consultation && !isAvailable;

  return (
    <div
      className={[
        "daily-availability-slot",
        isMenuOpen ? "daily-availability-slot--active" : "",
        isAvailable === "campaign"
          ? "daily-availability-slot--campaign"
          : isAvailable
            ? "daily-availability-slot--available"
            : "daily-availability-slot--unavailable",
        consultation ? "daily-availability-slot--booked" : "",
        isBookedWithCoupon ? "daily-availability-slot--coupon" : "",
        isLive ? "daily-availability-slot--live" : "",
        isDisabled && !isLive ? "daily-availability-slot--disabled" : "",
        isPastWithNoAvailability
          ? "daily-availability-slot--past-no-availability"
          : "",
        classNames(classes),
      ].join(" ")}
      onClick={() => {
        if (isLive && consultation) {
          handleJoinConsultation(consultation);
          return;
        }

        if (!isDisabled) {
          setIsMenuOpen(!isMenuOpen);
        }
      }}
    >
      {(isBookedWithCoupon || consultation?.organizationId) && (
        <div className="daily-availability-slot__badge-container">
          {isBookedWithCoupon && (
            <img
              src={AMAZON_S3_BUCKET + "/" + consultation?.sponsorImage}
              className="daily-availability-slot__sponsor-badge"
            />
          )}
          {consultation?.organizationId && (
            <img
              src={AMAZON_S3_BUCKET + "/" + "organization"}
              className="daily-availability-slot__sponsor-badge"
            />
          )}
        </div>
      )}

      {consultation && IS_KZ_COUNTRY && price === 0 && (
        <span className="small-text daily-availability-slot__booked-label">
          {t("booked")}
        </span>
      )}
      {(isAvailable === "campaign" || isAvailable === "organization") &&
        !consultation && (
          <div className="daily-availability-slot__badge-container">
            {numberOfCampaignsSetAsAvailable > 0 && (
              <img
                src={
                  AMAZON_S3_BUCKET +
                  "/" +
                  (numberOfCampaignsSetAsAvailable > 1
                    ? "default-sponsor"
                    : campaignData?.sponsorImage)
                }
                className="daily-availability-slot__sponsor-badge"
              />
            )}
            {organizationForSlot && (
              <img
                src={AMAZON_S3_BUCKET + "/" + "default-sponsor"}
                className="daily-availability-slot__sponsor-badge"
              />
            )}
          </div>
        )}
      {consultation && (
        <div className="daily-availability-slot__content">
          <div
            className={`daily-availability-slot__content__price ${
              price > 0
                ? "daily-availability-slot__content__price--paid"
                : "daily-availability-slot__content__price--free"
            } ${
              isBookedWithCoupon
                ? "daily-availability-slot__content__price--coupon"
                : ""
            }`}
          >
            <p className="daily-availability-slot__content__price__text small-text">
              {price > 0
                ? `${price}${currencySymbol}`
                : IS_KZ_COUNTRY
                  ? ""
                  : t("free")}
            </p>
          </div>

          {width >= 768 && (
            <p className="text daily-availability-slot__content__campaign-name">
              {consultation.clientName}
            </p>
          )}
        </div>
      )}

      <>
        {!isLive && !consultation && !campaignData && !organizationForSlot && (
          <p className="small-text daily-availability-slot__available-text">
            {isAvailable ? t("available") : t("not_available")}
          </p>
        )}
        {!isLive && !consultation && (campaignData || organizationForSlot) && (
          <p className="text daily-availability-slot__content__campaign-name">
            {campaignData &&
              (numberOfCampaignsSetAsAvailable > 1
                ? t("more_campaigns", {
                    amount: numberOfCampaignsSetAsAvailable,
                  })
                : campaignData.campaignName)}
            <span>{organizationForSlot && organizationForSlot.name}</span>
          </p>
        )}
        {width >= 1200 && !isPastWithNoAvailability && (
          <div className="daily-availability-slot__icon-container">
            <Icon
              name="three-dots-vertical"
              color={dotsIconColor}
            />
          </div>
        )}
      </>

      {isMenuOpen ? (
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
          <div
            className={`daily-availability-slot__controls ${
              dayIndex >= 5 && width < 1300
                ? "daily-availability-slot__controls__right-0"
                : ""
            } ${
              1 >= dayIndex && width < 1300
                ? "daily-availability-slot__controls__left-0"
                : ""
            }`}
          >
            {hasNormalSlotItem && (
              <div
                className="daily-availability-slot__controls__single"
                onClick={handleAvailabilityChange}
              >
                {consultation?.status === "suggested" ? (
                  <h4 className="paragraph daily-availability-slot__suggested-label">
                    {t("suggested")}
                  </h4>
                ) : (
                  <>
                    <Icon size="md" name={menuFirstIcon} color={menuIconColor} />
                    <p className="small-text">{menuFirstText}</p>
                  </>
                )}
              </div>
            )}

            {consultation ? (
              <div
                className="daily-availability-slot__controls__single"
                onClick={handleMenuSecondClick}
              >
                <Icon size="md" name={menuSecondIcon} color={menuIconColor} />
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
                classes="daily-availability-slot__controls__join-button"
              />
            ) : null}

            {!consultation && validCampaigns?.length > 0 && !IS_KZ_COUNTRY && (
              <div
                className={classNames(
                  "daily-availability-slot__controls__campaign",
                  hasNormalSlotItem &&
                    "daily-availability-slot__controls__campaign--border",
                )}
              >
                {validCampaigns.map((campaign) => {
                  const isCampaignAvailableInSlot =
                    enrolledCampaignsForSlot?.some(
                      (x) => x.campaignId === campaign.campaignId,
                    );
                  return (
                    <div
                      className="daily-availability-slot__controls__single daily-availability-slot__controls__single--campaign"
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
                        className="daily-availability-slot__controls__single__image"
                      />
                      <p className="small-text">{campaign.campaignName}</p>
                      <Icon
                        classes="daily-availability-slot__controls__single--campaign__icon"
                        name={
                          isCampaignAvailableInSlot
                            ? "circle-close"
                            : "circle-actions-success"
                        }
                        color={menuIconColor}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {!consultation && organizations?.length > 0 && (
              <div
                className={classNames(
                  "daily-availability-slot__controls__organization",
                  ((!IS_KZ_COUNTRY && validCampaigns?.length > 0) ||
                    (hasNormalSlotItem && validCampaigns?.length === 0) ||
                    (hasNormalSlot && IS_KZ_COUNTRY)) &&
                    "daily-availability-slot__controls__organization--border",
                )}
              >
                {organizations.map((organization) => {
                  const isOrganizationAvailableInSlot = organizationForSlot
                    ? organizationForSlot.organizationId ===
                      organization.organizationId
                    : false;
                  return (
                    <div
                      className="daily-availability-slot__controls__single daily-availability-slot__controls__single--organization"
                      key={organization.organizationId}
                      onClick={() =>
                        handleAvailabilityChange({
                          organizationId: organization.organizationId,
                        })
                      }
                    >
                      <p className="small-text">{organization.name}</p>
                      <Icon
                        classes="daily-availability-slot__controls__single--organization__icon"
                        name={
                          isOrganizationAvailableInSlot
                            ? "circle-close"
                            : "circle-actions-success"
                        }
                        color={menuIconColor}
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
