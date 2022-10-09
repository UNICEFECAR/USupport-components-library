import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box";
import { Icon } from "../../icons/Icon";

import "./card-number.scss";

/**
 * CardNumber
 *
 * A card with a number above
 *
 * @return {jsx}
 */
export const CardNumber = ({ number, iconName, text, ...props }) => {
  return (
    <Box borderSize="md" {...props} classes="card-number">
      <div className="card-number__number">{number}.</div>
      <div className="card-number__content">
        <div className="card-number__icon">
          <Icon name={iconName} />
        </div>
        <p className="text card-number__text">{text}</p>
      </div>
    </Box>
  );
};

CardNumber.propTypes = {
  /**
   * Number to render in the CardNumber component
   * */
  number: PropTypes.string.isRequired,

  /**
   * Name of the icon to render in the CardNumber component
   * */
  iconName: PropTypes.string.isRequired,

  /**
   * Text to render in the CardNumber component
   * */
  text: PropTypes.string.isRequired,
};

CardNumber.defaultProps = {};
