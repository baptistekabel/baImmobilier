import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const MapContainer = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const GoogleMapDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  /* S'assurer que tous les contrôles Google Maps sont interactifs */
  .gm-control-active {
    pointer-events: auto !important;
  }

  /* Contrôles de zoom spécifiquement */
  .gm-bundled-control {
    pointer-events: auto !important;
  }

  /* Permettre toutes les interactions sur la carte */
  .gm-style {
    pointer-events: auto !important;
  }
`;

const PrivacyBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

// Composant Google Map
const GoogleMapComponent = ({ location }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      // Coordonnées approximatives basées sur la région et la ville
      const getCoordinates = () => {
        const { country, region } = location;

        // Coordonnées approximatives par défaut pour les régions
        if (region === 'Africa') {
          // Coordonnées pour l'Afrique (exemple: Maroc/Sénégal)
          if (country?.toLowerCase().includes('maroc')) {
            return { lat: 33.9716, lng: -6.8498 }; // Rabat
          } else if (country?.toLowerCase().includes('sénégal')) {
            return { lat: 14.7167, lng: -17.4677 }; // Dakar
          }
          return { lat: 14.7167, lng: -17.4677 }; // Par défaut Dakar
        } else {
          // Coordonnées pour les Antilles
          if (country?.toLowerCase().includes('martinique')) {
            return { lat: 14.6415, lng: -61.0242 }; // Fort-de-France
          } else if (country?.toLowerCase().includes('guadeloupe')) {
            return { lat: 16.2650, lng: -61.5510 }; // Basse-Terre
          }
          return { lat: 14.6415, lng: -61.0242 }; // Par défaut Martinique
        }
      };

      const coordinates = getCoordinates();

      const newMap = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: coordinates,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Créer un cercle au lieu d'un marqueur pour une meilleure gestion du zoom
      const circle = new window.google.maps.Circle({
        strokeColor: '#2980b9',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3498db',
        fillOpacity: 0.2,
        map: newMap,
        center: coordinates,
        radius: 1500, // Rayon en mètres (1.5km)
      });

      // Ajuster le rayon en fonction du zoom
      const updateCircleRadius = () => {
        const zoom = newMap.getZoom();
        let radius;

        if (zoom <= 10) {
          radius = 2000; // 2km pour zoom éloigné
        } else if (zoom <= 12) {
          radius = 1500; // 1.5km pour zoom moyen
        } else if (zoom <= 14) {
          radius = 1000; // 1km pour zoom proche
        } else {
          radius = 500; // 500m pour zoom très proche
        }

        circle.setRadius(radius);
      };

      // Écouter les changements de zoom
      newMap.addListener('zoom_changed', updateCircleRadius);

      // Empêcher la propagation des événements de la carte vers le parent
      newMap.addListener('click', (e) => {
        e.stop();
      });

      // Appliquer le rayon initial
      updateCircleRadius();

      setMap(newMap);
    }
  }, [location, map]);

  return <GoogleMapDiv ref={mapRef} />;
};

// Composant de rendu des statuts
const MapStatus = ({ status }) => {
  switch (status) {
    case Status.LOADING:
      return (
        <LoadingContainer>
          <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
          Chargement de la carte...
        </LoadingContainer>
      );
    case Status.FAILURE:
      return (
        <LoadingContainer style={{ background: '#e74c3c' }}>
          <FaInfoCircle style={{ marginRight: '0.5rem' }} />
          Erreur de chargement
        </LoadingContainer>
      );
    default:
      return null;
  }
};

const ApproximateLocationMap = ({ location, className, style }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <MapContainer className={className} style={style}>
        <LoadingContainer style={{ background: '#f39c12' }}>
          <FaInfoCircle style={{ marginRight: '0.5rem' }} />
          Clé API Google Maps manquante
        </LoadingContainer>
      </MapContainer>
    );
  }

  if (!location) {
    return (
      <MapContainer className={className} style={style}>
        <LoadingContainer>
          <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
          Aucune localisation disponible
        </LoadingContainer>
      </MapContainer>
    );
  }

  const handleMapClick = (e) => {
    // Empêcher la propagation seulement si ce n'est pas un contrôle Google Maps
    e.stopPropagation();
  };

  return (
    <MapContainer className={className} style={style} onClick={handleMapClick}>
      <Wrapper apiKey={apiKey} render={MapStatus}>
        <GoogleMapComponent location={location} />
      </Wrapper>

      <PrivacyBadge>
        <FaInfoCircle />
        Zone approximative
      </PrivacyBadge>
    </MapContainer>
  );
};

export default ApproximateLocationMap;