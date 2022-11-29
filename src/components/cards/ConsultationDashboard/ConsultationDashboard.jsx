import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../buttons/Button/Button";
import { Box } from "../../boxes/Box/Box";
import classNames from "classnames";

import "./consultation-dashboard.scss";

import avatar from "../../../assets/specialistPlaceholderImage.png";

/**
 * ConsultationDashboard
 *
 * ConsultationDashboard component
 *
 * @return {jsx}
 */
export const ConsultationDashboard = ({
  providerName,
  consultationDate,
  isLive,
  classes,
  liveText,
  noConsultationsText,
  joinButtonText,
  changeButtonText,
  scheduleButtonText,
}) => {
  return (
    <Box
      shadow={1}
      classes={["consultation-dashboard", classNames(classes)].join(" ")}
    >
      {providerName && consultationDate ? (
        <div className="consultation-dashboard__content">
          {isLive ? (
            <p className="small-text now-text">{liveText}</p>
          ) : (
            <p className="small-text">{consultationDate}</p>
          )}
          <div className="consultation-dashboard__content__provider-container">
            <img src={avatar} className="provider-image" />
            <p className="text">{providerName}</p>
          </div>
          {isLive ? (
            <Button
              label={joinButtonText}
              color="purple"
              size="sm"
              classes="consultation-dashboard__button"
            />
          ) : (
            <Button
              label={changeButtonText}
              type="secondary"
              size="sm"
              color="purple"
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
   * Provider name
   * */
  providerName: PropTypes.string,

  /**
   * ConsultationDashboard date
   * */
  consultationDate: PropTypes.string,

  /**
   * Is the consultation happening now
   **/
  isLive: PropTypes.bool,

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
