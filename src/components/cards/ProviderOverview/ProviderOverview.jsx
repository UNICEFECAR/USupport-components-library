import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";

import "./provider-overview.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * ProviderOverview
 *
 * PorviderOverview component
 *
 * @return {jsx}
 */
export const ProviderOverview = ({
  image,
  name,
  patronym,
  surname,
  specializations,
  onClick,
}) => {
  const displayName = patronym
    ? `${name} ${patronym} ${surname}`
    : `${name} ${surname}`;
  return (
    <Box onClick={onClick} shadow={2} classes={["provider-overview"].join(" ")}>
      <Avatar image={AMAZON_S3_BUCKET + "/" + image} size="sm" />
      <div className="provider-overview__content">
        <div className="provider-overview__content__text-content">
          <p className="text provider-overview__content__text-content__name">
            {displayName}
          </p>
          <p className="small-text provider-overview__types">
            {specializations?.join(", ")}
          </p>
        </div>
        <div>
          <Icon name="arrow-chevron-forward" size="md" color="#20809E" />
        </div>
      </div>
    </Box>
  );
};

ProviderOverview.propTypes = {
  /**
   * Image url
   */
  image: PropTypes.string,

  /**
   * Name of the provider
   * */
  name: PropTypes.string,

  /**
   * Specialities of the provider
   * */
  specialities: PropTypes.string,

  /**
   * Experience of the provider
   * */
  experience: PropTypes.number,

  /**
   * On click handler
   * */
  onClick: PropTypes.func,

  /**
   * Text(translated in the used language) showing the years of experience of the provider
   * */
  yearsOfExperienceText: PropTypes.string,
};

ProviderOverview.defaultProps = {
  onClick: () => {},
  yearsOfExperienceText: "years experience Overall",
};
