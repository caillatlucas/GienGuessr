# GeoGssr

Bienvenue dans **GeoGssr**, un jeu web inspiré de GeoGuessr, mais exclusivement centré sur la belle ville de Gien (45500), en France. Ce jeu vous plonge au cœur de lieux emblématiques giennois et met à l'épreuve vos connaissances de la ville !

## Fonctionnalités

- **Jeu Solo :** Une partie se déroule en 5 manches.
- **Street View :** Naviguez en 360° grâce à l'API Google Maps.
- **Mini-carte :** Placez votre marqueur sur une carte interactive Leaflet.
- **Score :** Calcul de la distance avec la formule de Haversine. Plus vous êtes proche, plus le score est élevé (Max 5000 pts par manche, total de 25000).
- **Design Moderne :** Thème sombre (Dark Mode) avec des effets visuels (Glassmorphism) et animations.

## Prérequis

- [Node.js](https://nodejs.org/) installé sur votre machine.
- Une clé API Google Maps valide avec :
  - **Maps JavaScript API** activée.
  - **Street View Static API** activée.

## Configuration

1. Clonez ce dépôt sur votre machine.
2. Copiez le fichier `.env.example` et renommez-le en `.env` :
   ```bash
   cp .env.example .env
   ```
3. Ouvrez le fichier `.env` et ajoutez votre clé API Google Maps :
   ```env
   VITE_GOOGLE_MAPS_API_KEY=votre_cle_api_ici
   ```

## Installation et Lancement

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le serveur de développement local :
   ```bash
   npm run dev
   ```
3. Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`).

## Stack Technique

- **Frontend :** React, TypeScript, Vite
- **Styling :** Vanilla CSS (Mode sombre, Flexbox/Grid, Animations)
- **Cartographie 2D :** `leaflet` & `react-leaflet` avec OpenStreetMap
- **Environnement 360° :** `@react-google-maps/api`
- **Icônes :** `lucide-react`

## Auteur

Créé avec Antigravity IDE (Gemini).
