import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../../boxes/Box/Box";
import { Icon } from "../../icons/Icon";

import "./provider-consultation.scss";

import { specialistPlaceholder } from "../../../assets";
import { Button } from "../../buttons/Button/Button";

/**
 * ProviderConsultation
 *
 * Consultation component for the provider platform
 *
 * @return {jsx}
 */
// TODO: Delete this component ?
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
  const isLive = false;
  const isUpcoming = true;

  return (
    <Box
      borderSize="xs"
      classes={["provider-consultation", classNames(classes)]}
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
          <Icon name="three-dots-vertical" />
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
