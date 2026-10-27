import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHIcon } from "../HHIcon/HHIcon";
import { formatMediaTime } from "../../hooks/useMediaPlayer";

import "./hh-media-controls.scss";

/**
 * HHMediaControls
 *
 * Play / pause, time, seek bar, mute and optional full screen for a media
 * element driven by useMediaPlayer
 *
 * @return {jsx}
 */
export const HHMediaControls = ({
  player,
  labels,
  showPlayButton = true,
  onFullscreen,
  className,
}) => {
  const { isPlaying, currentTime, duration, isMuted, toggle, seek, toggleMute } =
    player;
  const time = `${formatMediaTime(currentTime)} / ${formatMediaTime(duration)}`;

  return (
    <div className={classNames("hh-media-controls", className)}>
      {showPlayButton && (
        <button
          type="button"
          className="hh-media-controls__button"
          onClick={toggle}
          aria-label={isPlaying ? labels.pause : labels.play}
        >
          <HHIcon name={isPlaying ? "pause" : "play"} />
        </button>
      )}

      <span className="hh-media-controls__time" aria-hidden="true">
        {time}
      </span>

      <input
        type="range"
        className="hh-media-controls__seek"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        onChange={(e) => seek(Number(e.target.value))}
        disabled={!duration}
        aria-label={labels.seek}
        aria-valuetext={time}
        style={{
          "--hh-media-progress": `${duration ? (currentTime / duration) * 100 : 0}%`,
        }}
      />

      <button
        type="button"
        className="hh-media-controls__button"
        onClick={toggleMute}
        aria-label={isMuted ? labels.unmute : labels.mute}
      >
        <HHIcon name={isMuted ? "muted" : "volume"} />
      </button>

      {onFullscreen && (
        <button
          type="button"
          className="hh-media-controls__button"
          onClick={onFullscreen}
          aria-label={labels.fullscreen}
        >
          <HHIcon name="fullscreen" />
        </button>
      )}
    </div>
  );
};

export const mediaLabelsPropType = PropTypes.shape({
  play: PropTypes.string.isRequired,
  pause: PropTypes.string.isRequired,
  seek: PropTypes.string.isRequired,
  mute: PropTypes.string.isRequired,
  unmute: PropTypes.string.isRequired,
  fullscreen: PropTypes.string,
});

HHMediaControls.propTypes = {
  /** Result of useMediaPlayer */
  player: PropTypes.object.isRequired,
  labels: mediaLabelsPropType.isRequired,
  showPlayButton: PropTypes.bool,
  onFullscreen: PropTypes.func,
  className: PropTypes.string,
};
