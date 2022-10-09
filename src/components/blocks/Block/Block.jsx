import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./block.scss";

/**
 * Block
 *
 * Block component
 *
 * @return {jsx}
 */
export const Block = ({ classes, children, animation, ...props }) => {
  return (
    <section className={`block ${classNames(classes)}`} {...props}>
      <div data-aos={animation} className="container">
        {children}
      </div>
    </section>
  );
};

Block.propTypes = {
  /**
   * Additional classes to be added to the Block
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Additional styles to be added to the Block
   **/
  style: PropTypes.object,

  /**
   * Animation to be added to the Block
   **/
  animation: PropTypes.string,
};

Block.defaultProps = {
  classes: "",
  style: null,
  animation: "fade-right",
};
