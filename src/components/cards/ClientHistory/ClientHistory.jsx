import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import { Box } from "../../boxes/Box/Box";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import { Button } from "../../buttons/Button/Button";

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
 * ClientHistory card used in admin-ui
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
  suggested,
  image,
  t,
}) => {
  let startDate, endDate, dayOfWeek, dateText, startHour, endHour;
  if (timestamp) {
    startDate = new Date(timestamp);
    endDate = new Date(
      new Date(timestamp).setHours(new Date(timestamp).getHours() + 1)
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

  return (
    <Box
      classes={[
        "client-history",
        buttonAction === "join" && "client-history--live",
      ].join(" ")}
      shadow={2}
    >
      <div className="client-history__header">
        <div className="client-history__header__client-container">
          <Avatar image={imageUrl} size="sm" />
          <div className="client-history__header__client-container__text-container">
            <p>{name}</p>
            <p className="small-text consultation_text">
              {`${pastConsultations} ${t("past_consultations")}`}
            </p>
          </div>
        </div>
      </div>
      <div className="client-history__date-container">
        <Icon
          name="calendar"
          size="sm"
          color={buttonAction === "join" ? "#9749fa" : "#66768D"}
        />
        <div className="client-history__date-container__text-container">
          {startDate ? (
            <>
              <p className="small-text">{dateText}</p>
              <p className="small-text">{timeText}</p>
            </>
          ) : (
            <p className="small-text">{t("no_scheduled")}</p>
          )}
        </div>
      </div>
      <div className="client-history__button-container">
        <Button
          size="sm"
          label={buttonLabel}
          color={
            buttonAction === "join" || buttonAction === "none"
              ? "purple"
              : "green"
          }
          onClick={() => handleButtonClick(buttonAction)}
          disabled={suggested}
          type={suggested ? "secondary" : "primary"}
        />
        <Button
          size="sm"
          type="secondary"
          onClick={() => handleSeeProfile()}
          label={t("see_profile")}
          color={buttonAction === "join" ? "purple" : "green"}
        />
      </div>
    </Box>
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
};
