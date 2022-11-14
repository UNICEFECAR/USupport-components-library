import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon";
import { getDatesInRange, getStartAndEndOfWeek } from "../../../utils";

import "./header.scss";

/**
 * Header
 *
 * Calendar Header component
 *
 * @return {jsx}
 */
export const Header = ({ handleDayChange }) => {
  const [today, setToday] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(today);

  const [daysOfWeek, setDaysOfWeek] = useState([]);

  useEffect(() => {
    const { first, last } = getStartAndEndOfWeek(today);
    setDaysOfWeek(getDatesInRange(first, last));
  }, [today]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    handleDayChange(day);
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => {
      const isToday = day.toDateString() === selectedDay.toDateString();
      return (
        <div
          className={[
            "header__day-of-week",
            isToday ? "header__day-of-week--current" : "",
          ].join(" ")}
          key={index}
          onClick={() => handleSelectDay(day)}
        >
          <p className="text header__day-of-week__day-label">
            {weekDays[day.getDay()]}
          </p>
          <p className="small-text header__day-of-week__date">
            {day.getDate()}
          </p>
        </div>
      );
    });
  };

  const handleMonthChange = (direction) => {
    const newMonth = new Date(today);
    console.log(newMonth, "newMonth");
    newMonth.setMonth(newMonth.getMonth() + direction);
    newMonth.setDate(1);
    setToday(newMonth);
  };

  const handleWeekChange = (direction) => {
    const newWeek = new Date(today);
    newWeek.setDate(newWeek.getDate() + direction * 7);
    setToday(newWeek);
  };

  return (
    <div className="header">
      <div className="header__month-selector">
        <Icon
          onClick={() => handleMonthChange(-1)}
          size="md"
          name="arrow-chevron-back"
        />
        <p>{months[today.getMonth()]}</p>
        <Icon
          onClick={() => handleMonthChange(1)}
          size="md"
          name="arrow-chevron-forward"
        />
      </div>

      <div className="header__week-selector">
        <Icon
          onClick={() => handleWeekChange(-1)}
          size="md"
          name="arrow-chevron-back"
        />
        {renderDaysOfWeek()}
        <Icon
          onClick={() => handleWeekChange(1)}
          size="md"
          name="arrow-chevron-forward"
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  /**
   * Handle day change
   * */
  handleDayChange: PropTypes.func,
};

Header.defaultProps = {
  handleDayChange: () => {},
};
