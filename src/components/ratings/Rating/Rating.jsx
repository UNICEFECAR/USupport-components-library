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
export const Rating = ({ maxStars, rating }) => {
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

  return (
    <div className="rating">
      {stars.map((star, index) => {
        return (
          <Icon
            key={index}
            name={star}
            color={star === "star" ? "#66768D" : null}
            size="lg"
            classes="rating__star"
          />
        );
      })}
    </div>
  );
};

Rating.propTypes = {
  // Add propTypes here
};

Rating.defaultProps = {
  // Add defaultProps here
};
