import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import type { LocationData } from '../utils/gameData';
import { MapPin, Target } from 'lucide-react';

interface RoundResultProps {
  actualLocation: LocationData;
  guessedPosition: { lat: number; lng: number };
  distance: number;
  score: number;
  onNextRound: () => void;
  isLastRound: boolean;
}

// Icon for correct location
const correctIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Icon for guessed location
const guessIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const RoundResult: React.FC<RoundResultProps> = ({
  actualLocation,
  guessedPosition,
  distance,
  score,
  onNextRound,
  isLastRound
}) => {
  const bounds = L.latLngBounds(
    [actualLocation.lat, actualLocation.lng],
    [guessedPosition.lat, guessedPosition.lng]
  );

  const polylinePositions: [number, number][] = [
    [actualLocation.lat, actualLocation.lng],
    [guessedPosition.lat, guessedPosition.lng]
  ];

  return (
    <div className="overlay-container glass-panel animate-fade-in">
      <div className="result-card">
        <h2>Résultat de la manche</h2>
        
        <div className="stats-grid">
          <div className="stat-box">
            <MapPin className="stat-icon" />
            <span className="stat-label">Distance</span>
            <span className="stat-value">
              {distance > 1000 ? `${(distance / 1000).toFixed(2)} km` : `${Math.round(distance)} m`}
            </span>
          </div>
          <div className="stat-box">
            <Target className="stat-icon" />
            <span className="stat-label">Points gagnés</span>
            <span className="stat-value text-accent">{score}</span>
          </div>
        </div>

        <p className="location-name">
          C'était : <strong>{actualLocation.name}</strong>
        </p>

        <div className="result-map-wrapper">
          <MapContainer 
            bounds={bounds}
            boundsOptions={{ padding: [50, 50] }}
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[actualLocation.lat, actualLocation.lng]} icon={correctIcon} />
            <Marker position={[guessedPosition.lat, guessedPosition.lng]} icon={guessIcon} />
            <Polyline positions={polylinePositions} color="#ff3e3e" dashArray="10, 10" />
          </MapContainer>
        </div>

        <button className="primary-btn mt-4" onClick={onNextRound}>
          {isLastRound ? "Voir le score final" : "Manche suivante"}
        </button>
      </div>
    </div>
  );
};
