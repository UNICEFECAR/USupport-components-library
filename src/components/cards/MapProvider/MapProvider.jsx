import React from "react";
import PropTypes from "prop-types";

import { Avatar } from "../../avatars/Avatar/Avatar";

import "./map-provider.scss";
import { ButtonWithIcon } from "../../buttons";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * MapProvider
 * MapProvider component used in the interactive map for organizations
 *
 * @return {jsx}
 */
export const MapProvider = ({ organization, t, navigate }) => {
  const displayName = organization.name;
  const unitName = organization.unitName;
  const paymentMethod = organization.paymentMethod;
  const specializations = organization.specialisations || [];

  const geolocation = {
    lat: organization.location?.latitude,
    lng: organization.location?.longitude,
  };

  const navigateToOrganization = (app) => {
    if (geolocation && geolocation.lat && geolocation.lng) {
      const { lat, lng } = geolocation;
      let navigationUrl = "";

      if (app === "google") {
        navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
      } else if (app === "waze") {
        navigationUrl = `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
      }

      window.open(navigationUrl, "_blank");
    } else {
      console.log("Organization location is not available for navigation.");
    }
  };

  return (
    <div className="map-provider map-provider--organization">
      {organization.image && (
        <Avatar image={AMAZON_S3_BUCKET + "/" + organization.image} size="md" />
      )}

      <p className="text map-provider__name">{displayName}</p>

      {unitName && (
        <p className="small-text map-provider__unit-name">{unitName}</p>
      )}

      <div className="map-provider__payment-container">
        {paymentMethod && (
          <div className="map-provider__payment-badge">
            <p className="small-text map-provider__payment-text">
              {t(paymentMethod.name)}
            </p>
          </div>
        )}
      </div>

      <div className="map-provider__content">
        {specializations.length > 0 && (
          <p className="small-text map-provider__specializations">
            {specializations
              .map((spec) => t(typeof spec === "string" ? spec : spec.name))
              .join(", ")}
          </p>
        )}

        <div className="map-provider__contact-info">
          {organization.phone && (
            <div className="map-provider__contact-item">
              <p className="small-text">
                <span className="map-provider__contact-label">
                  {t("phone")}:
                </span>{" "}
                {organization.phone}
              </p>
            </div>
          )}
          {organization.email && (
            <div className="map-provider__contact-item">
              <p className="small-text">
                <span className="map-provider__contact-label">
                  {t("email")}:
                </span>{" "}
                {organization.email}
              </p>
            </div>
          )}
          {organization.address && (
            <div className="map-provider__contact-item">
              <p className="small-text">
                <span className="map-provider__contact-label">
                  {t("address")}:
                </span>{" "}
                {organization.address}
              </p>
            </div>
          )}
        </div>

        <div className="map-provider__more-info">
          <ButtonWithIcon
            label={t("view_organization_details")}
            iconName="info"
            type="secondary"
            size="sm"
            onClick={() =>
              navigate(`/organization-overview/${organization.organizationId}`)
            }
          />
        </div>
      </div>

      {geolocation && geolocation.lat && geolocation.lng && (
        <div className="map-provider__btn-container">
          <ButtonWithIcon
            label={"Google Maps"}
            iconName="google-maps"
            type="secondary"
            size="sm"
            onClick={() => navigateToOrganization("google")}
          />
          <ButtonWithIcon
            label={"Waze"}
            iconName="waze"
            type="secondary"
            size="sm"
            onClick={() => navigateToOrganization("waze")}
          />
        </div>
      )}
    </div>
  );
};

MapProvider.propTypes = {
  /**
   * Organization data object
   */
  organization: PropTypes.shape({
    organizationId: PropTypes.string,
    name: PropTypes.string.isRequired,
    unitName: PropTypes.string,
    websiteUrl: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
    }),
    district: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    paymentMethod: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    userInteraction: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    workWith: PropTypes.array,
    providers: PropTypes.array,
    specialisations: PropTypes.array,
    image: PropTypes.string,
  }).isRequired,

  /**
   * Translation function
   */
  t: PropTypes.func,

  /**
   * Navigation function
   */
  navigate: PropTypes.func,
};
