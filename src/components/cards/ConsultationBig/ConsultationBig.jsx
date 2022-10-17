import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { Button } from "../../buttons/Button/Button";
import classNames from "classnames";

import "./consultation-big.scss";

import avatar from "../../../assets/SpecialistPlaceholderImage.png";
import mascot from "../../../assets/MascotHandsUp.png";

/**
 * CardConsultationBig
 *
 * CardConsultationBig component
 *
 * @return {jsx}
 */
export const ConsultationBig = ({
  specialistName,
  consultationDate,
  isLive,
  classes,
}) => {
  return (
    <Box classes={["consultation-big", classNames(classes)].join(" ")}>
      <div>
        {isLive ? (
          <p className="small-text now-text">Now</p>
        ) : (
          <p className="small-text">{consultationDate}</p>
        )}
        <div className="consultation-big__specialist-container">
          <img src={avatar} alt={"Specialist"} />
          <p>{specialistName}</p>
        </div>
        {isLive ? (
          <Button
            label="Join now"
            color="purple"
            classes={"consultation-big__button"}
          />
        ) : (
          <Button
            label="Change"
            type="secondary"
            color="purple"
            classes={"consultation-big__button"}
          />
        )}
      </div>
      <img src={mascot} className="consultation-big__mascot" />
    </Box>
  );
};

ConsultationBig.propTypes = {
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

ConsultationBig.defaultProps = {
  specialistName: "",
  consultationDate: "",
  isLive: false,
  classes: "",
};
