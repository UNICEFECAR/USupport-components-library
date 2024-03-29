import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Icon } from "../../icons/Icon/Icon";
import { ThemeContext, getDateView, getTimeAsString } from "../../../utils";

import "./system-message.scss";

/**
 * SystemMessage
 *
 * SystemMessage component
 *
 * @return {jsx}
 */
export const SystemMessage = ({ iconName, title, date, showDate }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <React.Fragment>
      {showDate && (
        <div
          className={[
            "message-date",
            theme === "dark" && "message-date--dark",
          ].join(" ")}
        >
          <p className="small-text">
            <strong>{getDateView(date)}</strong>
          </p>
        </div>
      )}
      <div className="system-message">
        <div>
          <Icon name={iconName} size="md" color="#20809E" />
        </div>
        <div className="system-message__text-container">
          <p className="small-text system-message__text-container__title">
            {title}
          </p>
        </div>
        <p className="system-message__time small-text">
          {getTimeAsString(date)}
        </p>
      </div>
    </React.Fragment>
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

  /**
   * Wheter to show the date
   * */
  showDate: PropTypes.bool,
};

SystemMessage.defaultProps = {
  iconName: "consultation",
};
