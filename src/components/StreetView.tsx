import React from 'react';
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface StreetViewProps {
  lat: number;
  lng: number;
}

export const StreetView: React.FC<StreetViewProps> = ({ lat, lng }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
  });

  if (loadError) {
    return <div className="street-view-error">Erreur de chargement de la carte Google Maps.</div>;
  }

  if (!isLoaded) {
    return <div className="street-view-loading">Chargement de la Street View...</div>;
  }

  if (!apiKey) {
    return (
      <div className="street-view-error">
        <h2>Clé API Manquante</h2>
        <p>Veuillez configurer VITE_GOOGLE_MAPS_API_KEY dans le fichier .env</p>
      </div>
    );
  }

  return (
    <div className="street-view-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={14}
        options={{
          disableDefaultUI: true,
        }}
      >
        <StreetViewPanorama
          options={{
            position: { lat, lng },
            visible: true,
            disableDefaultUI: true,
            showRoadLabels: false,
            clickToGo: true,
            addressControl: false,
            zoomControl: true,
            panControl: true,
            linksControl: true,
            enableCloseButton: false,
            fullscreenControl: false,
          }}
        />
      </GoogleMap>
    </div>
  );
};
