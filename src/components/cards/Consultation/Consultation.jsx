import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../../boxes/Box";
import { Avatar } from "../../avatars/Avatar";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";
import { getDayOfTheWeek } from "../../../utils";
import { specialistPlaceholder } from "../../../assets";

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
  joinLabel,
  editLabel,
  proposeChangeLabel,
  cancelSuggestionLabel,
  acceptLabel,
  detailsLabel,
  activeLabel,
  viewProfileLabel,
  name,
  image,
  startDate,
  endDate,
  overview,
  requested,
  onClick,
  hasMenu,
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
        startDate.getMonth() + 1 < 10
          ? `0${startDate.getMonth() + 1}`
          : startDate.getMonth() + 1
      }`
    : "";

  const today = new Date();

  let buttonLabel, buttonAction;
  // TODO: @Georgi / @Vasilen - Test if this works in different timezones!!!
  // And test the logic of the if statements
  if (startDate < today && endDate > today) {
    buttonLabel = joinLabel;
    buttonAction = "join";
  } else if (today > endDate) {
    buttonLabel = detailsLabel;
    buttonAction = "details";
  } else {
    buttonLabel = renderIn === "client" ? editLabel : proposeChangeLabel;
    buttonAction = "edit";
  }

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderOptions = () => {
    let menuOptions = [
      {
        iconName: "person",
        text: viewProfileLabel,
        onClick: () => {
          console.log("View personal profile");
        },
      },
    ];

    if (buttonAction === "edit" || buttonAction === "join") {
      menuOptions.push({
        iconName: "close-x",
        text: cancelSuggestionLabel,
        onClick: () => console.log("Cancel consultation"),
      });
    }

    if (buttonAction === "details") {
      menuOptions.push({
        iconName: "document",
        text: detailsLabel,
        onClick: () => console.log("Check details"),
      });
    }

    return menuOptions.map((option, index) => {
      return (
        <div
          className="provider-consultation__menu__option"
          onClick={option.onClick}
          key={index}
        >
          <Icon
            name={option.iconName}
            color={"#373737"}
            classes="provider-consultation__menu__option__icon"
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
        <Avatar image={image} size="sm" />
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
        <div className="provider-consultation__icon-container">
          {hasMenu && (
            <Icon
              name="three-dots-vertical"
              size="md"
              color={buttonAction === "join" ? "#9749FA" : "#156F8C"}
              onClick={handleToggleMenu}
            />
          )}
        </div>
      </div>
      {!overview && !requested && buttonAction === "join" && (
        <div className="consultation__button-container">
          <p className="text consultation__button-container__now-text">
            {activeLabel}
          </p>
          <Button
            onClick={() => handleJoin()}
            label={buttonLabel}
            color={"purple"}
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
            label={cancelSuggestionLabel}
            type="secondary"
            size="sm"
          />
        </div>
      )}

      {!overview && !requested && buttonAction === "edit" && (
        <div className="consultation__button-container">
          <Button
            onClick={() => handleEdit()}
            label={buttonLabel}
            size="sm"
            type="secondary"
            color={renderIn === "provider" ? "purple" : "green"}
          />
        </div>
      )}

      {!overview && !requested && buttonAction === "details" && (
        <div className="consultation__button-container">
          {renderIn === "client" ? (
            <Button
              onClick={() => handleEdit()}
              label={buttonLabel}
              size="sm"
              type="secondary"
              color={renderIn === "provider" ? "purple" : "green"}
            />
          ) : (
            <p className="small-text">Consultation ended</p>
          )}
        </div>
      )}

      {isMenuOpen && (
        <div
          className={[
            "consultation__menu",
            buttonAction === "join" && "consultation__menu-live",
          ].join(" ")}
        >
          {renderOptions()}
        </div>
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
   * Translation for the join button
   */
  joinLabel: PropTypes.string,

  /**
   * Translation for the edit button
   */
  editLabel: PropTypes.string,

  /**
   * Translation for the propose a change button
   */
  proposeChangeLabel: PropTypes.string,

  /**
   * Translation for the cancel button
   */
  cancelSuggestionLabel: PropTypes.string,

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
  name: PropTypes.string.isRequired,

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

  /**
   * Does the card have a menu? If "true" show the menu icon
   * */
  hasMenu: PropTypes.bool,
};

Consultation.defaultProps = {
  default: "client",
  joinLabel: "Join",
  editLabel: "Edit",
  proposeChangeLabel: "Propose a change",
  cancelSuggestionLabel: "Cancel suggestion",
  acceptLabel: "Accept consultation",
  detailsLabel: "See details",
  activeLabel: "Now",
  viewProfileLabel: "View personal profile",
  image: specialistPlaceholder,
  overview: true,
  requested: false,
  onClick: () => {},
  hasMenu: false,
};
