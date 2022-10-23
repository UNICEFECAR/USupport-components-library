import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";
import classNames from "classnames";
import { getTimeFromDate, isDateToday, isDateYesterday } from "../../../utils";

import "./client-activity.scss";

/**
 * ClientActivity
 *
 * ClientActivity Component
 *
 * @return {jsx}
 */
export const ClientActivity = ({ iconName, text, date, classes }) => {
  const dateText = isDateToday(date)
    ? ""
    : isDateYesterday(date)
    ? "Yesterday"
    : date.toLocaleDateString();

  const hourText = getTimeFromDate(date);

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
