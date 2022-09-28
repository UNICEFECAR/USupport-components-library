import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Color, hexToRgb, Solver } from "../utils/ColorSolver";

import sprite from "../assets/sprite.svg";

import "./icon.scss";

/**
 * Icon component used to render different icons from the sprite file
 */
export const Icon = ({ name, size, color, ...props }) => {
  const [svgFilter, setSvgFilter] = useState();

  // Generate a color filter for the icon
  useEffect(() => {
    if (color) {
      const rgb = hexToRgb(color);
      const colorToSolve = new Color(rgb[0], rgb[1], rgb[2]);
      const solver = new Solver(colorToSolve);
      const result = solver.solve();
      setSvgFilter(
        `brightness(0) saturate(100%) ${result.filter
          .split("filter: ")[1]
          .slice(0, -1)}`
      );
    }
  }, [color]);

  return (
    <svg
      className={`icon icon--${name} icon--${size}`}
      style={{ WebkitFilter: svgFilter ? svgFilter : "" }}
      {...props}
    >
      <use xlinkHref={`${sprite}#icon-${name}`} />
    </svg>
  );
};

Icon.propTypes = {
  /**
   * Name of the icon to render from the sprite file (e.g. "filter")
   * */
  name: PropTypes.string.isRequired,
  /**
   * Size of the icon
   * */
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  /**
   * Color of the icon in HEX format (does not work for all types of icons)
   * */
  color: PropTypes.string,
};

Icon.defaultProps = {
  size: "medium",
  color: null,
};
