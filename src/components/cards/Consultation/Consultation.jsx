import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../../boxes/Box";
import { Avatar } from "../../avatars/Avatar";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";
import {
  checkIsFiveMinutesBefore,
  getDateView,
  getDayOfTheWeek,
} from "../../../utils";
import { specialistPlaceholder } from "../../../assets";

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
  joinLabel,
  editLabel,
  cancelSuggestionLabel,
  cancelConsultationLabel,
  acceptLabel,
  detailsLabel,
  activeLabel,
  viewProfileLabel,
  daysOfWeekTranslations,
  handleOpenEdit,
  handleOpenDetails,
  handleJoinClick,
  handleCancelConsultation,
  consultation,
  overview,
  requested,
  onClick,
  hasMenu,
  classes,
}) => {
  const { providerId, consultationId, timestamp, image } = consultation;

  const name = consultation.providerName || consultation.clientName;

  const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");

  const startDate = new Date(timestamp);
  const endDate = new Date(
    new Date(timestamp).setHours(new Date(timestamp).getHours() + 1)
  );
  const dayOfWeek = daysOfWeekTranslations[getDayOfTheWeek(startDate)];
  const dateText = `${dayOfWeek} ${getDateView(startDate).slice(0, 5)}`;

  const today = new Date().getTime();
  const isFiveMinutesBefore = checkIsFiveMinutesBefore(timestamp);

  let buttonLabel, buttonAction;
  if (isFiveMinutesBefore) {
    buttonLabel = joinLabel;
    buttonAction = "join";
  } else if (today > endDate) {
    buttonLabel = detailsLabel;
    buttonAction = "details";
  } else {
    buttonLabel = renderIn === "client" ? editLabel : cancelConsultationLabel;
    buttonAction = renderIn === "client" ? "edit" : "cancel";
  }

  const startHour = startDate.getHours();
  const endHour = endDate.getHours();
  const timeText = startDate
    ? `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${
        endHour < 10 ? `0${endHour}` : endHour
      }:00`
    : "";

  const handleAcceptRequest = () => {
    console.log("Accept request");
  };

  const handleCancelRequest = () => {
    console.log("cancel suggestion");
  };

  const handleJoin = () => {
    handleJoinClick(providerId);
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
        text: viewProfileLabel,
        onClick: () => {
          console.log("View personal profile");
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
            onClick={handleEdit}
            label={buttonLabel}
            size="sm"
            type="secondary"
            color={renderIn === "provider" ? "purple" : "green"}
          />
        </div>
      )}

      {!overview && !requested && buttonAction === "cancel" && (
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

      {!overview && !requested && buttonAction === "details" && (
        <div className="consultation__button-container">
          {renderIn === "client" ? (
            <Button
              onClick={handleSeeDetails}
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
   * Translation for the cancel suggestion button
   */
  cancelSuggestionLabel: PropTypes.string,

  /**
   * Translation for the cancel consultation button
   */
  cancelConsultationLabel: PropTypes.string,

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
   * An object containing the translations for each weekday
   * {"monday":"Monday"}
   */
  daysOfWeekTranslations: PropTypes.object.isRequired,

  /**
   * The id of the provider
   */
  providerId: PropTypes.string,

  /**
   * Specialist name of the specialist
   * */
  name: PropTypes.string.isRequired,

  /**
   * Image url
   */
  image: PropTypes.string.isRequired,

  /**
   * The timestamp of the consultation e.g. 1668869623102
   */
  timestamp: PropTypes.number.isRequired,

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
  cancelSuggestionLabel: "Cancel suggestion",
  cancelConsultationLabel: "Cancel consultation",
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
