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
  handleSendMessage,
  isCameraOn,
  isMicrophoneOn,
  renderIn, // "client" or "provider"
  isRoomConnecting,
  hasUnreadMessages = true,
  isInSession,
  t,
}) => {
  const [isMicOpen, setIsMicOpen] = useState(isMicrophoneOn);
  const [isCameraOpen, setIsCameraOpen] = useState(isCameraOn);

  const timestamp =
    consultation.timestamp || new Date(consultation.time).getTime();

  const startDate = new Date(timestamp);
  const endDate = new Date(timestamp + ONE_HOUR);

  const handleMicClick = () => {
    if (isRoomConnecting) return;

    const content = isMicOpen
      ? `${renderIn}_microphone_off`
      : `${renderIn}_microphone_on`;
    handleSendMessage(content, "system");

    setIsMicOpen(!isMicOpen);
    toggleMicrophone();
  };

  const handleCameraClick = () => {
    if (isRoomConnecting) return;

    const content = isCameraOpen
      ? `${renderIn}_camera_off`
      : `${renderIn}_camera_on`;
    handleSendMessage(content, "system");

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
          />
        </div>
        <div className="button-container__button" onClick={handleMicClick}>
          <Icon
            name={!isMicOpen ? "stop-mic" : "microphone"}
            size="lg"
            color="#20809E"
          />
        </div>
        <div className="button-container__button" onClick={handleChat}>
          {hasUnreadMessages && (
            <div className="button-container__unread-message" />
          )}
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
        providerName={consultation.clientName || consultation.providerName}
        providerImage={consultation.image}
        isInSession={isInSession}
        showActivityIndicator
        t={t}
      />
      {consultation.sponsorName && (
        <p className="text controls__sponsored-by">
          {t("sponsored_by")}
          <span>
            <strong>{consultation.sponsorName}</strong>
          </span>
        </p>
      )}
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
