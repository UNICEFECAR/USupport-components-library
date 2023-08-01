import React from "react";
import PropTypes from "prop-types";
import { getDayOfTheWeek, getDateView } from "../../../utils";
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
  showActivityIndicator = false,
  classes,
  t,
}) => {
  const dayOfWeek = t(getDayOfTheWeek(startDate));
  const dateText = `${dayOfWeek} ${getDateView(startDate).slice(0, 5)}`;

  const startHour = startDate.getHours();
  const endHour = endDate.getHours();
  const timeText = startDate
    ? `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${
        endHour < 10 ? `0${endHour}` : endHour
      }:00`
    : "";

  return (
    <div
      className={["consultation-information", classNames(classes)].join(" ")}
    >
      <Avatar
        image={AMAZON_S3_BUCKET + "/" + (providerImage || "default")}
        size="sm"
      />
      <div className="consultation-information__content">
        <div className="consultation-information__content__details">
          <p className="text consultation-information__content__details__name">
            {providerName}
          </p>
          {showActivityIndicator ? (
            <div
              className={`consultation-information__content__details__status ${
                isInSession
                  ? "consultation-information__content__details__status--active"
                  : ""
              }`}
            />
          ) : null}
        </div>
        <div className="consultation-information__content__date-item">
          <Icon name="calendar" size="sm" color={"#66768D"} />
          <div className="consultation-information__content__date-item__text-container">
            <p className="small-text">{dateText}</p>
            <p className="small-text">{timeText}</p>
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
