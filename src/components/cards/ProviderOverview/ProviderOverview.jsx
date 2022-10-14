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
}) => {
  return (
    <Box onClick={onClick} shadow={2} classes={"provider-overview"}>
      <Avatar image={image} size="sm" />
      <div className="provider-overview__content">
        <div>
          <p className="text">{name}</p>
          <p className="small-text">{specialities}</p>
          <p className="small-text">{experience} years experience Overall</p>
        </div>
        <Icon name="arrow-chevron-forward" size="md" color="#20809E" />
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
};

ProviderOverview.defaultProps = {
  image: specialistPlaceholder,
  onClick: () => {},
};
