import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { Box } from "../../boxes/Box";
import { Avatar } from "../../avatars/Avatar";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";
import {
  checkIsFiveMinutesBefore,
  getDateView,
  getDayOfTheWeek,
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
}) => {
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
    new Date(timestamp).setHours(new Date(timestamp).getHours() + 1)
  );
  const dayOfWeek = t(getDayOfTheWeek(startDate));
  const dateText = `${dayOfWeek} ${getDateView(startDate).slice(0, 5)}`;

  const today = new Date().getTime();
  const isFiveMinutesBefore = checkIsFiveMinutesBefore(timestamp);

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
  const endHour = endDate.getHours();
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
            isPast
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
    <Box
      onClick={onClick}
      shadow={2}
      classes={[
        "consultation",
        buttonAction === "join" && "consultation--purple",
        classNames(classes),
      ].join(" ")}
    >
      <div className="consultation__content">
        <Avatar image={imageUrl} size="sm" />
        <div className="consultation__content__text-container">
          <div className="consultation__content__text-container__name-container">
            <p
              className={[
                "text",
                buttonAction === "join" && "text--purple",
              ].join(" ")}
            >
              {name}
            </p>
            <div className="consultation__content__text-container__date-container">
              <Icon
                name="calendar"
                size="sm"
                color={buttonAction === "join" ? "#9749fa" : "#66768D"}
              />
              <div className="consultation__content__text-container__date-container__text">
                <p className="small-text">{dateText}</p>
                <p className="small-text">{timeText}</p>
              </div>
            </div>
          </div>
        </div>
        {true && (
          <div className="provider-consultation__icon-container">
            {hasPriceBadge && (
              <div
                className={[
                  "provider-consultation__icon-container__price-badge",
                  !price &&
                    "provider-consultation__icon-container__price-badge--free",
                  buttonAction === "details" &&
                    "provider-consultation__icon-container__price-badge--gray",
                ].join(" ")}
              >
                {isBookedWithCoupon && sponsorImage ? (
                  <img
                    className="provider-consultation__icon-container__price-badge__sponsor-image"
                    src={AMAZON_S3_BUCKET + "/" + sponsorImage}
                    alt="sponsor"
                  />
                ) : null}
                <p className="small-text">
                  {price > 0 ? price : "Free"}
                  {price ? currencySymbol : ""}
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
      {!overview && !suggested && buttonAction === "join" && (
        <div className="consultation__button-container">
          <p className="text consultation__button-container__now-text">
            {t("active")}
          </p>
          <Button
            onClick={() => handleJoin()}
            label={buttonLabel}
            color={"purple"}
            size="sm"
          />
        </div>
      )}
      {!overview && suggested && renderIn === "client" && (
        <div className="consultation__request-container">
          <Button
            onClick={handleAccepConsultationClick}
            label={t("accept")}
            size="sm"
          />
          <Button
            onClick={handleRejectConsultationClick}
            label={t("reject")}
            type="secondary"
            size="sm"
          />
        </div>
      )}

      {!overview && suggested && renderIn === "provider" && (
        <div className="consultation__button-container">
          <Button
            onClick={() => handleCancelRequest()}
            label={t("suggested")}
            type="secondary"
            size="sm"
            disabled
            color="purple"
          />
        </div>
      )}

      {!overview && !suggested && buttonAction === "edit" && (
        <div className="consultation__button-container">
          <Button
            onClick={handleEdit}
            label={buttonLabel}
            size="sm"
            type="secondary"
            color={renderIn === "provider" ? "purple" : "green"}
          />
        </div>
      )}

      {!overview && !suggested && buttonAction === "cancel" && (
        <div className="consultation__button-container">
          <Button
            onClick={handleCancel}
            label={buttonLabel}
            size="sm"
            type="secondary"
            color={renderIn === "provider" ? "purple" : "green"}
          />
        </div>
      )}

      {((!overview && !suggested && buttonAction === "details") ||
        seeDetails) && (
        <div className="consultation__button-container">
          {(renderIn === "client" && status === "finished") || seeDetails ? (
            <Button
              onClick={handleSeeDetails}
              label={buttonLabel}
              size="sm"
              type="secondary"
              color={"green"}
            />
          ) : (
            <p className="small-text">
              {status === "finished" ? t("conducted") : t("not_conducted")}
            </p>
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
    </Box>
  );
};

Consultation.propTypes = {
  /**
   * Render in admin, provider or client
   * @default "client"
   */
  renderIn: PropTypes.oneOf(["admin", "provider", "client"]),

  /**
   *  Is the card overview? If "true" show the "See details" button
   */
  overview: PropTypes.bool,

  /**
   * Is the card request? If "true" show to "Accept consultation" and "Cancel suggestion" buttons
   */
  suggested: PropTypes.bool,

  /**
   * OnClick function to be called when the card is clicked
   */
  onClick: PropTypes.func,

  /**
   * hasPriceBadge is a boolean that indicates if the price badge should be shown
   * */
  hasPriceBadge: PropTypes.bool,

  /**
   * Additional classes to be added to the card
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Does the card have a menu? If "true" show the menu icon
   * */
  hasMenu: PropTypes.bool,
};

Consultation.defaultProps = {
  default: "client",
  overview: true,
  suggested: false,
  onClick: () => {},
  hasMenu: false,
  hasPriceBadge: true,
};
