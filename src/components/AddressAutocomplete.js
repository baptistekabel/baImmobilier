import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &.loading {
    background: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" fill="%23999"><animate attributeName="r" values="3;6;3" dur="1s" repeatCount="indefinite"/></circle></svg>') no-repeat right 10px center;
    background-size: 16px;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;

  &:hover, &.highlighted {
    background-color: ${props => props.theme.colors.lightGray};
  }

  &:last-child {
    border-bottom: none;
  }

  .main-text {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }

  .secondary-text {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.2rem;
  }
`;

const AddressAutocomplete = ({ value, onChange, placeholder = "Tapez votre adresse...", name, required }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [apiReady, setApiReady] = useState(false);

  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    const initGoogleServices = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
        const mapDiv = document.createElement('div');
        const map = new window.google.maps.Map(mapDiv);
        placesService.current = new window.google.maps.places.PlacesService(map);
        setApiReady(true);
        console.log('Google Places API services initialized');
      } else {
        console.log('Google Maps API not yet loaded, retrying...');
        setTimeout(initGoogleServices, 100);
      }
    };

    // Vérifier si l'API est déjà chargée
    if (window.google) {
      initGoogleServices();
    } else {
      // Attendre que l'API soit chargée
      window.addEventListener('load', initGoogleServices);
      setTimeout(initGoogleServices, 1000); // Fallback
    }

    return () => {
      window.removeEventListener('load', initGoogleServices);
    };
  }, []);

  const searchAddresses = (query) => {
    if (!autocompleteService.current || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    const request = {
      input: query
      // Configuration minimale pour laisser Google Places retourner tout ce qu'il trouve
    };

    autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
      setIsLoading(false);

      console.log('Google Places API Response:', {
        query,
        status: status,
        predictions: predictions?.length || 0,
        firstResult: predictions?.[0]?.description
      });

      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions);
        setShowSuggestions(true);
        setHighlightedIndex(-1);
      } else {
        console.warn('Google Places API Error:', status);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Notifier le parent du changement
    if (onChange) {
      onChange({
        target: {
          name: name || 'address',
          value: newValue
        }
      });
    }

    // Rechercher des suggestions
    searchAddresses(newValue);
  };

  const getPlaceDetails = (placeId, description) => {
    if (!placesService.current) {
      handleSelectSuggestion(description);
      return;
    }

    const request = {
      placeId: placeId,
      fields: ['address_components', 'formatted_address', 'geometry']
    };

    placesService.current.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        // Extraire les informations de l'adresse
        let city = '';
        let country = '';
        let region = 'Africa'; // Par défaut

        place.address_components.forEach(component => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1') && !city) {
            city = component.long_name; // Fallback si pas de locality
          }
          if (component.types.includes('country')) {
            const countryCode = component.short_name;
            const countryName = component.long_name;

            // Mapper les pays selon vos options
            switch (countryCode) {
              case 'SN':
                country = 'Sénégal';
                region = 'Africa';
                break;
              case 'ML':
                country = 'Mali';
                region = 'Africa';
                break;
              case 'BF':
                country = 'Burkina Faso';
                region = 'Africa';
                break;
              case 'FR':
                country = 'France';
                region = 'Europe';
                break;
              case 'GP':
                country = 'Guadeloupe';
                region = 'Caribbean';
                break;
              case 'MQ':
                country = 'Martinique';
                region = 'Caribbean';
                break;
              case 'GF':
                country = 'Guyane française';
                region = 'Caribbean';
                break;
              case 'RE':
                country = 'La Réunion';
                region = 'Africa';
                break;
              case 'YT':
                country = 'Mayotte';
                region = 'Africa';
                break;
              default:
                country = countryName;
                region = 'Africa';
                break;
            }
          }
        });

        // Notifier le parent avec les détails complets
        if (onChange) {
          onChange({
            target: {
              name: name || 'address',
              value: place.formatted_address
            }
          }, {
            fullAddress: place.formatted_address,
            city: city,
            country: country,
            region: region,
            coordinates: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }
          });
        }

        setInputValue(place.formatted_address);
      } else {
        handleSelectSuggestion(description);
      }
    });
  };

  const handleSelectSuggestion = (suggestion) => {
    if (typeof suggestion === 'object' && suggestion.place_id) {
      getPlaceDetails(suggestion.place_id, suggestion.description);
    } else {
      setInputValue(suggestion);
      if (onChange) {
        onChange({
          target: {
            name: name || 'address',
            value: suggestion
          }
        });
      }
    }

    setSuggestions([]);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelectSuggestion(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Délai pour permettre le clic sur une suggestion
    setTimeout(() => {
      setShowSuggestions(false);
      setSuggestions([]);
      setHighlightedIndex(-1);
    }, 200);
  };

  return (
    <AutocompleteContainer>
      <AddressInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={apiReady ? placeholder : "Chargement de l'API Google Maps..."}
        className={isLoading ? 'loading' : ''}
        name={name}
        required={required}
        autoComplete="off"
        disabled={!apiReady}
      />

      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={suggestion.place_id}
              className={index === highlightedIndex ? 'highlighted' : ''}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="main-text">
                {suggestion.structured_formatting?.main_text || suggestion.description}
              </div>
              <div className="secondary-text">
                {suggestion.structured_formatting?.secondary_text || ''}
              </div>
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutocompleteContainer>
  );
};

export default AddressAutocomplete;