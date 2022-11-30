import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "./react-multi-carousel.scss"; // Styles needed for the react-multi-carousel library, as it cannot import them itself
import classNames from "classnames";

import "./custom-carousel.scss";

const defaultBreakpointItems = {
  desktop: {
    breakpoint: { max: 5000, min: 1366 }, // 5000 is a hack to make sure it's the last breakpoint
    items: 1,
  },
  smallLaptop: {
    breakpoint: { max: 1366, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 375 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 375, min: 0 },
    items: 1,
  },
};

/**
 * CustomCarousel
 *
 * Custom carousel component
 *
 * @return {jsx}
 */
export const CustomCarousel = ({
  classes,
  breakpointItems,
  children,
  speed = 3000,
}) => {
  return (
    <div className={["custom-carousel", classNames(classes)].join(" ")}>
      <Carousel
        responsive={breakpointItems ? breakpointItems : defaultBreakpointItems}
        renderDotsOutside={true}
        autoPlay={true}
        infinite={true}
        showDots={true}
        arrows={false}
        autoPlaySpeed={speed}
      >
        {children}
      </Carousel>
    </div>
  );
};

CustomCarousel.propTypes = {
  // Add propTypes here
};

CustomCarousel.defaultProps = {
  // Add defaultProps here
};
