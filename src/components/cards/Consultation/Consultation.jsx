import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import classNames from "classnames";
import { getDayOfTheWeek, isDateBetweenTwoDates } from "../../../utils";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import { Button } from "../../buttons/Button/Button";

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
    ? `${getDayOfTheWeek(startDate)}, ${startDate.getDate()}.${
        startDate.getMonth() < 10
          ? `0${startDate.getMonth()}`
          : startDate.getMonth()
      }`
    : "";

  const buttonLabel = isDateBetweenTwoDates(new Date(), startDate, endDate)
    ? "Join"
    : new Date() > endDate
    ? "See details"
    : "Edit";

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
        buttonLabel === "Join" && "consultation--purple",
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
                buttonLabel === "Join" && "text--purple",
              ].join(" ")}
            >
              {specialistName}
            </p>
            <div className="consultation__content__text-container__date-container">
              <Icon
                name="calendar"
                size="sm"
                color={buttonLabel === "Join" ? "#9749fa" : "#66768D"}
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
          {buttonLabel === "Join" && (
            <p className="text consultation__button-container__now-text">Now</p>
          )}
          <Button
            onClick={() => handleJoin()}
            label={buttonLabel}
            type={buttonLabel === "Join" ? "primary" : "secondary"}
            color={buttonLabel === "Join" ? "purple" : "green"}
            size="sm"
          />
        </div>
      )}
      {!overview && requested && (
        <div className="consultation__request-container">
          <Button
            onClick={() => handleAcceptRequest()}
            label="Accept consultation"
            size="sm"
          />
          <Button
            onClick={() => handleCancelRequest()}
            label="Cancel suggestion"
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
   * Specialist name of the specialist
   * */
  specialistName: PropTypes.string,

  /**
   * Image url
   */
  image: PropTypes.string,

  /**
   * Start date of the consultation
   */
  startDate: PropTypes.instanceOf(Date),

  /**
   * End date of the consultation
   */
  endDate: PropTypes.instanceOf(Date),

  /**
   *  Is the card overview?
   */
  overview: PropTypes.bool,

  /**
   * Is the card request?
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
  image: specialistPlaceholder,
  overview: true,
  requested: false,
  onClick: () => {},
};
