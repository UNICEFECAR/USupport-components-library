import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "./react-multi-carousel.scss"; // Styles needed for the react-multi-carousel library, as it cannot import them itself
import classNames from "classnames";

import { Icon } from "../../icons/Icon";

import "./custom-carousel.scss";

const CAROUSEL_ARROW_ICON_COLOR = "#9749FA";

const CarouselArrow = ({ onClick, disabled, direction }) => {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      className={classNames(
        "custom-carousel__arrow",
        isLeft ? "custom-carousel__arrow--left" : "custom-carousel__arrow--right",
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous slide" : "Next slide"}
    >
      <Icon
        name={isLeft ? "arrow-chevron-back" : "arrow-chevron-forward"}
        size="md"
        color={CAROUSEL_ARROW_ICON_COLOR}
        classes="custom-carousel__arrow-icon"
        role="presentation"
      />
    </button>
  );
};

CarouselArrow.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
};

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
  autoPlay = true,
  showArrows = true,
}) => {
  return (
    <div className={classNames("custom-carousel", classes)}>
      <Carousel
        responsive={breakpointItems ? breakpointItems : defaultBreakpointItems}
        renderDotsOutside={true}
        autoPlay={autoPlay}
        infinite={true}
        showDots={true}
        arrows={showArrows}
        customLeftArrow={<CarouselArrow direction="left" />}
        customRightArrow={<CarouselArrow direction="right" />}
        autoPlaySpeed={speed}
      >
        {children}
      </Carousel>
    </div>
  );
};

CustomCarousel.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  breakpointItems: PropTypes.object,
  children: PropTypes.node,
  speed: PropTypes.number,
  autoPlay: PropTypes.bool,
  showArrows: PropTypes.bool,
};

