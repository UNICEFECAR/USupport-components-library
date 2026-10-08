import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "../../styles/theme.scss";
import "../../styles/base.scss";

const HHRootContext = createContext({ linkComponent: null });

export const useHHRoot = () => useContext(HHRootContext);

/**
 * HHRoot
 *
 * Root of the Hosn El Hal site. Scopes the HH styles and design tokens, sets
 * the text direction and provides the router link component used by HHLink.
 *
 * @return {jsx}
 */
export const HHRoot = ({
  dir = "ltr",
  lang,
  linkComponent,
  className,
  children,
  ...props
}) => {
  return (
    <HHRootContext.Provider value={{ linkComponent }}>
      <div
        className={classNames("hh", className)}
        dir={dir}
        lang={lang}
        {...props}
      >
        {children}
      </div>
    </HHRootContext.Provider>
  );
};

HHRoot.propTypes = {
  dir: PropTypes.oneOf(["ltr", "rtl"]),
  lang: PropTypes.string,
  /** Router link component, e.g. react-router's Link. Receives a `to` prop */
  linkComponent: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
