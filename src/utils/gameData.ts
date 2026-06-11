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
    lat: 47.6859,
    lng: 2.6321,
  },
  {
    id: "pont",
    name: "Vieux Pont de Gien",
    lat: 47.6841,
    lng: 2.6288,
  },
  {
    id: "faiencerie",
    name: "Faïencerie de Gien",
    lat: 47.6917,
    lng: 2.6186,
  },
  {
    id: "eglise",
    name: "Église Sainte-Jeanne d'Arc",
    lat: 47.6860,
    lng: 2.6315,
  },
  {
    id: "quais",
    name: "Quai de Sully",
    lat: 47.6845,
    lng: 2.6340,
  },
  {
    id: "place_jean_jaures",
    name: "Place Jean Jaurès",
    lat: 47.6875,
    lng: 2.6308,
  },
  {
    id: "viaduc",
    name: "Viaduc de Gien",
    lat: 47.6830,
    lng: 2.6170,
  },
];

export const getRandomLocations = (count: number): LocationData[] => {
  const shuffled = [...GIEN_LOCATIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
