import React, { useId } from "react";
import PropTypes from "prop-types";

import sprite from "../assets/sprite.svg";

import "./icon.scss";

/**
 * Convert hex color to RGB values (0-1 range for SVG filter)
 */
const hexToRgbNormalized = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
};

/**
 * Icon component used to render different icons from the sprite file
 */
export const Icon = ({ name, size, color, classes, role, ...props }) => {
  const filterId = useId();

  if (color) {
    const rgb = hexToRgbNormalized(color);

    return (
      <svg
        className={
          `icon icon--${name} icon--${size} ${props.onClick ? "icon--clickable" : ""}` +
          (classes ? ` ${classes}` : "")
        }
        role={role ? role : "none"}
        alt={`icon-${name}`}
        {...props}
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values={`0 0 0 0 ${rgb.r}
                       0 0 0 0 ${rgb.g}
                       0 0 0 0 ${rgb.b}
                       0 0 0 1 0`}
            />
          </filter>
        </defs>
        <use href={`${sprite}#icon-${name}`} filter={`url(#${filterId})`} />
      </svg>
    );
  }

  return (
    <svg
      className={
        `icon icon--${name} icon--${size} ${props.onClick ? "icon--clickable" : ""}` +
        (classes ? ` ${classes}` : "")
      }
      role={role ? role : "none"}
      alt={`icon-${name}`}
      {...props}
    >
      <use href={`${sprite}#icon-${name}`} />
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
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),

  /**
   * Color of the icon in HEX format (does not work for all types of icons)
   * */
  color: PropTypes.string,

  /**
   * Additional classes to add to the icon
   */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Additional props to add to the icon
   **/
  props: PropTypes.object,
};

Icon.defaultProps = {
  size: "md",
  color: null,
  classes: [],
  role: "none",
};
