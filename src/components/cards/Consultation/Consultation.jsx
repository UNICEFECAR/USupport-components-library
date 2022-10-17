import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../buttons/Button/Button";
import { Box } from "../../boxes/Box/Box";
import classNames from "classnames";

import "./consultation.scss";

import avatar from "../../../assets/SpecialistPlaceholderImage.png";

/**
 * Consultation
 *
 * Consultation component
 *
 * @return {jsx}
 */
export const Consultation = ({
  specialistName,
  consultationDate,
  isLive,
  classes,
}) => {
  return (
    <Box shadow={1} classes={["consultation", classNames(classes)].join(" ")}>
      {specialistName && consultationDate ? (
        <div className="consultation__content">
          {isLive ? (
            <p className="small-text now-text">Now</p>
          ) : (
            <p className="small-text">{consultationDate}</p>
          )}
          <div className="consultation__content__specialist-container">
            <img src={avatar} className="specialist-image" />
            <p className="text">{specialistName}</p>
          </div>
          {isLive ? (
            <Button
              label="Join"
              color="purple"
              size="sm"
              classes="consultation__button"
            />
          ) : (
            <Button label="Change" type="secondary" size="sm" color="purple" />
          )}
        </div>
      ) : (
        <div className="consultation__no-consultation">
          <p className="small-text no-booking-text">
            Currently you do not have upcoming consultations
          </p>
          <Button size="sm" label="Schedule" color="purple" />
        </div>
      )}
    </Box>
  );
};

Consultation.propTypes = {
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
   * Additional classes to be added to the Consultation
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Consultation.defaultProps = {
  specialistName: "",
  consultationDate: "",
  isLive: false,
};
