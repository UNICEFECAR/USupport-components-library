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
  liveText,
  joinButtonText,
  changeButtonText,
}) => {
  return (
    <Box classes={["consultation-big", classNames(classes)].join(" ")}>
      <div>
        {isLive ? (
          <p className="small-text consultation-big__now-text">{liveText}</p>
        ) : (
          <p className="small-text">{consultationDate}</p>
        )}
        <div className="consultation-big__specialist-container">
          <img src={avatar} alt={"Specialist"} />
          <p>{specialistName}</p>
        </div>
        {isLive ? (
          <Button
            label={joinButtonText}
            color="purple"
            classes={"consultation-big__button"}
          />
        ) : (
          <Button
            label={changeButtonText}
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
   * Is the consultation happening now
   **/
  isLive: PropTypes.bool,

  /**
   * Additional classes to be added to the CardConsultation
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Text(translated in the used language) to display when the consultation is live
   * */
  liveText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the consultation is live
   */
  joinButtonText: PropTypes.string,

  /**
   * Text(translated in the used language) to be displayed on the button when the user wants to change his consultation date/time?
   */
  changeButtonText: PropTypes.string,
};

ConsultationBig.defaultProps = {
  specialistName: "",
  consultationDate: "",
  isLive: false,
  classes: "",
  liveText: "Now",
  changeButtonText: "Change",
  joinButtonText: "Join now",
};
