import React from "react";
import PropTypes from "prop-types";

import { Box } from "../../boxes/Box/Box";
import { Icon } from "../../icons/Icon/Icon";
import { NewButton } from "../../buttons";

import "./organization-overview.scss";

/**
 * OrganizationOverview
 *
 * Organization overview card component that displays key organization information
 *
 * @return {jsx}
 */
export const OrganizationOverview = ({
  name,
  specialisations = [],
  address,
  phone,
  onClick,
  t,
  iconColor = "#20809E",
}) => {
  const formattedSpecialisations =
    specialisations && specialisations.length > 0
      ? specialisations.map((spec) => {
          const name = typeof spec === "string" ? spec : spec.name;
          return t ? t(name) : name;
        })
      : [];

  const specialisationsText = formattedSpecialisations.join(", ");

  return (
    <Box onClick={onClick} shadow={2} classes="organization-overview-card">
      <div className="organization-overview-card__content">
        <div className="organization-overview-card__top">
          <div className="organization-overview-card__icon-container">
            <div className="organization-overview-card__icon-container__icon-wrapper">
              <Icon name="organization" size="md" color={iconColor} />
            </div>
          </div>
          <div className="organization-overview-card__content__text-content">
            <div className="organization-overview-card__content__text-content__name-container">
              <div className="organization-overview-card__content__text-content__name-container__name-wrapper">
                <p className="organization-overview-card__content__text-content__name paragraph">
                  {name}
                </p>
              </div>
              {formattedSpecialisations.length > 0 && (
                <div
                  className={[
                    "organization-overview-card__content__text-content__name-container__payment-badge",
                    "organization-overview-card__content__text-content__name-container__payment-badge--services",
                  ].join(" ")}
                >
                  <p className="small-text">
                    {t ? t("services") : "Services"}:{" "}
                    {formattedSpecialisations.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="organization-overview-card__content__body">
          {specialisationsText && (
            <p className="text organization-overview-card__types">
              {specialisationsText}
            </p>
          )}
          {(address || phone) && (
            <div className="organization-overview-card__meta">
              <div className="organization-overview-card__meta__info">
                {address && (
                  <div className="organization-overview-card__address">
                    <div>
                      <Icon name="location" size="md" color="#66768D" />
                    </div>
                    <p className="text">{address}</p>
                  </div>
                )}
                {phone && (
                  <div className="organization-overview-card__address">
                    <div>
                      <Icon name="phone" size="md" color="#66768D" />
                    </div>
                    <p className="text">{phone.split("\n").join(" / ")}</p>
                  </div>
                )}
              </div>
              <div className="organization-overview-card__meta__cta">
                <NewButton
                  size="sm"
                  type="outline"
                  isFullWidth
                  iconName="eye"
                  label={
                    t ? t("view_organization_details") : "View organization"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick && onClick();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

OrganizationOverview.propTypes = {
  /**
   * Organization name
   */
  name: PropTypes.string.isRequired,

  /**
   * Image URL for the organization
   */
  image: PropTypes.string,

  /**
   * Payment method object
   */
  paymentMethod: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),

  /**
   * Array of specialisations
   */
  specialisations: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ]),
  ),

  /**
   * Organization address
   */
  address: PropTypes.string,

  /**
   * Click handler
   */
  onClick: PropTypes.func,

  /**
   * Translation function
   */
  t: PropTypes.func,
};

OrganizationOverview.propTypes = {
  ...OrganizationOverview.propTypes,
  /**
   * Icon color in HEX format
   */
  iconColor: PropTypes.string,
};

OrganizationOverview.defaultProps = {
  onClick: () => {},
  specialisations: [],
};
