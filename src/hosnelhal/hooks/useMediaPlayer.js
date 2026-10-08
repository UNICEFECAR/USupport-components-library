import { useEffect, useState } from "react";

const EVENTS = [
  "play",
  "pause",
  "ended",
  "timeupdate",
  "durationchange",
  "loadedmetadata",
  "volumechange",
];

/**
 * @param {number} seconds
 * @returns {string} "m:ss"
 */
export const formatMediaTime = (seconds) => {
  const total = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

/**
 * State and actions of an <audio> or <video> element, for custom controls
 *
 * @param {object} mediaRef - ref of the media element
 * @returns {object} { isPlaying, currentTime, duration, isMuted, toggle, seek, toggleMute }
 */
export const useMediaPlayer = (mediaRef) => {
  const [state, setState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isMuted: false,
  });

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return undefined;

    const sync = () =>
      setState({
        isPlaying: !media.paused && !media.ended,
        currentTime: media.currentTime,
        duration: Number.isFinite(media.duration) ? media.duration : 0,
        isMuted: media.muted,
      });

    EVENTS.forEach((event) => media.addEventListener(event, sync));
    sync();
    return () => EVENTS.forEach((event) => media.removeEventListener(event, sync));
  }, [mediaRef]);

  const toggle = () => {
    const media = mediaRef.current;
    if (!media) return;
    if (media.paused || media.ended) media.play().catch(() => {});
    else media.pause();
  };

  const seek = (time) => {
    if (mediaRef.current) mediaRef.current.currentTime = time;
  };

  const toggleMute = () => {
    if (mediaRef.current) mediaRef.current.muted = !mediaRef.current.muted;
  };

  return { ...state, toggle, seek, toggleMute };
};
