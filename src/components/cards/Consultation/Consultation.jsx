import React, { useState } from "react";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import { Card } from "../../boxes/Card";
import { Avatar } from "../../avatars/Avatar";
import { Icon } from "../../icons/Icon";
import { NewButton } from "../../buttons/Button";
import { PeerSupportBadge } from "../../labels/PeerSupportBadge";
import {
  checkIsFiveMinutesBefore,
  getDateView,
  getDayOfTheWeek,
} from "../../../utils";
import {
  getDisplaySpecializations,
  isPeerSupportProvider,
  parseSpecializationKeys,
} from "../../../utils/peerSupport";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./consultation.scss";

/**
 * Consultation
 *
 * Consultation card component
 *
 * @return {jsx}
 */
export const Consultation = ({
  renderIn,
  t,
  handleOpenEdit,
  handleOpenDetails,
  handleJoinClick,
  handleCancelConsultation,
  handleAcceptConsultation,
  handleRejectConsultation,
  handleViewProfile,
  handleTestDevices,
  hasPriceBadge,
  couponPrice,
  sponsorImage,
  consultation,
  seeDetails,
  overview,
  suggested,
  onClick,
  hasMenu,
  classes,
  organizationName,
  withOrganization,
  toast,
  liquidGlass = false,
  buttonSize = "md",
}) => {
  const isClickable = !hasMenu && typeof onClick === "function";
  const {
    consultationId,
    timestamp,
    image,
    status,
    price: consultationPrice,
    couponPrice: consultationCouponPrice,
    campaignId,
    providerSpecializations,
  } = consultation;

  const price =
    campaignId && renderIn === "client"
      ? 0
      : !isNaN(couponPrice)
        ? couponPrice
        : !isNaN(consultationCouponPrice)
          ? consultationCouponPrice
          : consultationPrice;

  const isBookedWithCoupon =
    couponPrice || consultation.couponPrice || campaignId;

  const isPast = consultation
    ? new Date(timestamp).getTime() < new Date().getTime()
    : false;

  const currencySymbol = localStorage.getItem("currency_symbol");

  const name = consultation.providerName || consultation.clientName;

  const specializationKeys = parseSpecializationKeys(providerSpecializations);
  const showPeerBadge =
    renderIn === "client" && isPeerSupportProvider(specializationKeys);
  const specializationsText = getDisplaySpecializations(
    specializationKeys,
    t,
  ).join(", ");

  const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");

  const startDate = new Date(timestamp);
  const endDate = new Date(
    new Date(timestamp).setHours(new Date(timestamp).getHours() + 1),
  );
  const dayOfWeek = t(getDayOfTheWeek(startDate));
  const dateText = `${dayOfWeek} ${getDateView(startDate).slice(0, 5)}`;

  const today = new Date().getTime();
  const isFiveMinutesBefore = checkIsFiveMinutesBefore(timestamp);

  // Status badge logic (for client render)
  let statusLabel = "";
  let statusModifier = "";

  if (renderIn === "client") {
    if (isFiveMinutesBefore) {
      statusLabel = t("live");
      statusModifier = "live";
    } else if (!isPast) {
      // Reuse existing "Upcoming" label from consultations blocks
      statusLabel = t("upcoming_tab_label");
      statusModifier = "upcoming";
    } else if (status === "finished") {
      statusLabel = t("conducted");
      statusModifier = "completed";
    } else {
      statusLabel = t("not_conducted");
      statusModifier = "not-conducted";
    }
  }

  let buttonLabel, buttonAction;
  if (isFiveMinutesBefore) {
    buttonLabel = t("join");
    buttonAction = "join";
  } else if (today > endDate) {
    // If the consultation is in the past
    buttonLabel = t("details");
    buttonAction = "details";
  } else {
    buttonLabel = renderIn === "client" ? t("edit") : t("cancel_consultation");
    buttonAction = renderIn === "client" ? "edit" : "cancel";
  }

  const startHour = startDate.getHours();
  const endHour = startHour + 1;
  const rawTimeText = startDate
    ? `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${
        endHour < 10 ? `0${endHour}` : endHour
      }:00`
    : "";
  const displayTimeText = buttonAction === "join" ? t("active") : rawTimeText;
  const dateTimeText =
    dateText && displayTimeText
      ? `${dateText} · ${displayTimeText}`
      : dateText || displayTimeText;

  const handleAccepConsultationClick = () => {
    handleAcceptConsultation(consultationId, price);
  };

  const handleRejectConsultationClick = () => {
    handleRejectConsultation(consultationId);
  };

  const handleJoin = () => {
    handleJoinClick(consultation);
  };

  const handleEdit = () => {
    handleOpenEdit(consultation);
  };

  const handleSeeDetails = () => {
    handleOpenDetails(consultation);
  };

  const handleCancel = () => {
    handleCancelConsultation(consultation);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hasActions =
    (!overview && !suggested && buttonAction === "join") ||
    (!overview && suggested && renderIn === "client") ||
    (!overview && suggested && renderIn === "provider") ||
    (!overview &&
      !suggested &&
      (buttonAction === "edit" || buttonAction === "cancel")) ||
    (((!overview && !suggested && buttonAction === "details") || seeDetails) &&
      ((renderIn === "client" && status === "finished") || seeDetails));

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderOptions = () => {
    let menuOptions = [
      {
        iconName: "person",
        text: t("view_profile"),
        onClick: () => {
          handleViewProfile(
            {
              clientDetailId: consultation.clientDetailId,
              image: image || "default",
              name: consultation.clientName,
              chatId: consultation.chatId,
            },
            isPast,
          );
        },
      },
    ];

    return menuOptions.map((option, index) => {
      return (
        <div
          className="consultation__menu__option"
          onClick={option.onClick}
          key={index}
        >
          <Icon
            name={option.iconName}
            color={"#373737"}
            classes="consultation__menu__option__icon"
          />
          <p className="small-text">{option.text}</p>
        </div>
      );
    });
  };

  return (
    <Card
      onClick={isClickable ? onClick : undefined}
      borderColor={buttonAction === "join" ? "purple" : undefined}
      classes={[
        "consultation",
        isClickable && "consultation--clickable",
        buttonAction === "join" && "consultation--purple",
        classNames(classes),
      ].join(" ")}
      liquidGlass={liquidGlass}
    >
      <div className="consultation__content">
        <Avatar image={imageUrl} size="sm" isCircle={false} />
        <div className="consultation__content__text-container">
          <div className="consultation__content__text-container__name-container">
            <p className="paragraph consultation__content__text-container__name">
              {name}
            </p>
          </div>
          {showPeerBadge && (
            <PeerSupportBadge
              classes="consultation__peer-badge"
              label={t("peer_support")}
            />
          )}
          {specializationsText && (
            <p className="text consultation__specializations">
              {specializationsText}
            </p>
          )}
        </div>
        {overview &&
        renderIn === "provider" &&
        consultation.status === "canceled" ? (
          <p className="small-text consultation__canceled-text">
            {t("canceled")}
          </p>
        ) : (
          <div className="provider-consultation__icon-container">
            {hasPriceBadge && (
              <div
                className={[
                  "provider-consultation__icon-container__price-badge",
                  !price &&
                    "provider-consultation__icon-container__price-badge--free",
                ].join(" ")}
              >
                {isBookedWithCoupon && sponsorImage ? (
                  <img
                    className="provider-consultation__icon-container__price-badge__sponsor-image"
                    src={AMAZON_S3_BUCKET + "/" + sponsorImage}
                    alt="sponsor"
                  />
                ) : withOrganization ? (
                  <img
                    className="provider-consultation__icon-container__price-badge__sponsor-image"
                    src={AMAZON_S3_BUCKET + "/" + "organization"}
                    alt="ogranization"
                  />
                ) : null}
                <p className="text provider-consultation__icon-container__price-badge__text">
                  {isBookedWithCoupon && renderIn === "client"
                    ? t("coupon")
                    : price > 0
                      ? `${consultation.price}${currencySymbol || ""}`
                      : t("free")}
                </p>
              </div>
            )}
            {hasMenu && (
              <Icon
                name="three-dots-vertical"
                size="md"
                color={buttonAction === "join" ? "#9749FA" : "#156F8C"}
                onClick={handleToggleMenu}
              />
            )}
          </div>
        )}
      </div>
      {statusLabel && (
        <div
          className={[
            "consultation__content__text-container__free-badge",
            "consultation__status-badge",
            statusModifier && `consultation__status-badge--${statusModifier}`,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <p className="small-text">{statusLabel}</p>
        </div>
      )}
      <div className="consultation__bottom">
        {organizationName && (
          <div className="consultation__organization">
            <p className="text">{organizationName}</p>
          </div>
        )}
        <div className="consultation__earliest">
          <div className="consultation__earliest-container__wrapper">
            <div className="consultation__earliest-container">
              <Icon name="calendar" size="sm" color={"#66768D"} />
              <div className="consultation__earliest-container__text">
                <p className="text">{dateText}</p>
              </div>
            </div>
            <div className="consultation__earliest-container">
              <Icon name="time" size="sm" color={"#66768D"} />
              <div className="consultation__earliest-container__text">
                <p className="text">{displayTimeText}</p>
              </div>
            </div>
          </div>
        </div>
        {renderIn === "client" &&
          !overview &&
          !suggested &&
          buttonAction === "edit" &&
          handleTestDevices && (
            <div
              className="consultation__test-devices"
              onClick={handleTestDevices}
            >
              <div className="consultation__test-devices__left">
                <Icon name="microphone" size="sm" color="#9749FA" />
                <div className="consultation__test-devices__text">
                  <p className="text consultation__test-devices__title">
                    {t("test_audio_camera")}
                  </p>
                  <p className="small-text consultation__test-devices__description">
                    {t("test_audio_camera_description")}
                  </p>
                </div>
              </div>
              <Icon name="arrow-chevron-forward" size="sm" color="#66768D" />
            </div>
          )}
        {hasActions && (
          <div className="consultation__actions">
            {!overview && !suggested && buttonAction === "join" && (
              <NewButton
                onClick={() => handleJoin()}
                label={buttonLabel}
                type="gradient"
                size={buttonSize}
              />
            )}

            {!overview && suggested && renderIn === "client" && (
              <>
                <NewButton
                  onClick={handleAccepConsultationClick}
                  label={t("accept")}
                  size={buttonSize}
                  type="gradient"
                />
                <NewButton
                  onClick={handleRejectConsultationClick}
                  label={t("reject")}
                  type="outline"
                  size={buttonSize}
                />
              </>
            )}

            {!overview && suggested && renderIn === "provider" && (
              <>
                <NewButton
                  onClick={() => handleCancelRequest()}
                  label={t("suggested")}
                  size={buttonSize}
                  disabled
                />
                <NewButton
                  onClick={handleCancel}
                  label={t("cancel")}
                  type="outline"
                  size={buttonSize}
                />
              </>
            )}

            {!overview && !suggested && buttonAction === "edit" && (
              <>
                <NewButton
                  onClick={() => toast.info(t("join_button_label_tooltip"))}
                  label={t("join")}
                  size={buttonSize}
                  type="gradient"
                  disabled
                />
                <NewButton
                  onClick={handleEdit}
                  label={buttonLabel}
                  size={buttonSize}
                  type="outline"
                />
              </>
            )}

            {!overview && !suggested && buttonAction === "cancel" && (
              <NewButton
                onClick={handleCancel}
                label={buttonLabel}
                size={buttonSize}
                type="outline"
              />
            )}

            {((!overview && !suggested && buttonAction === "details") ||
              seeDetails) &&
              ((renderIn === "client" && status === "finished") ||
                seeDetails) && (
                <NewButton
                  onClick={handleSeeDetails}
                  label={buttonLabel}
                  size={buttonSize}
                  type="outline"
                />
              )}
          </div>
        )}
      </div>

      {isMenuOpen && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <div
            className={[
              "consultation__menu",
              buttonAction === "join" && "consultation__menu-live",
            ].join(" ")}
          >
            {renderOptions()}
          </div>
        </OutsideClickHandler>
      )}
    </Card>
  );
};
