import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../../boxes/Box/Box";
import { specialistPlaceholder } from "../../../assets";
import { Button } from "../../buttons/Button/Button";
import { ButtonOnlyIcon } from "../../buttons/ButtonOnlyIcon/ButtonOnlyIcon";
import { Icon } from "../../icons/Icon";

import "./provider-consultation.scss";

/**
 * ProviderConsultation
 *
 * Consultation component for the provider platform
 *
 * @return {jsx}
 */
export const ProviderConsultation = ({
  name,
  image,
  date,
  period,
  classes,
  consultationEndedText,
  isLiveText,
  isLiveButtonText,
  upcomingButtonText,
  isCompleted,
}) => {
  // TODO: check if the consultation is live by comparing the current hour with the consultation date
  const isLive = true;
  const isUpcoming = false;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderOptions = () => {
    let menuOptions = [
      {
        iconName: "person",
        text: "View personal profile",
        onClick: () => {
          console.log("View personal profile");
        },
      },
    ];

    if (isUpcoming || isLive) {
      menuOptions.push({
        iconName: "close-x",
        text: "Cancel consultation",
        onClick: () => console.log("Cancel consultation"),
      });
    }

    if (isCompleted) {
      menuOptions.push({
        iconName: "document",
        text: "Check details",
        onClick: () => console.log("Check details"),
      });
    }

    return menuOptions.map((option, index) => {
      return (
        <div
          className="provider-consultation-container__menu__option"
          onClick={option.onClick}
          key={index}
        >
          <Icon
            name={option.iconName}
            color={"#373737"}
            classes="provider-consultation-container__menu__option__icon"
          />
          <p className="small-text">{option.text}</p>
        </div>
      );
    });
  };

  return (
    <div
      className={["provider-consultation-container", classNames(classes)].join(
        " "
      )}
    >
      <Box
        borderSize="xs"
        classes={[
          "provider-consultation",
          isLive && "provider-consultation-live",
        ]}
      >
        <div className="provider-consultation__information-container">
          <img
            className="provider-consultation__user-image"
            src={image}
            alt="user-image"
          />
          <div>
            <p className="small-text">{name}</p>
            <p className="text">{period}</p>
          </div>
          <div className="provider-consultation__icon-container">
            <ButtonOnlyIcon
              iconName="three-dots-vertical"
              iconSize="md"
              iconColor={isLive ? "#9749FA" : "#156F8C"}
              onClick={handleToggleMenu}
            />
          </div>
        </div>
        <div className="provider-consultation__action-container">
          {isCompleted && (
            <p className="small-text provider-consultation__completed-text">
              {consultationEndedText}
            </p>
          )}

          {isLive && (
            <>
              <p className="small-text provider-consultation__live-text">
                {isLiveText}
              </p>
              <Button color="purple" size="md" label={isLiveButtonText} />
            </>
          )}

          {isUpcoming && (
            <Button
              classes="provider-consultation__change-button"
              color="purple"
              size="md"
              label={upcomingButtonText}
              type="secondary"
            />
          )}
        </div>
      </Box>
      {isMenuOpen && (
        <div
          className={[
            "provider-consultation-container__menu",
            isLive && "provider-consultation-container__menu-live",
          ].join(" ")}
        >
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

ProviderConsultation.propTypes = {
  /**
   * Name of the user
   */
  name: PropTypes.string,

  /**
   * Image of the user
   */
  image: PropTypes.string,

  /**
   * Date of the consultation
   */
  date: PropTypes.instanceOf(Date),

  /**
   * Period of the consultation
   */
  period: PropTypes.string,

  /**
   * Additional classes to be added to the ProviderConsultation
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Text(translated in the used language) to be displayed when the consultation is completed
   */
  consultationEndedText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed when the consultation is live
   */
  isLiveText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the consultation is live
   */
  isLiveButtonText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the consultation is upcoming
   */
  upcomingButtonText: PropTypes.string,

  /**
   * Is the consultation completed
   */
  isCompleted: PropTypes.bool,
};

ProviderConsultation.defaultProps = {
  name: "Joanna Doe",
  date: new Date(),
  period: "09:00 - 10:00",
  image: specialistPlaceholder,
  consultationEndedText: "Consultation ended",
  isLiveText: "Now",
  isLiveButtonText: "Join now",
  upcomingButtonText: "Propose a change",
  isCompleted: false,
};
