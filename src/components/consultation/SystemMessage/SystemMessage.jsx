import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";

import "./system-message.scss";
import { getDateAsString, getTimeAsString } from "../../../utils/date";

/**
 * SystemMessage
 *
 * SystemMessage component
 *
 * @return {jsx}
 */
export const SystemMessage = ({ iconName, title, date }) => {
  return (
    <div className="system-message">
      <Icon name={iconName} size="md" color="#20809E" />
      <div className="system-message__text-container">
        <p className="small-text system-message__text-container__title">
          {title}
        </p>
        <p className="small-text">{getTimeAsString(date)}</p>
        <p className="small-text">{getDateAsString(date)}</p>
      </div>
    </div>
  );
};

SystemMessage.propTypes = {
  /**
   * Icon name
   * @default "consultation"
   */
  iconName: PropTypes.string,

  /**
   * Title
   */
  title: PropTypes.string,

  /**
   * Date of the message
   */
  date: PropTypes.instanceOf(Date),
};

SystemMessage.defaultProps = {
  iconName: "consultation",
};
