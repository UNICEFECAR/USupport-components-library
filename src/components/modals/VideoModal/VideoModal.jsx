import { useContext } from "react";

import { VideoPlayer } from "@USupport-components-library/src";
import { ThemeContext } from "@USupport-components-library/utils";

import "./video-modal.scss";

/**
 * Video Modal
 *
 * VideoModal component for playing videos
 *
 * @return {jsx}
 */
export const VideoModal = ({ isOpen, onClose, videoUrl, t }) => {
  const { cookieState, setCookieState } = useContext(ThemeContext);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="video-modal-overlay" onClick={handleOverlayClick}>
      <div className="video-modal__content">
        <VideoPlayer
          url={videoUrl}
          cookieState={cookieState}
          setCookieState={setCookieState}
          t={t}
          autoplay
        />
      </div>
    </div>
  );
};
