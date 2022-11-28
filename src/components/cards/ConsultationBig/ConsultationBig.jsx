import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { Button } from "../../buttons/Button/Button";
import classNames from "classnames";
import {
  checkIsFiveMinutesBefore,
  getDateView,
  getDayOfTheWeek,
  getMonthName,
} from "../../../utils";

import "./consultation-big.scss";

import avatar from "../../../assets/SpecialistPlaceholderImage.png";
import mascot from "../../../assets/mascot-happy-blue.png";

// const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;
const AMAZON_S3_BUCKET = `https://usupport-staging.s3.eu-central-1.amazonaws.com`;

/**
 * CardConsultationBig
 *
 * CardConsultationBig component
 *
 * @return {jsx}
 */
export const ConsultationBig = ({
  consultation,
  classes,
  liveText,
  joinButtonText,
  changeButtonText,
  handleJoin,
  handleChange,
}) => {
  const { providerName, timestamp } = consultation;
  // const name = consultation.providerName || consultation.clientName;
  // const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");

  const isLive = checkIsFiveMinutesBefore(timestamp);

  const startDate = new Date(timestamp);

  const dateText = `${getDateView(startDate).slice(0, 2)}th ${getMonthName(
    startDate
  )}`;

  const time = startDate.getHours();
  const timeText = startDate ? `${time < 10 ? `0${time}` : time}:00` : "";

  return (
    <Box classes={["consultation-big", classNames(classes)].join(" ")}>
      <div>
        {isLive ? (
          <p className="small-text consultation-big__now-text">{liveText}</p>
        ) : (
          <p className="small-text">
            {dateText}, {timeText}
          </p>
        )}
        <div className="consultation-big__specialist-container">
          <img src={avatar} alt={"Specialist"} />
          <p>{providerName}</p>
        </div>
        {isLive ? (
          <Button
            label={joinButtonText}
            color="purple"
            classes={"consultation-big__button"}
            onClick={handleJoin}
          />
        ) : (
          <Button
            label={changeButtonText}
            type="secondary"
            color="purple"
            classes={"consultation-big__button"}
            onClick={handleChange}
          />
        )}
      </div>
      <img src={mascot} className="consultation-big__mascot" />
    </Box>
  );
};

ConsultationBig.propTypes = {
  /**
   * Specialist name
   * */
  specialistName: PropTypes.string,

  /**
   * Consultation date
   * */
  consultationDate: PropTypes.string,

  /**
   * Is the consultation happening now
   **/
  isLive: PropTypes.bool,

  /**
   * Additional classes to be added to the CardConsultation
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Text(translated in the used language) to display when the consultation is live
   * */
  liveText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the consultation is live
   */
  joinButtonText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the user wants to change his consultation date/time?
   */
  changeButtonText: PropTypes.string,
};

ConsultationBig.defaultProps = {
  specialistName: "",
  consultationDate: "",
  isLive: false,
  classes: "",
  liveText: "Now",
  changeButtonText: "Change",
  joinButtonText: "Join now",
  handleJoin: () => {},
  handleChange: () => {},
};
