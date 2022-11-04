import React from "react";
import PropTypes from "prop-types";
import { getDayOfTheWeek, isDateBetweenTwoDates } from "../../../utils";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import classNames from "classnames";

import "./consultation-information.scss";

import { specialistPlaceholder } from "../../../assets";
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
  classes,
}) => {
  const dateText = startDate
    ? `${getDayOfTheWeek(startDate)}, ${
        startDate.getDate() < 10
          ? `0${startDate.getDate()}`
          : startDate.getDate()
      }.${
        startDate.getMonth() < 10
          ? `0${startDate.getMonth()}`
          : startDate.getMonth()
      }`
    : "";

  const timeText = startDate
    ? `${startDate.getHours()}:00 - ${endDate.getHours()}:00`
    : "";

  return (
    <div
      className={["consultation-information", classNames(classes)].join(" ")}
    >
      <Avatar src={providerImage} size="md" />
      <div className="consultation-information__content">
        <p className="text">{providerName}</p>
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
