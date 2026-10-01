import React from "react";
import PropTypes from "prop-types";
import { getDayOfTheWeek, getDateView, getTimeAsString } from "../../../utils";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import classNames from "classnames";

import "./consultation-information.scss";

import { specialistPlaceholder } from "../../../assets";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * ConsultationInformation
 *
 * ConsultationInformation
 *
 * @return {jsx}
 */
export const ConsultationInformation = ({
  startDate,
  endDate,
  providerName,
  providerImage,
  isInSession,
  connectionQuality = "good",
  showActivityIndicator = false,
  classes,
  t,
}) => {
  const dayOfWeek = t(getDayOfTheWeek(startDate));
  const dateText = `${dayOfWeek} ${getDateView(startDate).slice(0, 5)}`;

  const timeText =
    startDate && endDate
      ? `${getTimeAsString(startDate)} - ${getTimeAsString(endDate)}`
      : "";

  const dateTimeText =
    dateText && timeText ? `${dateText} · ${timeText}` : dateText || timeText;

  // A dropped connection (on either side) means the other participant is not reachable,
  // even if they are still listed in the session
  const isConnected = isInSession && connectionQuality !== "lost";
  let statusModifier = "";
  if (isConnected) {
    statusModifier =
      connectionQuality === "poor"
        ? "consultation-information__content__details__status--poor"
        : "consultation-information__content__details__status--active";
  }

  return (
    <div
      className={["consultation-information", classNames(classes)].join(" ")}
    >
      <Avatar
        image={AMAZON_S3_BUCKET + "/" + (providerImage || "default")}
        hasBorder
      />
      <div className="consultation-information__content">
        <div className="consultation-information__content__details">
          <p className="consultation-information__content__details__name">
            {providerName}
          </p>
          {showActivityIndicator ? (
            <div
              className={`consultation-information__content__details__status ${statusModifier}`}
            >
              <Icon size="sm" name={isConnected ? "wifi-on" : "wifi-off"} />
            </div>
          ) : null}
        </div>
        <div className="consultation-information__content__date-item">
          <Icon name="calendar" size="md" color={"#66768D"} />
          <div className="consultation-information__content__date-item__text-container">
            <p className="text">{dateTimeText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ConsultationInformation.propTypes = {
  /**
   * Start date of the consultation
   */
  startDate: PropTypes.instanceOf(Date),

  /**
   * End date of the consultation
   * */
  endDate: PropTypes.instanceOf(Date),

  /**
   * Name of the provider
   * */
  providerName: PropTypes.string,

  /**
   * Additional classes
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ConsultationInformation.defaultProps = {
  providerImage: specialistPlaceholder,
};
