import React from "react";
import PropTypes from "prop-types";

import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import { StatusBadge } from "../StatusBadge";

import { getDateView, getDayOfTheWeek } from "../../../utils/date";

import "./map-provider.scss";
import { ButtonWithIcon } from "../../buttons";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * MapProvider
 * MapProvider component used in the interactive map
 *
 * @return {jsx}
 */
export const MapProvider = ({
  image,
  name,
  patronym,
  surname,
  specializations,
  freeLabel,
  price,
  providerStatus,
  earliestAvailableSlot,
  geolocation,
  t,
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");

  const displayName = patronym
    ? `${name} ${patronym} ${surname}`
    : `${name} ${surname}`;

  const earliestSlot = new Date(earliestAvailableSlot);
  const dayOfWeek = t(getDayOfTheWeek(earliestSlot));
  const dateText = `${dayOfWeek} ${getDateView(earliestSlot).slice(0, 5)}`;

  const startHour = earliestSlot.getHours();
  const endHour = startHour + 1;
  const timeText = earliestSlot
    ? `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${
        endHour < 10 ? `0${endHour}` : endHour
      }:00`
    : "";

  const navigateToParking = (app) => {
    if (parking && parking.location) {
      const { lat, lng } = parking.location;
      let navigationUrl = "";

      if (app === "google") {
        navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
      } else if (app === "waze") {
        navigationUrl = `https://www.waze.com/ul?ll=${geolocation.lat},${geolocation.lng}&navigate=yes`;
      }

      window.open(navigationUrl, "_blank");
    } else {
      console.log("Parking position is not available.");
    }
  };

  return (
    <div className="map-provider">
      <Avatar image={AMAZON_S3_BUCKET + "/" + image} size="md" />
      <p className="text map-provider__name">{displayName}</p>
      <div
        className={[
          "map-provider__price-badge",
          !price && "map-provider__price-badge--free",
        ].join(" ")}
      >
        <p className="small-text">
          {price ? `${price}${currencySymbol}` : freeLabel}
        </p>
      </div>
      {providerStatus && (
        <StatusBadge status={providerStatus} label={t(providerStatus)} />
      )}

      <div className="map-provider__content">
        <p className="small-text map-provider__specializations">
          {specializations?.join(", ")}
        </p>

        {earliestAvailableSlot && (
          <div className="map-provider__availability">
            <p className="small-text map-provider__earliest-text">
              {t("earliest_available_slot")}
            </p>
            <div className="map-provider__earliest-container">
              <Icon name="calendar" size="sm" color={"#66768D"} />
              <div className="map-provider__earliest-container__text">
                <p className="small-text">{dateText}</p>
                <p className="small-text">{timeText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="map-provider__btn-container">
        <ButtonWithIcon
          label={"Google Maps"}
          iconName="google-maps"
          type="secondary"
          size="sm"
        />
        <ButtonWithIcon
          label={"Waze"}
          iconName="waze"
          type="secondary"
          size="sm"
        />
      </div>
    </div>
  );
};

MapProvider.propTypes = {
  /**
   * Image url
   */
  image: PropTypes.string,

  /**
   * Name of the provider
   */
  name: PropTypes.string,

  /**
   * Patronym of the provider
   */
  patronym: PropTypes.string,

  /**
   * Surname of the provider
   */
  surname: PropTypes.string,

  /**
   * Specializations of the provider
   */
  specializations: PropTypes.array,

  /**
   * Label for free service
   */
  freeLabel: PropTypes.string,

  /**
   * Price of the service
   */
  price: PropTypes.number,

  /**
   * Provider status
   */
  providerStatus: PropTypes.string,

  /**
   * Earliest available slot
   */
  earliestAvailableSlot: PropTypes.string,

  /**
   * Translation function
   */
  t: PropTypes.func,
};

MapProvider.defaultProps = {
  freeLabel: "Free",
  specializations: [],
  t: (key) => key,
};
