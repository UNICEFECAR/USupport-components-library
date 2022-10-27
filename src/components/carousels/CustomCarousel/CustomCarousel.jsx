import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./custom-carousel.scss";

/**
 * CustomCarousel
 *
 * Custom carousel component
 *
 * @return {jsx}
 */
export const CustomCarousel = (
  {
    /* Add props here */
  }
) => {
  return <Carousel></Carousel>;
};

CustomCarousel.propTypes = {
  // Add propTypes here
};

CustomCarousel.defaultProps = {
  // Add defaultProps here
};
