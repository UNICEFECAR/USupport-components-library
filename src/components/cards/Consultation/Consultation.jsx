import React, { useState } from "react";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import { Card } from "../../boxes/Card";
import { Avatar } from "../../avatars/Avatar";
import { Icon } from "../../icons/Icon";
import { NewButton } from "../../buttons/Button";
import {
  checkIsFiveMinutesBefore,
  getDateView,
  getDayOfTheWeek,
  useWindowDimensions,
} from "../../../utils";

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
}) => {
  const { width } = useWindowDimensions();
  const {
    consultationId,
    timestamp,
    image,
    status,
    price: consultationPrice,
    couponPrice: consultationCouponPrice,
    campaignId,
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
    if (!isPast) {
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
  const timeText = startDate
    ? `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${
        endHour < 10 ? `0${endHour}` : endHour
      }:00`
    : "";

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
      onClick={onClick}
      borderColor={buttonAction === "join" ? "purple" : undefined}
      classes={[
        "consultation",
        buttonAction === "join" && "consultation--purple",
        classNames(classes),
      ].join(" ")}
      liquidGlass={liquidGlass}
    >
      <div className="consultation__content">
        <Avatar image={imageUrl} size="sm" isCircle hasBorder />
        <div className="consultation__content__text-container">
          <div className="consultation__content__text-container__name-container">
            <h4 className="consultation__content__text-container__name-container__date-text">
              {dateText}
            </h4>
            <p className="consultation__content__text-container__name-container__time-text">
              {buttonAction === "join" ? t("active") : timeText}
            </p>
            <p className="consultation__content__text-container__name">
              {name}
            </p>
          </div>
        </div>
        {overview &&
        renderIn === "provider" &&
        consultation.status === "canceled" ? (
          <p className="small-text consultation__canceled-text">
            {t("canceled")}
          </p>
        ) : (
          <div className="provider-consultation__icon-container">
            {statusLabel && (
              <div
                className={[
                  "consultation__status-badge",
                  statusModifier &&
                    `consultation__status-badge--${statusModifier}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p className="small-text">{statusLabel}</p>
              </div>
            )}
            {hasPriceBadge && (
              <div
                className={[
                  "provider-consultation__icon-container__price-badge",
                  !price &&
                    "provider-consultation__icon-container__price-badge--free",
                  // buttonAction === "details" &&
                  //   "provider-consultation__icon-container__price-badge--gray",
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

      {organizationName && (
        <div className="consultation__organization">
          <p>{organizationName}</p>
        </div>
      )}
      {!overview && !suggested && buttonAction === "join" && (
        <div className="consultation__button-container">
          {/* <p className="text consultation__button-container__now-text">
            {t("active")}
          </p> */}
          <NewButton
            onClick={() => handleJoin()}
            label={buttonLabel}
            type="solid"
            classes={"consultation__button-container__join-button"}
            size="lg"
          />
        </div>
      )}
      {!overview && suggested && renderIn === "client" && (
        <div className="consultation__request-container">
          <NewButton
            onClick={handleAccepConsultationClick}
            label={t("accept")}
            size="lg"
          />
          <NewButton
            onClick={handleRejectConsultationClick}
            label={t("reject")}
            type="outline"
            size="lg"
          />
        </div>
      )}

      {!overview && suggested && renderIn === "provider" && (
        <div className="consultation__button-container__edit">
          <NewButton
            onClick={() => handleCancelRequest()}
            label={t("suggested")}
            size="lg"
            disabled
          />
          <NewButton
            onClick={handleCancel}
            label={t("cancel")}
            type="outline"
            size="lg"
          />
        </div>
      )}

      {!overview && !suggested && buttonAction === "edit" && (
        <div className="consultation__button-container__edit">
          <div
            className="consultation__button-container__edit__join"
            onClick={() => toast.info(t("join_button_label_tooltip"))}
          >
            <NewButton
              label={t("join")}
              size="lg"
              type="solid"
              color={renderIn === "provider" ? "purple" : "green"}
              disabled
            />
          </div>
          <NewButton
            onClick={handleEdit}
            label={buttonLabel}
            size="lg"
            type="outline"
            color={renderIn === "provider" ? "purple" : "green"}
          />
        </div>
      )}

      {!overview && !suggested && buttonAction === "cancel" && (
        <div className="consultation__button-container">
          <NewButton
            onClick={handleCancel}
            label={buttonLabel}
            size="lg"
            type="outline"
          />
        </div>
      )}

      {((!overview && !suggested && buttonAction === "details") ||
        seeDetails) && (
        <div className="consultation__button-container">
          {(renderIn === "client" && status === "finished") || seeDetails ? (
            <NewButton
              onClick={handleSeeDetails}
              label={buttonLabel}
              size="lg"
              type="outline"
            />
          ) : (
            <></>
            // <p className="small-text">
            //   {status === "finished" ? t("conducted") : t("not_conducted")}
            // </p>
          )}
        </div>
      )}

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
