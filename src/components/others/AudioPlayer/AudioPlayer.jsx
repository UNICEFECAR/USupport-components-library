import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./audio-player.scss";
import { Icon } from "../../icons";

const SEEK_SECONDS = 10;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

/**
 * AudioPlayer
 *
 * Minimal audio player for remote MP3 URLs.
 *
 * @return {jsx}
 */
export const AudioPlayer = ({ src, className, onEnded, onPlay }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [src]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      if (onPlay) onPlay();
    } catch {
      setIsPlaying(false);
    }
  };

  const seekTo = (targetSeconds) => {
    const audio = audioRef.current;
    if (!audio) return;

    const max =
      Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : Number.isFinite(duration) && duration > 0
        ? duration
        : null;
    if (max == null) return;

    audio.currentTime = Math.max(0, Math.min(max, targetSeconds));
  };

  const seekBy = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    seekTo((audio.currentTime || 0) + seconds);
  };

  const handleProgressChange = (event) => {
    seekTo(Number(event.target.value));
  };

  return (
    <div className={`audio-player ${className}`.trim()}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="audio-player__time-row">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        className="audio-player__progress"
        style={{ "--progress": `${progressPercent}%` }}
        onChange={handleProgressChange}
      />

      <div className="audio-player__controls">
        <div
          className="audio-player__control"
          onClick={() => seekBy(-SEEK_SECONDS)}
          aria-label="Seek back 10 seconds"
        >
          <Icon name="seek-back" size="lg" aria-hidden />
        </div>
        <div
          type="div"
          className="audio-player__play"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          <Icon
            name={isPlaying ? "pause" : "play-gradient"}
            size="xl"
            classes="audio-player__play-icon"
            aria-hidden
          />
        </div>
        <div
          className="audio-player__control"
          onClick={() => seekBy(SEEK_SECONDS)}
          aria-label="Seek forward 10 seconds"
        >
          <Icon name="seek-forward" size="lg" aria-hidden />
        </div>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  onEnded: PropTypes.func,
  onPlay: PropTypes.func,
};

AudioPlayer.defaultProps = {
  className: "",
  onEnded: null,
  onPlay: null,
};
