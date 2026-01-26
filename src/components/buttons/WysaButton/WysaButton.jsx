import React from "react";
import classNames from "classnames";

import useWindowDimensions from "../../../utils/useWindowDimensions";
import { wysaLogo } from "../../../assets";

import "./wysa-button.scss";

/**
 * WysaButton
 *
 * Button with Wysa logo that shows icon only on mobile and full button on desktop
 *
 * @return {jsx}
 */
export const WysaButton = ({
  classes,
  onClick,
  hasBadge = true,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <button
      className={classNames("wysa-button", classes, {
        "wysa-button--mobile": isMobile,
      })}
      onClick={onClick}
      {...props}
    >
      <img src={wysaLogo} alt="Wysa" className="wysa-button__logo" />
      {!isMobile  && (
        <span className="wysa-button__text">Wysa</span>
      )}
      {hasBadge && (
        <span className="wysa-button__badge">!</span>
      )}
    </button>
  );
};