import React from "react";
import RCSlider from "rc-slider";

import "rc-slider/assets/index.css";
import "./slider.scss";

/**
 * Slider
 *
 * Slider component
 *
 * @return {jsx}
 */
export const Slider = ({ min = 1, max = 10, value, ...props }) => {
  return (
    <div className="slider">
      <div className="slider__wrapper">
        <p className="slider__text--min">{min}</p>
        <RCSlider value={value} min={min} max={max} {...props} />
        <p className="slider__text--max">{max}</p>
      </div>
      <h4>{value}</h4>
    </div>
  );
};
