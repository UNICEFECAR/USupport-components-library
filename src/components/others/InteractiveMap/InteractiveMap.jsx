import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClusterer,
} from "@react-google-maps/api";
import classNames from "classnames";

import { Loading } from "../../loaders";
import { ButtonOnlyIcon } from "../../buttons";

import "./interactive-map.scss";

/**
 * InteractiveMap
 *
 * Interactive map component with user location functionality
 * Loads initial view on client location if available, otherwise defaults to Bucharest
 *
 * @return {jsx}
 */
export const InteractiveMap = ({ providers, classes, onMapReady }) => {
  const [map, setMap] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(null);

  const [initialCenter, setInitialCenter] = React.useState({
    lat: 44.4268,
    lng: 26.1025,
  }); // Bucharest default
  const [hasSetInitialView, setHasSetInitialView] = React.useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    React.useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onMapLoad = React.useCallback(
    (mapInstance) => {
      setMap(mapInstance);

      // Pass the zoom function to parent component
      if (onMapReady) {
        onMapReady({
          zoomToLocation: (lat, lng, zoom = 12) => {
            mapInstance.panTo({ lat, lng });
            mapInstance.setZoom(zoom);
          },
        });
      }
    },
    [onMapReady]
  );

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  // Request user's current location
  const requestUserLocation = React.useCallback(
    (isInitialLoad = false) => {
      if (!navigator.geolocation) {
        if (isInitialLoad) {
          setHasSetInitialView(true);
        }
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };

          setUserLocation(location);

          if (isInitialLoad) {
            setInitialCenter(location);
            setHasSetInitialView(true);
          }

          if (map) {
            map.panTo(location);
            map.setZoom(8);
          }
        },
        (error) => {
          if (isInitialLoad) {
            setHasSetInitialView(true);
          }

          if (error.code === error.PERMISSION_DENIED) {
            setLocationPermissionDenied(true);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    },
    [map]
  );

  React.useEffect(() => {
    if (isLoaded && !hasSetInitialView) {
      requestUserLocation(true);
    }
  }, [isLoaded, hasSetInitialView, requestUserLocation]);

  const handleManualLocationRequest = React.useCallback(() => {
    requestUserLocation(false);
  }, [requestUserLocation]);

  const renderMarkers = () => {
    return providers.map((provider, index) => (
      <MarkerF
        key={`marker-${provider.providerDetailId}-${index}`}
        position={{
          lat: provider.address.lat,
          lng: provider.address.lng,
        }}
        title={provider.name}
      />
    ));
  };

  const renderUserLocationMarker = () => {
    if (!userLocation) return null;

    return (
      <MarkerF
        position={userLocation}
        title="Your Location"
        icon={{
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#9749fa" stroke="#ffffff" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 24),
          anchor: new window.google.maps.Point(12, 12),
        }}
      />
    );
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className={["interactive-map", classNames(classes)].join(" ")}>
      <GoogleMap
        mapContainerClassName="interactive-map__container"
        center={initialCenter}
        zoom={userLocation ? 8 : 6}
        options={mapOptions}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      >
        {renderMarkers()}
        {renderUserLocationMarker()}
      </GoogleMap>

      {!locationPermissionDenied && (
        <div className="interactive-map__controls">
          <ButtonOnlyIcon
            iconName="current-location"
            iconSize="lg"
            onClick={handleManualLocationRequest}
          />
        </div>
      )}
    </div>
  );
};

const mapOptions = {
  disableDefaultUI: true,
  gestureHandling: "greedy",
  clickableIcons: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

InteractiveMap.defaultProps = {
  /**
   * Array of provider locations to display on the map
   */
  providers: [],

  /**
   * Custom CSS classes for the map container
   */
  classes: "",

  /**
   * Callback function called when map is ready with map controls
   */
  onMapReady: null,
};
