import React from "react";
import PropTypes from "prop-types";

import { Box } from "../../boxes/Box/Box";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";

import "./organization-overview.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * OrganizationOverview
 *
 * Organization overview card component that displays key organization information
 *
 * @return {jsx}
 */
export const OrganizationOverview = ({
  name,
  unitName,
  image,
  paymentMethod,
  specialisations = [],
  address,
  onClick,
  t,
}) => {
  const imageURI =
    image && image !== "default" ? `${AMAZON_S3_BUCKET}/${image}` : null;

  return (
    <Box onClick={onClick} shadow={2} classes="organization-overview-card">
      {/* <Avatar image={imageURI} size="sm" /> */}
      <div className="organization-overview-card__content">
        <div className="organization-overview-card__content__text-content">
          <div className="organization-overview-card__content__text-content__name-container">
            <div className="organization-overview-card__content__text-content__name-container__name-wrapper">
              <p className="organization-overview-card__content__text-content__name">
                {name}
              </p>
              {unitName && (
                <p className="organization-overview-card__content__text-content__unit-name small-text">
                  {unitName}
                </p>
              )}
            </div>
            {paymentMethod?.id && (
              <div
                className={[
                  "organization-overview-card__content__text-content__name-container__payment-badge",
                  (paymentMethod.name === "free" ||
                    paymentMethod.id === "free") &&
                    "organization-overview-card__content__text-content__name-container__payment-badge--free",
                ].join(" ")}
              >
                <p className="small-text">
                  {t ? t(paymentMethod.name) : paymentMethod.name}
                </p>
              </div>
            )}
          </div>
          {specialisations && specialisations.length > 0 && (
            <div className="organization-overview-card__types">
              <p className="small-text">
                {specialisations
                  .map((spec) => {
                    const specName =
                      typeof spec === "string" ? spec : spec.name;
                    return t ? t(specName) : specName;
                  })
                  .join(", ")}
              </p>
            </div>
          )}
          {address && (
            <div className="organization-overview-card__address">
              <div>
                <Icon name="location" size="sm" color="#20809E" />
              </div>
              <p className="small-text">{address}</p>
            </div>
          )}
        </div>
        <div>
          <Icon name="arrow-chevron-forward" size="md" color="#20809E" />
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
   * Unit name of the organization
   */
  unitName: PropTypes.string,

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
    ])
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

OrganizationOverview.defaultProps = {
  onClick: () => {},
  specialisations: [],
};
