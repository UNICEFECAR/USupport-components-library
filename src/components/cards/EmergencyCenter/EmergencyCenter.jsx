import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box";
import { Button } from "../../buttons/Button/Button";

import "./emergency-center.scss";

/**
 * EmergencyCenter
 *
 * EmergencyCenter Component
 *
 * @return {jsx}
 */
export const EmergencyCenter = ({ title, text, link, phone, btnLabel }) => {
  const handleCall = () => {
    if (phone) {
      window.open(`tel:${phone}`);
    } else if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <Box shadow={1} borderSize="xs" classes="emergency-center">
      <p className="text emergency-center__heading-text">{title}</p>
      <p className="small-text emergency-center__description">{text}</p>
      <div className="emergency-center__btn-container">
        <Button
          color="purple"
          size="sm"
          label={btnLabel}
          onClick={handleCall}
        />
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
   * Label of the button
   * */
  btnLabel: PropTypes.string,
};

EmergencyCenter.defaultProps = {
  onClick: () => {},
};
