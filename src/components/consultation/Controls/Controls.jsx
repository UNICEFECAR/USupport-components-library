import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon";
import { getConsultationEndDate, getTimeAsString } from "../../../utils";

import "./controls.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

const TIME_LEFT_REFRESH_INTERVAL = 30000;

// The device lists of the settings menu, with the Jitsi API method that switches each of them
const DEVICE_KINDS = [
  { kind: "videoInput", labelKey: "controls_camera", setter: "setVideoInputDevice" },
  { kind: "audioInput", labelKey: "controls_microphone", setter: "setAudioInputDevice" },
  { kind: "audioOutput", labelKey: "controls_speaker", setter: "setAudioOutputDevice" },
];

/**
 * The connection chip next to the other participant's name. A healthy call shows only the icon,
 * anything else is spelled out
 */
const getCallStatus = (isInSession, connectionQuality) => {
  if (!isInSession) return { modifier: "lost", labelKey: "call_status_waiting" };
  if (connectionQuality === "lost") {
    return { modifier: "lost", labelKey: "call_status_disconnected" };
  }
  if (connectionQuality === "poor") {
    return { modifier: "poor", labelKey: "call_status_weak" };
  }
  return { modifier: "good", labelKey: null };
};

/**
 * Controls
 *
 * The consultation controls over the video: the other participant's details at the top
 * and the call buttons centered at the bottom of the video
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
  connectionQuality = "good", // "good" | "poor" | "lost"
  isHidden = false,
  // Returns the Jitsi external API, used for the device settings
  getJitsiApi,
  // The side chat covers the right part of the screen, so the buttons are centered on the rest
  isSideChatOpen = false,
  t,
}) => {
  const timestamp =
    consultation.timestamp || new Date(consultation.time).getTime();
  const startDate = new Date(timestamp);
  const endDate = getConsultationEndDate(
    timestamp,
    consultation.durationMinutes
  );

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(
      () => setNow(Date.now()),
      TIME_LEFT_REFRESH_INTERVAL
    );
    return () => clearInterval(interval);
  }, []);

  // The time left is shown only while the consultation is running
  const minutesLeft =
    now >= startDate.getTime() && now < endDate.getTime()
      ? Math.ceil((endDate.getTime() - now) / (60 * 1000))
      : null;
  const timeRange = `${getTimeAsString(startDate)} - ${getTimeAsString(endDate)}`;
  const timeText =
    minutesLeft !== null
      ? `${timeRange} · ${t("minutes_left", { minutes: minutesLeft })}`
      : timeRange;

  const callStatus = getCallStatus(isInSession, connectionQuality);

  const handleMicClick = () => {
    if (isRoomConnecting) return;
    handleSendMessage(
      `${renderIn}_microphone_${isMicrophoneOn ? "off" : "on"}`,
      "system"
    );
    toggleMicrophone();
  };

  const handleCameraClick = () => {
    if (isRoomConnecting) return;
    handleSendMessage(
      `${renderIn}_camera_${isCameraOn ? "off" : "on"}`,
      "system"
    );
    toggleCamera();
  };

  // Device settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [devices, setDevices] = useState(null);
  const [currentDevices, setCurrentDevices] = useState(null);
  const settingsRef = useRef();

  const loadDevices = async () => {
    const api = getJitsiApi?.();
    if (!api) return;
    try {
      const [available, current] = await Promise.all([
        api.getAvailableDevices(),
        api.getCurrentDevices(),
      ]);
      setDevices(available);
      setCurrentDevices(current);
    } catch (err) {
      console.error("Failed to load the devices", err);
    }
  };

  const toggleSettings = () => {
    if (!isSettingsOpen) loadDevices();
    setIsSettingsOpen(!isSettingsOpen);
  };

  useEffect(() => {
    if (!isSettingsOpen) return;
    const handleClickOutside = (e) => {
      if (!settingsRef.current?.contains(e.target)) setIsSettingsOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsSettingsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSettingsOpen]);

  const handleDeviceChange = async ({ kind, setter }, deviceId) => {
    const api = getJitsiApi?.();
    const device = devices?.[kind]?.find((x) => x.deviceId === deviceId);
    if (!api || !device) return;
    try {
      await api[setter](device.label, device.deviceId);
    } catch (err) {
      console.error("Failed to change the device", err);
    }
    loadDevices();
  };

  const openBackgroundSettings = () => {
    getJitsiApi?.()?.executeCommand("toggleVirtualBackgroundDialog");
    setIsSettingsOpen(false);
  };

  // Hidden while the chat covers the video on narrow screens, they come back when it's closed
  if (isHidden) return null;

  return (
    <div className="controls">
      <div className="controls__info">
        <Avatar
          image={`${AMAZON_S3_BUCKET}/${consultation.image || "default"}`}
          size="sm"
          classes="controls__avatar"
        />
        <div className="controls__details">
          <p className="controls__name">
            {consultation.clientName || consultation.providerName}
          </p>
          <p className="small-text controls__time">{timeText}</p>
          {consultation.sponsorName && (
            <p className="small-text controls__time">
              {t("sponsored_by")} <strong>{consultation.sponsorName}</strong>
            </p>
          )}
        </div>
        <div
          className={`controls__status controls__status--${callStatus.modifier}`}
        >
          {/* Both icons are rendered from the start and only the inactive one is hidden: the switch to
              "wifi-off" happens when the connection is lost, when the sprite could not be loaded anymore */}
          <Icon
            size="sm"
            name="wifi-on"
            color="#ffffff"
            style={{ display: callStatus.labelKey ? "none" : undefined }}
          />
          <Icon
            size="sm"
            name="wifi-off"
            color="#ffffff"
            style={{ display: callStatus.labelKey ? undefined : "none" }}
          />
          {callStatus.labelKey && (
            <span className="small-text controls__status-text">
              {t(callStatus.labelKey)}
            </span>
          )}
        </div>
      </div>

      <div
        className={`controls__dock-area ${
          isSideChatOpen ? "controls__dock-area--side-chat" : ""
        }`}
      >
        <div className="controls__dock">
          <button
            type="button"
            className={`controls__button ${
              !isCameraOn ? "controls__button--off" : ""
            }`}
            onClick={handleCameraClick}
            aria-label={t("controls_camera")}
            title={t("controls_camera")}
          >
            <Icon
              name={isCameraOn ? "video" : "stop-camera"}
              size="md"
              color={isCameraOn ? "#ffffff" : "#373737"}
            />
          </button>
          <button
            type="button"
            className={`controls__button ${
              !isMicrophoneOn ? "controls__button--off" : ""
            }`}
            onClick={handleMicClick}
            aria-label={t("controls_microphone")}
            title={t("controls_microphone")}
          >
            <Icon
              name={isMicrophoneOn ? "microphone" : "stop-mic"}
              size="md"
              color={isMicrophoneOn ? "#ffffff" : "#373737"}
            />
          </button>
          <button
            type="button"
            className="controls__button"
            onClick={toggleChat}
            aria-label={t("controls_chat")}
            title={t("controls_chat")}
          >
            <Icon name="comment" size="md" color="#ffffff" />
            {hasUnreadMessages && <span className="controls__unread" />}
          </button>
          {getJitsiApi && (
            <div className="controls__settings" ref={settingsRef}>
              <button
                type="button"
                className={`controls__button ${
                  isSettingsOpen ? "controls__button--active" : ""
                }`}
                onClick={toggleSettings}
                aria-label={t("controls_settings")}
                aria-expanded={isSettingsOpen}
                title={t("controls_settings")}
              >
                <Icon name="settings" size="md" color="#ffffff" />
              </button>
              {isSettingsOpen && (
                <div className="controls__settings-menu" role="dialog">
                  {DEVICE_KINDS.map((deviceKind) =>
                    devices?.[deviceKind.kind]?.length ? (
                      <label
                        key={deviceKind.kind}
                        className="controls__settings-field"
                      >
                        <span className="small-text">
                          {t(deviceKind.labelKey)}
                        </span>
                        <select
                          value={
                            currentDevices?.[deviceKind.kind]?.deviceId || ""
                          }
                          onChange={(e) =>
                            handleDeviceChange(deviceKind, e.target.value)
                          }
                        >
                          {devices[deviceKind.kind].map((device) => (
                            <option
                              key={device.deviceId}
                              value={device.deviceId}
                            >
                              {device.label || t(deviceKind.labelKey)}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null
                  )}
                  <button
                    type="button"
                    className="controls__settings-background"
                    onClick={openBackgroundSettings}
                  >
                    {t("controls_background")}
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            className="controls__leave"
            onClick={leaveConsultation}
            aria-label={t("controls_leave")}
          >
            <Icon name="hangup" size="md" color="#ffffff" />
            <span>{t("controls_leave")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  // Add propTypes here
};

Controls.defaultProps = {
  // Add defaultProps here
  leaveConsultation: () => {},
};
