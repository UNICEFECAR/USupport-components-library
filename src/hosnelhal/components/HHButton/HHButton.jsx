import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHLink } from "../HHLink/HHLink";

import "./hh-button.scss";

/**
 * HHButton
 *
 * Renders a router link (`to`), a file / external link (`href`) or a button.
 * Files are downloaded with `download`.
 *
 * @return {jsx}
 */
export const HHButton = ({
  variant = "primary",
  fullWidth = false,
  to,
  href,
  download = false,
  type = "button",
  className,
  children,
  ...props
}) => {
  const classes = classNames(
    "hh-button",
    `hh-button--${variant}`,
    { "hh-button--full-width": fullWidth },
    className
  );

  if (to || href) {
    const fileProps = download
      ? { download: true, target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <HHLink to={to} href={href} className={classes} {...fileProps} {...props}>
        {children}
      </HHLink>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

HHButton.propTypes = {
  variant: PropTypes.oneOf(["primary", "soft", "outline", "text"]),
  fullWidth: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
  download: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  children: PropTypes.node,
};
