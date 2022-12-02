import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { Button } from "../../buttons/Button/Button";
import classNames from "classnames";
import {
  checkIsFiveMinutesBefore,
  getDateView,
  getMonthName,
} from "../../../utils";

import "./consultation-big.scss";

import mascot from "../../../assets/mascot-happy-blue.png";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;
// const AMAZON_S3_BUCKET = `https://usupport-staging.s3.eu-central-1.amazonaws.com`;

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
  handleJoin,
  handleChange,
  handleAcceptSuggestion,
  t,
}) => {
  const { providerName, timestamp, image, status } = consultation;
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
    <Box classes={["consultation-big", classNames(classes)].join(" ")}>
      <div>
        {isLive ? (
          <p className="small-text consultation-big__now-text">
            {t("live_text")}
          </p>
        ) : (
          <p className="small-text">
            {dateText}, {timeText}
          </p>
        )}
        <div className="consultation-big__provider-container">
          <img src={imageUrl} alt={"provider"} />
          <p className="text">{providerName}</p>
        </div>
        {status === "suggested" ? (
          <Button
            type="primary"
            size="sm"
            onClick={() => handleAcceptSuggestion(consultation.consultationId)}
            label={t("accept_button_label")}
            classes="consultation-big__button"
          />
        ) : isLive ? (
          <Button
            label={t("join_button_label")}
            color="purple"
            classes="consultation-big__button"
            onClick={() => handleJoin(consultation.consultationId)}
          />
        ) : (
          <Button
            label={t("change_button_label")}
            type="secondary"
            color="purple"
            classes="consultation-big__button"
            onClick={() => handleChange(consultation)}
          />
        )}
      </div>
      <img src={mascot} className="consultation-big__mascot" />
    </Box>
  );
};

ConsultationBig.propTypes = {
  /**
   * Additional classes to be added to the CardConsultation
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ConsultationBig.defaultProps = {
  isLive: false,
  classes: "",
  handleJoin: () => {},
  handleChange: () => {},
};
