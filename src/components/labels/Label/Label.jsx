import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Icon } from "../../icons";

import "./label.scss";

const PALETTE_SIZE = 6;

/**
 * Label
 *
 * Label component. Renders one of 6 palette variants by index; if no index is passed, uses a stable random variant.
 *
 * @return {jsx}
 */
export const Label = ({
  text,
  onClick,
  classes,
  showSuccess,
  showRemove,
  onRemove,
  paletteIndex,
}) => {
  const effectiveIndex = useMemo(() => {
    if (typeof paletteIndex === "number" && !Number.isNaN(paletteIndex)) {
      return Math.abs(Math.floor(paletteIndex)) % PALETTE_SIZE;
    }
    return Math.floor(Math.random() * PALETTE_SIZE);
  }, [paletteIndex]);

  const paletteClass = `label-component--palette-${effectiveIndex}`;

  return (
    <div
      className={["label-component", paletteClass, classNames(classes)].join(
        " "
      )}
      onClick={onClick}
    >
      <p className="small-text">{text}</p>
      {showSuccess && <Icon name="check" size="sm" />}
      {showRemove && (
        <Icon name="close-x" size="sm" color="#000" onClick={onRemove} />
      )}
    </div>
  );
};

Label.propTypes = {
  /**
   * Text to display
   */
  text: PropTypes.string.isRequired,

  /**
   * Function to call when clicked
   */
  onClick: PropTypes.func,

  /**
   * Additional classes to be added to the Label component
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  showSuccess: PropTypes.bool,
  showRemove: PropTypes.bool,
  onRemove: PropTypes.func,
  /**
   * Index into the label color palette (0–5). If not passed, a random variant is used (stable per instance).
   */
  paletteIndex: PropTypes.number,
};
