import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { Input } from "../Input";
import { Loading } from "../../loaders/Loading";

import "./place-input.scss";

/**
 * PlaceInput with Autocomplete
 *
 * Input component with Google Places Autocomplete for address selection
 * Returns formatted address and coordinates
 *
 * @return {jsx}
 */
export const PlaceInput = ({
  apiKey,
  onPlaceData,
  onError,
  placeholder = "Start typing an address...",
  label = "Address",
  disabled = false,
  classes,
  value = "",
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  // Update input value when prop changes
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || "");
    }
  }, [value]);

  /**
   * Fetches autocomplete suggestions from Google Places API
   */
  const fetchSuggestions = useCallback(
    async (query) => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      if (!apiKey) {
        setErrorMessage("API key is required");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          "https://places.googleapis.com/v1/places:autocomplete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
            },
            body: JSON.stringify({
              input: query,
              includedPrimaryTypes: ["establishment", "geocode"],
              languageCode: "en",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const suggestions = data.suggestions || [];

        setSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Autocomplete error:", error);
        setErrorMessage("Failed to fetch suggestions");
        setSuggestions([]);
        setShowSuggestions(false);

        if (onError) {
          onError(error, query);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, onError]
  );

  /**
   * Fetches detailed place information using Place ID
   */
  const fetchPlaceDetails = useCallback(
    async (placeId) => {
      if (!placeId || !apiKey) return;

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "formattedAddress,location",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        // Call success callback with place data
        if (onPlaceData) {
          onPlaceData(
            {
              formattedAddress: data.formattedAddress,
              location: data.location,
            },
            placeId
          );
        }

        setErrorMessage("");
        setShowSuggestions(false);
      } catch (error) {
        console.error("Place details error:", error);
        setErrorMessage("Failed to fetch place details");

        if (onError) {
          onError(error, placeId);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, onPlaceData, onError]
  );

  /**
   * Handles input change with debounced autocomplete
   */
  const handleInputChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (errorMessage) {
        setErrorMessage("");
      }

      // Debounce autocomplete requests
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        fetchSuggestions(newValue);
      }, 500);
    },
    [errorMessage, fetchSuggestions]
  );

  /**
   * Handles suggestion selection
   */
  const handleSuggestionSelect = useCallback(
    (suggestion) => {
      const placeId = suggestion.placePrediction?.placeId;
      const text = suggestion.placePrediction?.text?.text || "";

      setInputValue(text);
      setShowSuggestions(false);
      setSuggestions([]);
      setSelectedIndex(-1);

      if (placeId) {
        fetchPlaceDetails(placeId);
      }
    },
    [fetchPlaceDetails]
  );

  /**
   * Handles keyboard navigation
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (!showSuggestions || suggestions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;

        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            handleSuggestionSelect(suggestions[selectedIndex]);
          }
          break;

        case "Escape":
          setShowSuggestions(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [showSuggestions, suggestions, selectedIndex, handleSuggestionSelect]
  );

  /**
   * Handles input blur
   */
  const handleBlur = useCallback((e) => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 150);
  }, []);

  /**
   * Handles input focus
   */
  const handleFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [suggestions.length]);

  return (
    <div className="place-input-container">
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        label={label}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        errorMessage={errorMessage}
        classes={`${classes} ${showSuggestions ? "has-suggestions" : ""}`}
        autoComplete="off"
        {...rest}
      >
        {/* Loading indicator */}
        {isLoading && <Loading size="sm" padding={"0"} />}
      </Input>

      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="place-suggestions" ref={suggestionsRef}>
          {suggestions.map((suggestion, index) => {
            const prediction = suggestion.placePrediction;
            if (!prediction) return null;

            const mainText =
              prediction.structuredFormat?.mainText?.text ||
              prediction.text?.text ||
              "";
            const secondaryText =
              prediction.structuredFormat?.secondaryText?.text || "";

            return (
              <div
                key={prediction.placeId || index}
                className={`place-suggestion ${
                  index === selectedIndex ? "selected" : ""
                }`}
                onClick={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="place-suggestion__main">{mainText}</div>
                {secondaryText && (
                  <div className="place-suggestion__secondary">
                    {secondaryText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

PlaceInput.propTypes = {
  /**
   * Google Places API key
   */
  apiKey: PropTypes.string.isRequired,

  /**
   * Callback fired when place data is successfully retrieved
   */
  onPlaceData: PropTypes.func,

  /**
   * Callback fired when an error occurs
   */
  onError: PropTypes.func,

  /**
   * Input placeholder text
   */
  placeholder: PropTypes.string,

  /**
   * Input label
   */
  label: PropTypes.string,

  /**
   * Whether the input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Additional CSS classes
   */
  classes: PropTypes.string,

  /**
   * Input value
   */
  value: PropTypes.string,
};

export default PlaceInput;
