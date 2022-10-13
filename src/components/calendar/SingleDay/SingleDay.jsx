import React from "react";
import PropTypes, { number } from "prop-types";

import "./single-day.scss";
import { getDayOfTheWeek } from "../../../utils";

/**
 * SingleDay
 *
 * SingleDay Calendar component
 *
 * @return {jsx}
 */
export const SingleDay = ({ date, numberOfConsultations }) => {
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div
      className={[
        "single-day",
        numberOfConsultations === 0 && "single-day__no-consultations",
        isToday && "single-day__today",
      ].join(" ")}
    >
      <p className="text">{`${isToday ? "Today, " : ""}${getDayOfTheWeek(
        date
      )}`}</p>
      <h4>{date.getDate()}</h4>
      <p className="small-text single-day__consultation-text">
        {numberOfConsultations} consultations
      </p>
    </div>
  );
};

SingleDay.propTypes = {
  /**
   * Date
   **/
  date: PropTypes.string,

  /**
   * Number of consultations
   * */
  numberOfConsultations: PropTypes.number,
};

SingleDay.defaultProps = {
  date: "",
  numberOfConsultations: 0,
};
