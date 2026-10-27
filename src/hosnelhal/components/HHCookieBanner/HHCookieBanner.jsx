import React, { useId } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHButton } from "../HHButton/HHButton";

import "./hh-cookie-banner.scss";

/**
 * HHCookieBanner
 *
 * Cookie consent card fixed to the bottom of the page. Storing the choice is
 * left to `onAccept` / `onReject`.
 *
 * @return {jsx}
 */
export const HHCookieBanner = ({
  title,
  text,
  acceptLabel,
  rejectLabel,
  onAccept,
  onReject,
  className,
}) => {
  const titleId = useId();

  return (
    <section
      className={classNames("hh-cookie-banner", className)}
      aria-labelledby={titleId}
    >
      <h2 className="hh-cookie-banner__title" id={titleId}>
        {title}
      </h2>
      <p className="hh-cookie-banner__text">{text}</p>
      <div className="hh-cookie-banner__actions">
        <HHButton variant="outline" onClick={onReject}>
          {rejectLabel}
        </HHButton>
        <HHButton onClick={onAccept}>{acceptLabel}</HHButton>
      </div>
    </section>
  );
};

HHCookieBanner.propTypes = {
  title: PropTypes.node.isRequired,
  /** Body copy, may contain a link to the cookie policy */
  text: PropTypes.node.isRequired,
  acceptLabel: PropTypes.node.isRequired,
  rejectLabel: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  className: PropTypes.string,
};
