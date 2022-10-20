import React from "react";
import PropTypes from "prop-types";

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
  // TODO: Figure out a way to translate the days of the week
  // Idea: Create a reuseable hook that takes a string e.g. "mon" and returns the day translated
  const isToday = new Date().toDateString() === date.toDateString();
  const dayOfTheWeek = getDayOfTheWeek(date);

  return (
    <div
      className={[
        "single-day",
        numberOfConsultations === 0 && "single-day__no-consultations",
        isToday && "single-day__today",
      ].join(" ")}
    >
      <p
        className={["text", isToday ? "single-day__day-name--today" : ""].join(
          " "
        )}
      >{`${isToday ? "Today, " : ""}${dayOfTheWeek}`}</p>
      <h4 className={isToday ? "single-day__date--today" : ""}>
        {date.getDate()}
      </h4>
      <p
        className={[
          "small-text single-day__consultation-text",
          isToday ? "single-day__consultation-text--today" : "",
        ].join(" ")}
      >
        {numberOfConsultations} consultations
      </p>
    </div>
  );
};

SingleDay.propTypes = {
  /**
   * Date
   **/
  date: PropTypes.Date,

  /**
   * Number of consultations
   * */
  numberOfConsultations: PropTypes.number,
};

SingleDay.defaultProps = {
  date: new Date(),
  numberOfConsultations: 0,
};
