import React from "react";
import propTypes from "prop-types";

import "./podcast-modal.scss";

/**
 * Podcast Modal
 *
 * PodcastModal component for playing podcasts in a modal overlay
 *
 * @return {jsx}
 */
export const PodcastModal = ({ isOpen, onClose, spotifyId, title, t }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="podcast-modal-overlay" onClick={handleOverlayClick}>
      <div className="podcast-modal__content">
        <div className="podcast-modal__player-container">
          {spotifyId ? (
            <iframe
              src={`https://open.spotify.com/embed/${spotifyId}`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={title || "Spotify Podcast Player"}
            />
          ) : (
            <div className="podcast-modal__error">
              <p>{t ? t("podcast_unavailable") : "Podcast unavailable"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PodcastModal.propTypes = {
  /**
   * Whether the modal is open
   */
  isOpen: propTypes.bool.isRequired,
  /**
   * Function to close the modal
   */
  onClose: propTypes.func.isRequired,
  /**
   * Spotify ID for the podcast
   */
  spotifyId: propTypes.string,
  /**
   * Title of the podcast
   */
  title: propTypes.string,
  /**
   * Translation function
   */
  t: propTypes.func,
};

PodcastModal.defaultProps = {
  spotifyId: "",
  title: "",
  t: null,
};
