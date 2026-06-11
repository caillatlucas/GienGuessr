// Calcule la distance entre deux coordonnées (Haversine) en mètres
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Rayon de la terre en mètres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en mètres
};

// Calcule le score basé sur la distance
// Si la distance est inférieure à 20m, 5000 points.
// Baisse exp ou linéaire. Gien est petit, on peut être strict.
// À 2000m (2km) de différence dans Gien, le score est proche de 0.
export const calculateScore = (distanceInMeters: number): number => {
  const maxScore = 5000;
  // Seuil de distance pour 0 point (e.g., 3km)
  const maxDistance = 3000; 

  if (distanceInMeters <= 20) {
    return maxScore;
  }
  if (distanceInMeters >= maxDistance) {
    return 0;
  }

  // Baisse exponentielle pour être plus punitif au début puis lisser
  const score = maxScore * Math.pow(Math.E, (-distanceInMeters * 3) / maxDistance);
  return Math.max(0, Math.round(score));
};
