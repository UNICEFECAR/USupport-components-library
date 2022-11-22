import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import { Box } from "../../boxes/Box/Box";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import { Button } from "../../buttons/Button/Button";

import { getDayOfTheWeek } from "../../../utils";

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
  startDate,
  endDate,
  pastConsultations,
  viewProfileLabel,
  cancelSuggestionLabel,
  suggestRescheduleLabel,
  suggestConsultationLabel,
  joinLabel,
  handleClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: Figure out a way to translate the days of the week
  // Idea: Create a reuseable hook that takes a string e.g. "mon" and returns the day translated
  const dateText = startDate
    ? `${getDayOfTheWeek(startDate)}, ${
        startDate.getDate() < 10
          ? `0${startDate.getDate()}`
          : startDate.getDate()
      }.${
        startDate.getMonth() + 1 < 10
          ? `0${startDate.getMonth() + 1}`
          : startDate.getMonth() + 1
      }`
    : "";

  const timeText = startDate
    ? `${startDate.getHours()}:00 - ${endDate.getHours()}:00`
    : "";

  const today = new Date();

  let buttonLabel, buttonAction;
  // TODO: @Georgi / @Vasilen - Test if this works in different timezones!!!
  // And test the logic of the if statements
  if (startDate && endDate && startDate < today && endDate > today) {
    buttonLabel = joinLabel;
    buttonAction = "join";
  } else if (startDate && endDate && today < startDate) {
    buttonLabel = suggestRescheduleLabel;
    buttonAction = "reschedule";
  } else {
    buttonLabel = suggestConsultationLabel;
    buttonAction = "suggest";
  }

  const handleCancelConsultation = () => {
    setIsMenuOpen(false);
  };

  const handleRemoveCustomer = () => {
    setIsMenuOpen(false);
  };

  const handleSeeProfile = () => {
    console.log("profile");
  };

  const renderOptions = () => {
    let menuOptions = [
      {
        iconName: "circle-actions-close",
        text: viewProfileLabel,
        onClick: () => {
          handleRemoveCustomer();
        },
      },
    ];

    if (buttonAction === "reschedule" || buttonAction === "join") {
      menuOptions.push({
        iconName: "close-x",
        text: cancelSuggestionLabel,
        onClick: () => handleCancelConsultation(),
      });
    }

    return menuOptions.map((option, index) => {
      return (
        <div
          className="client-history__menu__option"
          onClick={option.onClick}
          key={index}
        >
          <Icon
            name={option.iconName}
            color={"#373737"}
            classes="client-history__menu__option__icon"
          />
          <p className="small-text">{option.text}</p>
        </div>
      );
    });
  };

  return (
    <Box
      classes={[
        "client-history",
        buttonAction === "join" && "client-history--live",
      ].join(" ")}
      shadow={2}
      onClick={handleClick}
    >
      <div className="client-history__header">
        <div className="client-history__header__client-container">
          <Avatar size="sm" />
          <div className="client-history__header__client-container__text-container">
            <p>{name}</p>
            <p className="small-text consultation_text">
              {pastConsultations} past consultations
            </p>
          </div>
        </div>
        <Icon
          name="three-dots-vertical"
          color={buttonAction === "join" ? "#9749FA" : "#20809E"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
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
        />
        <Button
          size="sm"
          type="secondary"
          onClick={() => handleSeeProfile()}
          label={viewProfileLabel}
          color={buttonAction === "join" ? "purple" : "green"}
        />
      </div>
      {isMenuOpen && (
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div
            className={[
              "client-history__menu",
              buttonAction === "join" && "client-history__menu--live",
            ].join(" ")}
          >
            {renderOptions()}
          </div>
        </OutsideClickHandler>
      )}
    </Box>
  );
};

ClientHistory.propTypes = {
  // Add propTypes here
};

ClientHistory.defaultProps = {
  viewProfileLabel: "See profile",
  cancelSuggestionLabel: "Cancel consultation",
  joinLabel: "Join",
  suggestRescheduleLabel: "Suggest reschedule",
  suggestConsultationLabel: "Suggest consultation",
  handleClick: () => {},
};
