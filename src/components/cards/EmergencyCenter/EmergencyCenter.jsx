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
export const EmergencyCenter = ({ title, text, btnLabel, onClick }) => {
  return (
    <Box shadow={1} classes="emergency-center">
      <p className="emergency-center__heading-text">{title}</p>
      <p className="small-text emergency-center__text">{text}</p>
      <div className="emergency-center__btn-container">
        <Button color="purple" size="sm" label={btnLabel} onClick={onClick} />
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
   * Label of the button
   * */
  btnLabel: PropTypes.string,

  /**
   * Function to be called when the button is clicked
   * */
  onClick: PropTypes.func,
};

EmergencyCenter.defaultProps = {
  onClick: () => {},
};
