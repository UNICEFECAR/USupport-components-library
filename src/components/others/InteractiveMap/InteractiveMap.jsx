import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import classNames from "classnames";

import { Loading } from "../../loaders";
import { ButtonOnlyIcon } from "../../buttons";
import { MapProvider } from "../../cards";

import "./interactive-map.scss";

/**
 * InteractiveMap
 *
 * Interactive map component with user location functionality
 * Loads initial view on client location if available, otherwise defaults to Bucharest
 *
 * @return {jsx}
 */
export const InteractiveMap = ({
  providers,
  classes,
  onMapReady,
  onProviderSelect, // Add prop for handling provider selection
  t, // Add translation prop
  freeLabel = "Free", // Add free label prop
}) => {
  const [map, setMap] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const [initialCenter, setInitialCenter] = React.useState({
    lat: 44.4268,
    lng: 26.1025,
  }); // Default to Bucharest coordinates
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

      if (onMapReady) {
        onMapReady({
          zoomToLocation: (lat, lng, zoom = 12) => {
            mapInstance.panTo({ lat, lng });
            mapInstance.setZoom(zoom);
          },
          selectProvider: (provider) => {
            // Close any existing info window first
            setSelectedMarker(null);
            // Open the new info window with a small delay to ensure clean transition
            setTimeout(() => {
              setSelectedMarker(provider);
            }, 100);
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

  const handleMarkerClick = React.useCallback((provider) => {
    setSelectedMarker(null);
    setTimeout(() => {
      setSelectedMarker(provider);
    }, 0);
  }, []);

  const handleInfoWindowClose = React.useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const handleProviderViewProfile = React.useCallback(
    (provider) => {
      if (onProviderSelect) {
        onProviderSelect(provider);
      }
      setSelectedMarker(null);
    },
    [onProviderSelect]
  );

  const renderMarkers = () => {
    return providers.map((provider, index) => (
      <MarkerF
        key={`marker-${provider.providerDetailId}-${index}`}
        position={{
          lat: provider.address.lat,
          lng: provider.address.lng,
        }}
        title={provider.name}
        onClick={() => handleMarkerClick(provider)}
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

  const renderInfoWindow = () => {
    if (!selectedMarker) return null;

    return (
      <InfoWindowF
        key={`info-window-${selectedMarker.providerDetailId}`}
        position={{
          lat: selectedMarker.address.lat,
          lng: selectedMarker.address.lng,
        }}
        options={{
          pixelOffset: new window.google.maps.Size(0, -38),
          disableAutoPan: false,
        }}
        onCloseClick={handleInfoWindowClose}
      >
        <MapProvider
          image={selectedMarker.image}
          name={selectedMarker.name}
          patronym={selectedMarker.patronym}
          surname={selectedMarker.surname}
          specializations={selectedMarker.specializations}
          price={selectedMarker.price}
          freeLabel={freeLabel}
          providerStatus={selectedMarker.providerStatus}
          earliestAvailableSlot={selectedMarker.earliestAvailableSlot}
          onViewProfile={() => handleProviderViewProfile(selectedMarker)}
          geolocation={{
            lat: selectedMarker.address.lat,
            lng: selectedMarker.address.lng,
          }}
          t={t}
        />
      </InfoWindowF>
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
        onClick={() => setSelectedMarker(null)} // Close info window when clicking on map
      >
        {renderMarkers()}
        {renderUserLocationMarker()}
        {renderInfoWindow()}
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

  /**
   * Callback function called when a provider is selected from the map
   */
  onProviderSelect: null,

  /**
   * Translation function
   */
  t: (key) => key,

  /**
   * Label for free services
   */
  freeLabel: "Free",
};
