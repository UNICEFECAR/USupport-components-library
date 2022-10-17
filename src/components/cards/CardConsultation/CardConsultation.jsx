import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../buttons/Button/Button";
import { Box } from "../../boxes/Box/Box";
import classNames from "classnames";

import "./card-consultation.scss";
import avatar from "../../../assets/SpecialistPlaceholderImage.png";

/**
 * CardConsultation
 *
 * CardConsultation component
 *
 * @return {jsx}
 */
export const CardConsultation = ({
  specialistName,
  consultationDate,
  isLive,
  classes,
}) => {
  return (
    <Box
      shadow={1}
      classes={["consultation-card", classNames(classes)].join(" ")}
    >
      {specialistName && consultationDate ? (
        <>
          {isLive ? (
            <p className="small-text now-text">Now</p>
          ) : (
            <p className="small-text">{consultationDate}</p>
          )}
          <div className="specialist-container">
            <img src={avatar} className="specialist-image" />
            <p className="text" classes="specialist-name">
              {specialistName}
            </p>
          </div>
          {isLive ? (
            <Button
              label="Join"
              color="purple"
              classes="consultation-card__button"
            />
          ) : (
            <Button
              label="Change"
              type="secondary"
              color="purple"
              classes="consultation-card__button"
            />
          )}
        </>
      ) : (
        <>
          <p className="small-text no-booking-text">
            Currently you do not have upcoming consultations
          </p>
          <Button
            label="Schedule"
            color="purple"
            classes="consultation-card__button"
          />
        </>
      )}
    </Box>
  );
};

CardConsultation.propTypes = {
  /**
   * Specialist name
   * */
  specialistName: PropTypes.string,

  /**
   * Consultation date
   * */
  consultationDate: PropTypes.string,

  /**
   * Is live
   **/
  isLive: PropTypes.bool,

  /**
   * Additional classes to be added to the CardConsultation
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CardConsultation.defaultProps = {
  specialistName: "",
  consultationDate: "",
  isLive: false,
};
