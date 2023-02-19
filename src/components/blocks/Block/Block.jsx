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
export const Block = ({ classes, children, animation, isFooter, ...props }) => {
  const section = (
    <section className={`block ${classNames(classes)}`} {...props}>
      <div data-aos={animation} className="container">
        {children}
      </div>
    </section>
  );
  const footer = (
    <footer>
      <section className={`block ${classNames(classes)}`} {...props}>
        <div data-aos={animation} className="container">
          {children}
        </div>
      </section>
    </footer>
  );
  return isFooter ? footer : section;
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
  isFooter: false,
};
