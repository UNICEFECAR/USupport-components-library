import React from "react";
import PropTypes from "prop-types";

import "./mood-track-details.scss";
import {
  moodTrackHappy,
  moodTrackGood,
  moodTrackSad,
  moodTrackDepressed,
  moodTrackWorried,
} from "../../../assets";

const moodImages = {
  happy: moodTrackHappy,
  good: moodTrackGood,
  sad: moodTrackSad,
  depressed: moodTrackDepressed,
  worried: moodTrackWorried,
};

/**
 * MoodTrackDetails
 *
 * MoodTrackDetails content component used in MoodTrackHistory block modal
 *
 * @return {jsx}
 */
export const MoodTrackDetails = ({ mood, t }) => {
  return (
    <div className="mood-track-details">
      <div className="mood-track-details__subheading-container">
        <p className="text">{t("you_felt")}</p>
        <img
          src={moodImages[mood.mood]}
          alt={mood.mood}
          className="mood-track-details__subheading-container__emoticon"
          style={{ width: "2.4rem", height: "2.4rem" }}
        />
        <p className="text">
          {t(mood.mood)} {t("comment_text")}
        </p>
      </div>
      <p className="text mood-track-details__comment">{mood.comment}</p>
      {mood.is_critical && (
        <p className="text mood-track-details__critical-text">
          {t("critical_text")}
        </p>
      )}
    </div>
  );
};

MoodTrackDetails.propTypes = {
  /*
   * Mood object
   */
  mood: PropTypes.object.isRequired,

  /*
   * Translation function
   */
  t: PropTypes.func.isRequired,
};
