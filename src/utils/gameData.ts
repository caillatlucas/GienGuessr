export interface LocationData {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export const GIEN_LOCATIONS: LocationData[] = [
  {
    id: "chateau",
    name: "Château de Gien",
    lat: 47.68625,
    lng: 2.63230,
  },
  {
    id: "pont",
    name: "Vieux Pont de Gien",
    lat: 47.68385,
    lng: 2.62831,
  },
  {
    id: "faiencerie",
    name: "Faïencerie de Gien",
    lat: 47.69167,
    lng: 2.61860,
  },
  {
    id: "eglise",
    name: "Église Sainte-Jeanne d'Arc",
    lat: 47.68604,
    lng: 2.63162,
  },
  {
    id: "quais",
    name: "Quai de Sully",
    lat: 47.68426,
    lng: 2.63450,
  },
  {
    id: "place_jean_jaures",
    name: "Place Jean Jaurès",
    lat: 47.68715,
    lng: 2.63060,
  },
  {
    id: "gare",
    name: "Gare de Gien",
    lat: 47.69512,
    lng: 2.62350,
  },
];

export const getRandomLocations = (count: number): LocationData[] => {
  const shuffled = [...GIEN_LOCATIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
