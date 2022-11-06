import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../../boxes/Box";
import { Avatar } from "../../avatars/Avatar";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";
import { getDayOfTheWeek, isDateBetweenTwoDates } from "../../../utils";

import "./consultation.scss";

import { specialistPlaceholder } from "../../../assets";
/**
 * Consultation
 *
 * Consultation card component
 *
 * @return {jsx}
 */
export const Consultation = ({
  joinLabel,
  editLabel,
  cancelLabel,
  acceptLabel,
  detailsLabel,
  activeLabel,
  specialistName,
  image,
  startDate,
  endDate,
  overview,
  requested,
  onClick,
  classes,
}) => {
  // TODO: Figure out a way to translate the days of the week
  // Idea: Create a reuseable hook that takes a string e.g. "mon" and returns the day translated
  const dateText = startDate
    ? `${getDayOfTheWeek(startDate)}, ${
        startDate.getDate() < 10
          ? `0${startDate.getDate()}`
          : startDate.getDate()
      }.${
        startDate.getMonth() < 10
          ? `0${startDate.getMonth()}`
          : startDate.getMonth()
      }`
    : "";

  const today = new Date();

  let buttonLabel, buttonAction;
  // TODO: @Georgi / @Vasilen - Test if this works in different timezones!!!
  if (isDateBetweenTwoDates(today, startDate, endDate)) {
    buttonLabel = joinLabel;
    buttonAction = "join";
  } else if (today > endDate) {
    buttonLabel = detailsLabel;
    buttonAction = "details";
  } else {
    buttonLabel = editLabel;
    buttonAction = "edit";
  }

  // TODO: @Joro - Make this in the format "DD.MM.YY", so "1.10" to become "01.10.22"
  const timeText = startDate
    ? `${startDate.getHours()}:00 - ${endDate.getHours()}:00`
    : "";

  const handleAcceptRequest = () => {
    console.log("Accept request");
  };

  const handleCancelRequest = () => {
    console.log("Cancel request");
  };

  const handleJoin = () => {
    console.log("Join");
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
        <Avatar image={image} size="sm" />
        <div className="consultation__content__text-container">
          <div className="consultation__content__text-container__name-container">
            <p
              className={[
                "text",
                buttonAction === "join" && "text--purple",
              ].join(" ")}
            >
              {specialistName}
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
      </div>
      {!overview && !requested && (
        <div className="consultation__button-container">
          {buttonAction === "join" && (
            <p className="text consultation__button-container__now-text">
              {activeLabel}
            </p>
          )}
          <Button
            onClick={() => handleJoin()}
            label={buttonLabel}
            type={buttonAction === "join" ? "primary" : "secondary"}
            color={buttonAction === "join" ? "purple" : "green"}
            size="sm"
          />
        </div>
      )}
      {!overview && requested && (
        <div className="consultation__request-container">
          <Button
            onClick={() => handleAcceptRequest()}
            label={acceptLabel}
            size="sm"
          />
          <Button
            onClick={() => handleCancelRequest()}
            label={cancelLabel}
            type="secondary"
            size="sm"
          />
        </div>
      )}
    </Box>
  );
};

Consultation.propTypes = {
  /**
   * Translation for the join button
   */
  joinLabel: PropTypes.string,

  /**
   * Translation for the edit button
   */
  editLabel: PropTypes.string,

  /**
   * Translation for the cancel button
   */
  cancelLabel: PropTypes.string,

  /**
   * Translation for the accept button
   */
  acceptLabel: PropTypes.string,

  /**
   * Translation for the active text
   */
  activeLabel: PropTypes.string,

  /**
   * Translation for the details text
   */
  detailsLabel: PropTypes.string,

  /**
   * Specialist name of the specialist
   * */
  specialistName: PropTypes.string.isRequired,

  /**
   * Image url
   */
  image: PropTypes.string.isRequired,

  /**
   * Start date of the consultation
   */
  startDate: PropTypes.instanceOf(Date).isRequired,

  /**
   * End date of the consultation
   */
  endDate: PropTypes.instanceOf(Date).isRequired,

  /**
   *  Is the card overview? If "true" show the "See details" button
   */
  overview: PropTypes.bool,

  /**
   * Is the card request? If "true" show to "Accept consultation" and "Cancel suggestion" buttons
   */
  requested: PropTypes.bool,

  /**
   * OnClick function to be called when the card is clicked
   */
  onClick: PropTypes.func,

  /**
   * Additional classes to be added to the card
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Consultation.defaultProps = {
  joinLabel: "Join",
  editLabel: "Edit",
  cancelLabel: "Cancel suggestion",
  acceptLabel: "Accept consultation",
  activeLabel: "Now",
  detailsLabel: "See details",
  image: specialistPlaceholder,
  overview: true,
  requested: false,
  onClick: () => {},
};
