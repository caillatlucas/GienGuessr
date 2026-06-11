import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MiniMapProps {
  onMarkerPlaced: (lat: number, lng: number) => void;
  isInteractive: boolean;
  guessedPosition?: { lat: number; lng: number } | null;
}

const center: [number, number] = [47.6847, 2.6316]; // Centre de Gien

// Component to handle map clicks
const MapEvents: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
  isInteractive: boolean;
}> = ({ onMapClick, isInteractive }) => {
  useMapEvents({
    click(e) {
      if (isInteractive) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
};

export const MiniMap: React.FC<MiniMapProps> = ({ onMarkerPlaced, isInteractive, guessedPosition }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(guessedPosition || null);

  // Sync prop changes
  useEffect(() => {
    if (guessedPosition !== undefined) {
      setPosition(guessedPosition);
    }
  }, [guessedPosition]);

  const handleMapClick = (lat: number, lng: number) => {
    setPosition({ lat, lng });
    onMarkerPlaced(lat, lng);
  };

  return (
    <div className={`mini-map-container ${!isInteractive ? 'read-only' : ''}`}>
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={isInteractive} 
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        dragging={isInteractive}
        zoomControl={isInteractive}
        doubleClickZoom={isInteractive}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onMapClick={handleMapClick} isInteractive={isInteractive} />
        {position && <Marker position={[position.lat, position.lng]} />}
      </MapContainer>
    </div>
  );
};
