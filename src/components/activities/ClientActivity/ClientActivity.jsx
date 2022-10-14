import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";
import classNames from "classnames";

import "./client-activity.scss";

/**
 * ClientActivity
 *
 * ClientActivity Component
 *
 * @return {jsx}
 */
export const ClientActivity = ({ iconName, text, date, classes }) => {
  // TODO: Move this function inside date.js util
  const checkIfDateIsYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return yesterday.toDateString() === date.toDateString();
  };

  const dateText =
    new Date().toDateString() === date.toDateString()
      ? ""
      : checkIfDateIsYesterday(date)
      ? "Yesterday"
      : date.toLocaleDateString();

  // TODO: Move this function inside date.js util
  const hourText = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={["client-activity", classNames(classes)].join(" ")}>
      <div className="client-activity__content">
        <div className="client-activity__content__icon">
          <Icon name={iconName} size="md" />
        </div>
        <p className="text">{text}</p>
      </div>
      <p className="small-text client-activity__time-text">
        {dateText} {hourText}
      </p>
    </div>
  );
};

ClientActivity.propTypes = {
  /**
   * Icon name
   * @default: "consultation"
   */
  iconName: PropTypes.string,

  /**
   * Text
   */
  text: PropTypes.string,

  /**
   * Date
   * @default: new Date()
   * @type: Date
   */
  date: PropTypes.instanceOf(Date),
};

ClientActivity.defaultProps = {
  iconName: "consultation",
  text: "",
  date: new Date(),
};
