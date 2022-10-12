import React from "react";
import PropTypes, { number } from "prop-types";

import "./single-day.scss";

/**
 * SingleDay
 *
 * SingleDay Calendar component
 *
 * @return {jsx}
 */
export const SingleDay = ({ date, numberOfConsultations }) => {
  const isToday = false;

  //TODO: Refactor to use real date

  return (
    <div
      className={[
        "single-day",
        numberOfConsultations === 0 && "single-day__no-consultations",
        isToday && "single-day__today",
      ].join(" ")}
    >
      <p className="text"> Mon</p>
      <h4>25</h4>
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
