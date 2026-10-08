import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHLink } from "../HHLink/HHLink";

import "./hh-logo.scss";

/**
 * HHLogo
 *
 * Partner or program logo, optionally linked
 *
 * @return {jsx}
 */
export const HHLogo = ({ src, alt, size = "lg", to, href, className }) => {
  const image = (
    <img
      className={classNames("hh-logo", `hh-logo--${size}`, className)}
      src={src}
      alt={alt}
    />
  );

  if (!to && !href) return image;

  return (
    <HHLink
      to={to}
      href={href}
      className="hh-logo__link"
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {image}
    </HHLink>
  );
};

HHLogo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["lg", "md"]),
  to: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};
