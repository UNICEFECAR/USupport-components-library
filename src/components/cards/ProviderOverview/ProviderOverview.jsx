import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import { getDayOfTheWeek } from "../../../utils";

import "./provider-overview.scss";

import { specialistPlaceholder } from "../../../assets";

/**
 * ProviderOverview
 *
 * PorviderOverview component
 *
 * @return {jsx}
 */
export const ProviderOverview = ({
  image,
  name,
  specialities,
  experience,
  date,
  onClick,
  yearsOfExperienceText,
}) => {
  // TODO: Figure out a way to translate the days of the week
  // Idea: Create a reuseable hook that takes a string e.g. "mon" and returns the day translated
  const dateText = date
    ? `${getDayOfTheWeek(date)}, ${date.getDate()}.${date.getMonth()}.`
    : "";

  const timeText = date
    ? `${date.getHours()}:00 - ${date.getHours() + 1}:00`
    : "";

  return (
    <Box onClick={onClick} shadow={2} classes={"provider-overview"}>
      <Avatar image={image} size="sm" />
      <div className="provider-overview__content">
        <div className="provider-overview__content__text-content">
          <p className="provider-overview__content__text-content__name">
            {name}
          </p>
          {date ? (
            <div className="provider-overview__content__text-content__date-container">
              <Icon name="calendar" size="sm" color="#66768D" />
              <div className="provider-overview__content__text-content__date-container__text">
                <p className="small-text">{dateText}</p>
                <p className="small-text">{timeText}</p>
              </div>
            </div>
          ) : (
            <>
              <p className="small-text provider-overview__specialities">
                {specialities}
              </p>
              <p className="small-text">
                {`${experience} ${yearsOfExperienceText}`}
              </p>
            </>
          )}
        </div>
        <div>
          <Icon name="arrow-chevron-forward" size="md" color="#20809E" />
        </div>
      </div>
    </Box>
  );
};

ProviderOverview.propTypes = {
  /**
   * Image url
   */
  image: PropTypes.string,

  /**
   * Name of the specialist
   * */
  name: PropTypes.string,

  /**
   * Specialities of the specialist
   * */
  specialities: PropTypes.string,

  /**
   * Experience of the specialist
   * */
  experience: PropTypes.number,

  /**
   * Date of the consultation
   * */
  date: PropTypes.Date,

  /**
   * On click handler
   * */
  onClick: PropTypes.func,

  /**
   * Text(translated in the used language) showing the years of experience of the provider
   * */
  yearsOfExperienceText: PropTypes.string,
};

ProviderOverview.defaultProps = {
  image: specialistPlaceholder,
  onClick: () => {},
  yearsOfExperienceText: "years experience Overall",
};
