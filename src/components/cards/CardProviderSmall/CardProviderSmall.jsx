import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box";
import classNames from "classnames";

import "./card-provider-small.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * CardProviderSmall
 *
 * Provider small card
 *
 * @return {jsx}
 */
export const CardProviderSmall = ({
  providerName,
  description,
  classes,
  image,
  onClick,
}) => {
  const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");
  return (
    <Box
      classes={classNames(["card-provider-small", classes])}
      onClick={onClick}
      role="button"
    >
      <img src={imageUrl} />
      <div className="card-provider-small__information">
        <h4>{providerName}</h4>
        <p className="text">{description}</p>
      </div>
    </Box>
  );
};

CardProviderSmall.propTypes = {
  /**
   *
   * Name of the provider
   **/
  providerName: PropTypes.string,
  /**
   *
   * Description of the provider
   **/
  description: PropTypes.string,

  /**
   * Additional classes to be added to the card
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CardProviderSmall.defaultProps = {
  description: "Therapist and life coach",
  classes: "",
};
