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
  // TODO: Do we take the Day string from the props or we translate here
  const isToday = new Date().toDateString() === date.toDateString();

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
      >{`${isToday ? "Today, " : ""}${getDayOfTheWeek(date)}`}</p>
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
