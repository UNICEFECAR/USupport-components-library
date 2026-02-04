import React from "react";
import PropTypes from "prop-types";

import "./mood-track-details.scss";
import { Emoticon } from "../../icons";

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
        <Emoticon
          name={`emoticon-${mood.mood}`}
          size="xs"
          classes="mood-track-details__subheading-container__emoticon"
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
