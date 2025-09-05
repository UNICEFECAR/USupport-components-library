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
export const Slider = ({
  min = 1,
  max = 10,
  value,
  leftContent,
  rightContent,
  renderValue,
  ...props
}) => {
  return (
    <div className="slider">
      <div className="slider__wrapper">
        <div className="slider__text--min">{leftContent ?? min}</div>
        <RCSlider value={value} min={min} max={max} {...props} />
        <div className="slider__text--max">{rightContent ?? max}</div>
      </div>
      <h4>{renderValue ? renderValue(value) : value}</h4>
    </div>
  );
};
