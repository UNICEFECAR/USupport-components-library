import React, { useState } from "react";
import { ConsultationInformation } from "../../cards/ConsultationInformation/ConsultationInformation";
import { Box } from "../../boxes/Box/Box";
import { Icon } from "../../icons/Icon";
import { ONE_HOUR } from "../../../utils";

import "./controls.scss";

/**
 * Controls
 *
 * Control component
 *
 * @return {jsx}
 */
export const Controls = ({
  consultation,
  toggleCamera,
  toggleMicrophone,
  toggleChat,
  leaveConsultation,
  isCameraOn,
  isMicrophoneOn,
  t,
}) => {
  const [isMicOpen, setIsMicOpen] = useState(isMicrophoneOn);
  const [isCameraOpen, setIsCameraOpen] = useState(isCameraOn);

  const startDate = new Date(consultation.timestamp);
  const endDate = new Date(consultation.timestamp + ONE_HOUR);

  const handleMicClick = () => {
    setIsMicOpen(!isMicOpen);
    toggleMicrophone();
  };

  const handleCameraClick = () => {
    setIsCameraOpen(!isCameraOpen);
    toggleCamera();
  };

  const handleChat = () => {
    toggleChat();
  };

  const handleHangUp = () => {
    leaveConsultation();
  };

  const renderAllButtons = () => {
    return (
      <div className="button-container">
        <div className="button-container__button" onClick={handleCameraClick}>
          <Icon
            name={!isCameraOpen ? "stop-camera" : "video"}
            size="lg"
            color="#20809E"
            onClick={toggleCamera}
          />
        </div>
        <div className="button-container__button" onClick={handleMicClick}>
          <Icon
            name={!isMicOpen ? "stop-mic" : "microphone"}
            size="lg"
            color="#20809E"
            onClick={toggleMicrophone}
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
        providerName={consultation.providerName}
        providerImage={consultation.image}
        t={t}
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
  leaveConsultation: () => {},
};
