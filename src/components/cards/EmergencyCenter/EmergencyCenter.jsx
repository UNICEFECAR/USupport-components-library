import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box";
import { NewButton } from "../../buttons";

import "./emergency-center.scss";

/**
 * EmergencyCenter
 *
 * EmergencyCenter Component
 *
 * @return {jsx}
 */
export const EmergencyCenter = ({
  title,
  text,
  link,
  phone,
  btnLabelLink,
  btnLabelCall,
  btnLabelCustom,
  onClick,
  image,
  showCustomButton,
}) => {
  const handleClick = (type) => {
    if (onClick) {
      onClick();
    }
    if (type === "phone") {
      window.open(`tel:${phone}`);
    } else if (type === "link") {
      window.open(link, "_blank", "noreferrer");
    }
  };

  return (
    <Box shadow={1} borderSize="xs" classes="emergency-center">
      {image && (
        <img className="emergency-center__image" src={image ? image : ""} />
      )}
      <p className="text emergency-center__heading-text">{title}</p>
      <p className="small-text emergency-center__description">{text}</p>
      <div className="emergency-center__btn-container">
        {phone ? (
          <NewButton
            size="sm"
            label={btnLabelCall}
            onClick={() => handleClick("phone")}
          />
        ) : null}
        {link ? (
          <NewButton
            size="sm"
            label={btnLabelLink}
            onClick={() => handleClick("link")}
          />
        ) : null}
        {showCustomButton && (
          <NewButton
            size="sm"
            label={btnLabelCustom}
            onClick={() => handleClick("custom")}
          />
        )}
      </div>
    </Box>
  );
};

EmergencyCenter.propTypes = {
  /**
   * Title of the emergency center
   * */
  title: PropTypes.string,

  /**
   * Text of the emergency center
   * */
  text: PropTypes.string,

  /**
   * Link of the emergency center
   */
  link: PropTypes.string,

  /**
   * Phone number of the emergency center
   */
  phone: PropTypes.string,

  /**
   * Label of the link button
   * */
  btnLabelLink: PropTypes.string,

  /**
   * Label of the phone button
   * */
  btnLabelCall: PropTypes.string,

  /**
   * Image of the emergency center
   * */
  image: PropTypes.string,
};

EmergencyCenter.defaultProps = {
  onClick: () => {},
};
