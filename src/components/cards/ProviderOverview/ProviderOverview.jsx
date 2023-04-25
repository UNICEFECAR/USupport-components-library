import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

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
  freeLabel,
  price,
  editLabel,
  statusChangeLabel,
  activitiesLabel,
  onClick,
  hasMenu,
  showActivities,
  handleEdit,
  handleUpdateStatus,
  handleViewProfile,
  handleActivities,
  providerStatus,
  t,
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayName = patronym
    ? `${name} ${patronym} ${surname}`
    : `${name} ${surname}`;

  const handleIconClick = () => {
    if (hasMenu) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const handleToggleStatus = () => {
    setIsMenuOpen(false);
    handleUpdateStatus();
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
          <div className="provider-overview__content__text-content__name-container">
            <p className="text provider-overview__content__text-content__name-container">
              {displayName}
            </p>
            <div
              className={[
                "provider-overview__content__text-content__name-container__price-badge",
                !price &&
                  "provider-overview__content__text-content__name-container__price-badge--free",
              ].join(" ")}
            >
              <p className="small-text">
                {price ? `${price}${currencySymbol}` : freeLabel}
              </p>
            </div>
          </div>
          <p className="small-text provider-overview__types">
            {specializations?.join(", ")}
          </p>
          {providerStatus && (
            <div
              className={`provider-overview__status provider-overview__status--${providerStatus}`}
            >
              <p className="small-text">{t(providerStatus)}</p>
            </div>
          )}
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
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
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

            {showActivities && (
              <div
                onClick={handleActivities}
                className="provider-overview__menu__content"
              >
                <Icon name="activities" size="md" />
                <p className="text">{activitiesLabel}</p>
              </div>
            )}
            <div
              onClick={handleToggleStatus}
              className="provider-overview__menu__content"
            >
              <Icon
                color={providerStatus === "active" ? "#eb5757" : "#20809E"}
                name={
                  providerStatus === "active"
                    ? "circle-actions-close"
                    : "circle-actions-success"
                }
                size="md"
              />
              <p className="text">{statusChangeLabel}</p>
            </div>
          </div>
        </OutsideClickHandler>
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
  statusChangeLabel: PropTypes.string,

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
  statusChangeLabel: "Activate",
  viewProfileLabel: "View profile",
};
