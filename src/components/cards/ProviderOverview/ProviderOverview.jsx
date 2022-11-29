import React, { useState } from "react";
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
  viewProfileLabel,
  editLabel,
  deleteLabel,
  onClick,
  hasMenu,
  handleEdit,
  handleDelete,
  handleViewProfile,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayName = patronym
    ? `${name} ${patronym} ${surname}`
    : `${name} ${surname}`;

  const handleIconClick = () => {
    if (hasMenu) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <Box
      onClick={!hasMenu ? onClick : undefined}
      shadow={2}
      classes={["provider-overview"].join(" ")}
    >
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
          <Icon
            name={hasMenu ? "three-dots-vertical" : "arrow-chevron-forward"}
            onClick={handleIconClick}
            size="md"
            color="#20809E"
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="provider-overview__menu">
          <div
            onClick={handleViewProfile}
            className="provider-overview__menu__content"
          >
            <Icon name="person" size="md" color="#20809E" />
            <p className="text">{viewProfileLabel}</p>
          </div>
          <div
            onClick={handleEdit}
            className="provider-overview__menu__content"
          >
            <Icon name="edit" size="md" />
            <p className="text">{editLabel}</p>
          </div>
          <div
            onClick={handleDelete}
            className="provider-overview__menu__content"
          >
            <Icon name="trash" size="md" />
            <p className="text">{deleteLabel}</p>
          </div>
        </div>
      )}
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

  /**
   * Does the component have a hideable menu
   */
  hasMenu: PropTypes.bool,

  /**
   * Label for the view profile containaer
   * */
  viewProfileLabel: PropTypes.string,

  /**
   * Label for the edit container
   */
  editLabel: PropTypes.string,

  /**
   * Label for the delete container
   * */
  deleteLabel: PropTypes.string,

  /**
   * Handler for the view profile container
   */
  handleViewProfile: PropTypes.func,

  /**
   * Handler for the edit container
   * */
  handleEdit: PropTypes.func,

  /**
   * Handler for the delete conatiner
   * */
  handleDelete: PropTypes.func,
};

ProviderOverview.defaultProps = {
  onClick: () => {},
  yearsOfExperienceText: "years experience Overall",
  iconName: "arrow-chevron-forward",
  hasMenu: false,
  editLabel: "Edit",
  deleteLabel: "Delete",
  viewProfileLabel: "View profile",
};
