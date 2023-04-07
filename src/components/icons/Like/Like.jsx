import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../";

import "./like.scss";

/**
 * Like
 *
 * Like component used in Q&A
 *
 * @return {jsx}
 */
export const Like = ({
  handleClick,
  likes,
  isLiked,
  dislikes,
  isDisliked,
  answerId,
}) => {
  return (
    <div className="like">
      <div className="like__vote-wrapper">
        <div
          onClick={() =>
            handleClick(isLiked ? "remove-like" : "like", answerId)
          }
          className={[
            "like__icon-container",
            isLiked && "like__icon-container__selected",
          ].join(" ")}
        >
          <Icon name="like" />
          <div className="like__icon-container__text-container">
            <p className="small-text">{likes}</p>
          </div>
        </div>
      </div>
      <div className="like__vote-wrapper">
        <div
          onClick={() =>
            handleClick(isDisliked ? "remove-dislike" : "dislike", answerId)
          }
          className={[
            "like__icon-container",
            isDisliked && "like__icon-container__selected",
          ].join(" ")}
        >
          <Icon name="dislike" />
          <div className="like__icon-container__text-container">
            <p className="small-text">{dislikes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Like.propTypes = {
  // Add propTypes here
};

Like.defaultProps = {
  // Add defaultProps here
};
