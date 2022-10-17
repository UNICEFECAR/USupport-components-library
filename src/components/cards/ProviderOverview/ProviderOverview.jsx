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
  date,
  onClick,
}) => {
  //TODO: Refactor this component to work with real dates

  return (
    <Box onClick={onClick} shadow={2} classes={"provider-overview"}>
      <Avatar image={image} size="sm" />
      <div className="provider-overview__content">
        <div className="provider-overview__content__text-content">
          <p className="provider-overview__content__text-content__name">
            {name}
          </p>
          {date ? (
            <div className="provider-overview__content__text-content__date-container">
              <Icon name="calendar" size="sm" color="#66768D" />
              <div className="provider-overview__content__text-content__date-container__text">
                <p className="small-text">Fri, 17.10.</p>
                <p className="small-text">9:00-10:00</p>
              </div>
            </div>
          ) : (
            <>
              <p className="small-text provider-overview__specialities">
                {specialities}
              </p>
              <p className="small-text">
                {experience} years experience Overall
              </p>
            </>
          )}
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
};

ProviderOverview.defaultProps = {
  image: specialistPlaceholder,
  onClick: () => {},
};
