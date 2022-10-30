import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";
import classNames from "classnames";
import { getTimeFromDate, isDateToday, isDateYesterday } from "../../../utils";

import "./notification.scss";

/**
 * Notification
 *
 * Notification component
 *
 * @return {jsx}
 */
export const Notification = ({
  icon,
  title,
  text,
  isRead,
  date,
  children,
  classes,
}) => {
  const dateText = isDateToday(date)
    ? ""
    : isDateYesterday(date)
    ? "Yesterday"
    : date.toLocaleDateString();

  const hourText = getTimeFromDate(date);

  return (
    <div
      className={[
        "notification",
        isRead ? "" : "notification-new",
        classNames(classes),
      ].join(" ")}
    >
      <div className="notification__content">
        <div className="notification__content__icon">
          <Icon name={icon} color="#9749FA" size="md" />
        </div>
        <div className="notification__content__information-container">
          <div className="notification__content__information-container__heading">
            <div className="notification__content__information-container__heading-name">
              <p className="small-text">{title}</p>
              {isRead ? null : <div />}
            </div>
            <p className="small-text">
              {dateText} {hourText}
            </p>
          </div>
          <p className="small-text notification__content__description">
            {text}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

Notification.propTypes = {
  /**
   * Icon name
   */
  icon: PropTypes.string,

  /**
   * Title
   * */
  title: PropTypes.string,

  /**
   *  Text
   **/
  text: PropTypes.string,

  /**
   * Read status
   * */
  isRead: PropTypes.bool,

  /**
   * Date
   * */
  date: PropTypes.instanceOf(Date),

  /**
   * Additional classes
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Notification.defaultProps = {
  isRead: false,
  date: new Date(),
};
