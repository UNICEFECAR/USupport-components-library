import React from "react";
import PropTypes from "prop-types";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { getDateView } from "../../../utils";

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
  const { width } = useWindowDimensions();
  const isToday = new Date().toDateString() === date.toDateString();

  const dateAsString = getDateView(date).slice(0, 5);

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
              {!isAvailable && numberOfConsultations === 0
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
