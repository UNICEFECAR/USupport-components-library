import React from "react";
import PropTypes from "prop-types";
import useWindowDimensions from "../../../utils/useWindowDimensions";

import "./single-day.scss";

/**
 * SingleDay
 *
 * SingleDay Calendar component
 *
 * @return {jsx}
 */
export const SingleDay = ({
  date,
  numberOfConsultations,
  isAvailable,
  handleClick,
  todayLabel,
  consultationsLabel,
  unavailableLabel,
}) => {
  // TODO: Figure out a way to translate the days of the week
  // Idea: Create a reuseable hook that takes a string e.g. "mon" and returns the day translated
  const { width } = useWindowDimensions();
  const isToday = new Date().toDateString() === date.toDateString();

  const dateAsString = `${
    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  }.${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + date.getMonth() + 1
  }`;

  return (
    <div
      className={[
        "single-day",
        numberOfConsultations === 0 && "single-day-no-consultations",
        isToday && "single-day-today",
        !isAvailable && "single-day-unavailable",
      ].join(" ")}
      onClick={handleClick}
    >
      {width < 768 ? (
        <>
          <p
            className={[
              "small-text",
              "single-day__date-text",
              isToday && "today-text",
            ].join(" ")}
          >
            {isToday ? todayLabel : dateAsString}
          </p>
          <p className="small-text single-day__consultation-text">
            {numberOfConsultations}
          </p>
        </>
      ) : (
        <>
          <p className="small-text today-text">{isToday ? "Today" : ""}</p>
          <h4>{dateAsString}</h4>
          <div className="single-day__consultation-container">
            <p className="small-text consultation-text">
              {!isAvailable
                ? unavailableLabel
                : numberOfConsultations + "\n" + consultationsLabel}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

SingleDay.propTypes = {
  /**
   * Date
   **/
  date: PropTypes.instanceOf(Date),

  /**
   * Number of consultations
   * */
  numberOfConsultations: PropTypes.number,

  /**
   * Is available
   * @default true
   * */
  isAvailable: PropTypes.bool,

  /**
   * Handle click
   * */
  handleClick: PropTypes.func,

  /**
   * Today label
   */
  todayLabel: PropTypes.string,

  /**
   * Consultations label
   * */
  consultationsLabel: PropTypes.string,

  /**
   * Unavailable label
   * */
  unavailableLabel: PropTypes.string,
};

SingleDay.defaultProps = {
  date: new Date(),
  numberOfConsultations: 0,
  isAvailable: true,
  handleClick: () => {},
  todayLabel: "Today",
  consultationsLabel: "Consultations",
  unavailableLabel: "You are unavailable",
};
