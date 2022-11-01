import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box/Box";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";

import "./provider-overview.scss";

import { specialistPlaceholder } from "../../../assets";

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
  specialities,
  experience,
  onClick,
  yearsOfExperienceText,
}) => {
  return (
    <Box onClick={onClick} shadow={2} classes={["provider-overview"].join(" ")}>
      <Avatar image={image} size="sm" />
      <div className="provider-overview__content">
        <div className="provider-overview__content__text-content">
          <p className="text provider-overview__content__text-content__name">
            {name}
          </p>
          <>
            <p className="small-text provider-overview__specialities">
              {specialities}
            </p>
            <p className="small-text">
              {`${experience} ${yearsOfExperienceText}`}
            </p>
          </>
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
   * Name of the specialist
   * */
  name: PropTypes.string,

  /**
   * Specialities of the specialist
   * */
  specialities: PropTypes.string,

  /**
   * Experience of the specialist
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
  image: specialistPlaceholder,
  onClick: () => {},
  yearsOfExperienceText: "years experience Overall",
};
