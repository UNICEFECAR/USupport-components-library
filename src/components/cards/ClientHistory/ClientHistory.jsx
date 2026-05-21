import React from "react";

import { Card } from "../../boxes/Card";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import { NewButton } from "../../buttons";

import {
  getDayOfTheWeek,
  getDateView,
  checkIsFiveMinutesBefore,
} from "../../../utils";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./client-history.scss";

/**
 * ClientHistory
 *
 * ClientHistory card used in provider-ui
 *
 * @return {jsx}
 */
export const ClientHistory = ({
  name,
  timestamp,
  consultationChatId,
  nextConsultationId,
  pastConsultations,
  clientId,
  handleClick,
  cancelConsultation,
  joinConsultation,
  suggestConsultation,
  consultationPrice,
  consultationCouponPrice,
  nextConsultationCampaignId,
  nextConsultationSponsorName,
  suggested,
  image,
  providerStatus,
  t,
  liquidGlass,
}) => {
  let startDate, endDate, dayOfWeek, dateText, startHour, endHour;
  if (timestamp) {
    startDate = new Date(timestamp);
    endDate = new Date(
      new Date(timestamp).setHours(new Date(timestamp).getHours() + 1),
    );
    dayOfWeek = t(getDayOfTheWeek(startDate));
    dateText = `${dayOfWeek} ${getDateView(startDate).slice(0, 5)}`;

    startHour = startDate.getHours();
    endHour = endDate.getHours();
  }

  const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");

  const timeText = startDate
    ? `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${
        endHour < 10 ? `0${endHour}` : endHour
      }:00`
    : "";

  const consultationObject = {
    consultationId: nextConsultationId,
    chatId: consultationChatId,
    image,
    clientName: name,
    timestamp,
    clientId,
    price: consultationPrice,
    couponPrice: consultationCouponPrice,
    campaignId: nextConsultationCampaignId,
    sponsorName: nextConsultationSponsorName,
  };

  const today = new Date().getTime();
  const isFiveMinutesBefore = checkIsFiveMinutesBefore(timestamp);

  let buttonLabel, buttonAction;
  if (isFiveMinutesBefore) {
    buttonLabel = t("join");
    buttonAction = "join";
  } else if (startDate && endDate && today < startDate) {
    buttonLabel = t("cancel_consultation");
    buttonAction = "cancel";
  } else {
    buttonLabel = t("suggest_consultation");
    buttonAction = "suggest";
  }

  if (suggested) {
    buttonLabel = t("suggested");
    buttonAction = "none";
  }

  const handleCancelConsultation = () => {
    cancelConsultation(consultationObject);
  };

  const handleSuggestConsultation = () => {
    suggestConsultation(clientId);
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case "join":
        joinConsultation(consultationObject);
        break;
      case "cancel":
        handleCancelConsultation();
        break;
      case "suggest":
        handleSuggestConsultation();
        break;
      default:
        break;
    }
  };

  const handleSeeProfile = () => {
    handleClick();
  };

  const scheduleIconColor =
    buttonAction === "join" ? "#9749fa" : "#66768D";

  const primaryDisabled =
    (providerStatus !== "active" && buttonAction === "suggest") || suggested;
  const primaryType = suggested ? "outline" : "gradient";

  return (
    <Card
      classes={[
        "client-history",
        buttonAction === "join" && "client-history--live",
      ].filter(Boolean)}
      liquidGlass={liquidGlass}
    >
      <div className="client-history__content">
        <Avatar image={imageUrl} size="sm" isCircle={false} />
        <div className="client-history__content__text-container">
          <div className="client-history__content__text-container__name-container">
            <p className="client-history__content__text-container__name paragraph">
              {name}
            </p>
          </div>
          <p className="text client-history__meta">
            {`${pastConsultations} ${t("past_consultations")}`}
          </p>
        </div>
      </div>
      <div className="client-history__bottom">
        <div className="client-history__schedule">
          <p className="text client-history__schedule-label">
            {t("next_consultation_label")}
          </p>
          {startDate ? (
            <div className="client-history__slot-container__wrapper">
              <div className="client-history__slot-container">
                <Icon name="calendar" size="sm" color={scheduleIconColor} />
                <div className="client-history__slot-container__text">
                  <p className="text">{dateText}</p>
                </div>
              </div>
              <div className="client-history__slot-container">
                <Icon name="time" size="sm" color={scheduleIconColor} />
                <div className="client-history__slot-container__text">
                  <p className="text">{timeText}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="client-history__slot-container__wrapper">
              <div className="client-history__slot-container">
                <Icon name="calendar" size="sm" color="#66768D" />
                <div className="client-history__slot-container__text">
                  <p className="text">{t("no_scheduled")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="client-history__actions">
          <NewButton
            type="outline"
            size="sm"
            label={t("see_profile")}
            onClick={(e) => {
              e.stopPropagation();
              handleSeeProfile();
            }}
          />
          <NewButton
            type={primaryType}
            size="sm"
            label={buttonLabel}
            disabled={primaryDisabled}
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick(buttonAction);
            }}
          />
        </div>
      </div>
    </Card>
  );
};

ClientHistory.propTypes = {
  // Add propTypes here
};

ClientHistory.defaultProps = {
  viewProfileLabel: "See profile",
  cancelConsultationLabel: "Cancel consultation",
  joinLabel: "Join",
  suggestRescheduleLabel: "Suggest reschedule",
  suggestConsultationLabel: "Suggest consultation",
  suggestedLabel: "Suggested",
  handleClick: () => {},
  liquidGlass: false,
};
