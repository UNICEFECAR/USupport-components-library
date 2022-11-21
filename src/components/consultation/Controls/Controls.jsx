import React, { useState } from "react";
import PropTypes from "prop-types";
import { ConsultationInformation } from "../../cards/ConsultationInformation/ConsultationInformation";
import { Box } from "../../boxes/Box/Box";
import { Icon } from "../../icons/Icon";

import "./controls.scss";

/**
 * Controls
 *
 * Control component
 *
 * @return {jsx}
 */
export const Controls = ({
  startDate,
  endDate,
  providerName,
  providerImage,
}) => {
  const [isMicOpen, setIsMicOpen] = useState(true);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleMicClick = () => {
    setIsMicOpen(!isMicOpen);
  };

  const handleCameraClick = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  const handleChat = () => {
    console.log("Chat");
  };

  const handleHangUp = () => {
    console.log("Hang up");
  };

  const renderAllButtons = () => {
    return (
      <div className="button-container">
        <div className="button-container__button" onClick={handleCameraClick}>
          <Icon
            name={isCameraOpen ? "stop-camera" : "video"}
            size="lg"
            color="#20809E"
          />
        </div>
        <div className="button-container__button" onClick={handleMicClick}>
          <Icon
            name={isMicOpen ? "stop-mic" : "microphone"}
            size="lg"
            color="#20809E"
          />
        </div>
        <div className="button-container__button" onClick={handleChat}>
          <Icon name={"comment"} size="lg" color="#20809E" />
        </div>
        <div className="button-container__button-hangup" onClick={handleHangUp}>
          <Icon name={"hangup"} size="lg" color="#ffffff" />
        </div>
      </div>
    );
  };

  return (
    <Box classes="controls">
      <ConsultationInformation
        startDate={startDate}
        endDate={endDate}
        providerName={providerName}
        providerImage={providerImage}
      />
      {renderAllButtons()}
    </Box>
  );
};

Controls.propTypes = {
  // Add propTypes here
};

Controls.defaultProps = {
  // Add defaultProps here
};
