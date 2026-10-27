import React from "react";
import PropTypes from "prop-types";

import "./hh-split-layout.scss";

/**
 * HHSplitLayout
 *
 * Main content with a narrower side column; stacked on small screens
 *
 * @return {jsx}
 */
export const HHSplitLayout = ({ main, aside }) => {
  return (
    <div className="hh-split-layout">
      <div className="hh-split-layout__main">{main}</div>
      {aside && <aside className="hh-split-layout__aside">{aside}</aside>}
    </div>
  );
};

HHSplitLayout.propTypes = {
  main: PropTypes.node.isRequired,
  aside: PropTypes.node,
};
