import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";

import "./rating.scss";

/**
 * Rating
 *
 * Rating component
 *
 * @return {jsx}
 */
export const Rating = ({
  label,
  maxStars,
  rating,
  changeOnHoverEnabled,
  setParentState,
}) => {
  const [initialStarsState, setInitialStarsState] = useState();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    let initialStarsState = [];
    for (let i = 0; i < maxStars; i++) {
      if (i + 1 <= rating) {
        initialStarsState.push("star-full");
      } else {
        initialStarsState.push("star");
      }
    }

    setInitialStarsState(initialStarsState);
    setStars(initialStarsState);
  }, [rating, maxStars]);

  function onStarHover(numberOfStars) {
    let newStars = [...stars];

    // Set all previous stars as active
    for (let i = 0; i <= numberOfStars; i++) {
      newStars[i] = "star-full";
    }

    // Reset all next stars
    for (let i = numberOfStars + 1; i < initialStarsState.length; i++) {
      newStars[i] = "star";
    }

    setParentState(numberOfStars + 1);
    setStars(newStars);
  }

  return (
    <div className="rating">
      {label ? <p className="text rating__label">{label}</p> : null}
      <div className="rating__stars-container">
        {stars.map((star, index) => {
          const starColor = star === "star" ? "#66768D" : "#9749fa";
          return (
            <Icon
              key={star + index}
              name={star}
              color={starColor}
              size="lg"
              classes="rating__stars-container__star"
              onClick={
                changeOnHoverEnabled ? () => onStarHover(index) : () => {}
              }
            />
          );
        })}
      </div>
    </div>
  );
};

Rating.propTypes = {
  /**
   * Max number of stars
   * */
  maxStars: PropTypes.number,

  /**
   * Current rating
   * */
  rating: PropTypes.number,

  /**
   * Enable rating change on hover
   * */
  changeOnHoverEnabled: PropTypes.bool,

  /**
   * Send to the parent component the current selected rating
   * */
  setParentState: PropTypes.func,
};

Rating.defaultProps = {
  // Add defaultProps here
  maxStars: 5,
  rating: 1,
  changeOnHoverEnabled: true,
  setParentState: () => {},
};
