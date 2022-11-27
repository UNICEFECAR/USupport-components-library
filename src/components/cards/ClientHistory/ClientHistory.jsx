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
  nextConsultationId,
  pastConsultations,
  viewProfileLabel,
  cancelConsultationLabel,
  suggestConsultationLabel,
  daysOfWeekTranslations,
  joinLabel,
  handleClick,
  cancelConsultation,
  image,
}) => {
  let startDate, endDate, dayOfWeek, dateText, startHour, endHour;
  if (timestamp) {
    startDate = new Date(timestamp);
    endDate = new Date(
      new Date(timestamp).setHours(new Date(timestamp).getHours() + 1)
    );
    dayOfWeek = daysOfWeekTranslations[getDayOfTheWeek(startDate)];
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

  const today = new Date().getTime();
  const isFiveMinutesBefore = checkIsFiveMinutesBefore(timestamp);

  let buttonLabel, buttonAction;
  if (isFiveMinutesBefore) {
    buttonLabel = joinLabel;
    buttonAction = "join";
  } else if (startDate && endDate && today < startDate) {
    buttonLabel = cancelConsultationLabel;
    buttonAction = "cancel";
  } else {
    buttonLabel = suggestConsultationLabel;
    buttonAction = "suggest";
  }

  const handleCancelConsultation = () => {
    cancelConsultation({
      consultationId: nextConsultationId,
      image,
      providerName: name,
      timestamp,
    });
  };

  const handleRemoveCustomer = () => {};

  const handleButtonClick = (action) => {
    switch (action) {
      case "join":
        break;
      case "cancel":
        handleCancelConsultation();
        break;
      case "suggest":
        break;
      default:
        break;
    }
  };

  const handleSeeProfile = () => {
    console.log("click?");
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
              {pastConsultations} past consultations
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
            <p className="small-text">No consultation scheduled</p>
          )}
        </div>
      </div>
      <div className="client-history__button-container">
        <Button
          size="sm"
          label={buttonLabel}
          color={buttonAction === "join" ? "purple" : "green"}
          onClick={() => handleButtonClick(buttonAction)}
        />
        <Button
          size="sm"
          type="secondary"
          onClick={() => handleSeeProfile()}
          label={viewProfileLabel}
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
  handleClick: () => {},
};
