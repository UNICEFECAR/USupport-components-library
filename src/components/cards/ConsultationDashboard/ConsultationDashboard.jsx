import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Button } from "../../buttons/Button/Button";
import { Box } from "../../boxes/Box/Box";

import {
  checkIsFiveMinutesBefore,
  getDateView,
  getMonthName,
} from "../../../utils";

import "./consultation-dashboard.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * ConsultationDashboard
 *
 * ConsultationDashboard component
 *
 * @return {jsx}
 */
export const ConsultationDashboard = ({
  classes,
  liveText,
  noConsultationsText,
  joinButtonText,
  changeButtonText,
  scheduleButtonText,
  consultation,
  handleJoin,
  handleEdit,
}) => {
  const { providerName, timestamp, image } = consultation || {};
  // const name = consultation.providerName || consultation.clientName;
  const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");

  const isLive = checkIsFiveMinutesBefore(timestamp);

  const startDate = new Date(timestamp);

  const dateText = `${getDateView(startDate).slice(0, 2)}th ${getMonthName(
    startDate
  )}`;

  const time = startDate.getHours();
  const timeText = startDate ? `${time < 10 ? `0${time}` : time}:00` : "";

  return (
    <Box
      shadow={1}
      classes={["consultation-dashboard", classNames(classes)].join(" ")}
    >
      {consultation ? (
        <div className="consultation-dashboard__content">
          {isLive ? (
            <p className="small-text now-text">{liveText}</p>
          ) : (
            <p className="small-text">{`${dateText} ${timeText}`}</p>
          )}
          <div className="consultation-dashboard__content__provider-container">
            <img src={imageUrl} className="provider-image" />
            <p className="text">{providerName}</p>
          </div>
          {isLive ? (
            <Button
              label={joinButtonText}
              color="purple"
              size="sm"
              classes="consultation-dashboard__button"
              onClick={() => handleJoin(consultation.consultationId)}
            />
          ) : (
            <Button
              label={changeButtonText}
              type="secondary"
              size="sm"
              color="purple"
              onClick={() => handleEdit(consultation)}
            />
          )}
        </div>
      ) : (
        <div className="consultation-dashboard__no-consultation">
          <p className="small-text no-booking-text">{noConsultationsText}</p>
          <Button size="sm" label={scheduleButtonText} color="purple" />
        </div>
      )}
    </Box>
  );
};

ConsultationDashboard.propTypes = {
  /**
   * Additional classes to be added to the ConsultationDashboard
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
   * Text(translated in the used language) to be displayed when there are no consultations
   */
  noConsultationsText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the consultation is live
   */
  joinButtonText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the user wants to change his consultation date/time?
   */
  changeButtonText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the user wants to schedule a consultation
   */
  scheduleButtonText: PropTypes.string,
};

ConsultationDashboard.defaultProps = {
  providerName: "",
  consultationDate: "",
  isLive: false,
  liveText: "Now",
  noConsultationsText: "Currently you do not have upcoming consultations",
  joinButtonText: "Join",
  changeButtonText: "Change",
  scheduleButtonText: "Schedule",
};
