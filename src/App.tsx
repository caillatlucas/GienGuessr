import React, { useState } from 'react';
import { StreetView } from './components/StreetView';
import { MiniMap } from './components/MiniMap';
import { RoundResult } from './components/RoundResult';
import { GameSummary } from './components/GameSummary';
import { getRandomLocations, type LocationData } from './utils/gameData';
import { calculateDistance, calculateScore } from './utils/distance';
import { Map, Navigation } from 'lucide-react';
import './index.css';

type GameState = 'home' | 'playing' | 'roundResult' | 'gameSummary';

const TOTAL_ROUNDS = 5;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('home');
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  
  // Current round state
  const [guessedPosition, setGuessedPosition] = useState<{lat: number, lng: number} | null>(null);
  const [roundDistance, setRoundDistance] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  
  // Map expand state
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const startGame = () => {
    setLocations(getRandomLocations(TOTAL_ROUNDS));
    setCurrentRoundIndex(0);
    setTotalScore(0);
    setGameState('playing');
    setGuessedPosition(null);
    setIsMapExpanded(false);
  };

  const handleMarkerPlaced = (lat: number, lng: number) => {
    setGuessedPosition({ lat, lng });
  };

  const submitGuess = () => {
    if (!guessedPosition) return;
    
    const actualLocation = locations[currentRoundIndex];
    const dist = calculateDistance(actualLocation.lat, actualLocation.lng, guessedPosition.lat, guessedPosition.lng);
    const score = calculateScore(dist);
    
    setRoundDistance(dist);
    setRoundScore(score);
    setTotalScore(prev => prev + score);
    setGameState('roundResult');
  };

  const nextRound = () => {
    if (currentRoundIndex + 1 >= TOTAL_ROUNDS) {
      setGameState('gameSummary');
    } else {
      setCurrentRoundIndex(prev => prev + 1);
      setGuessedPosition(null);
      setIsMapExpanded(false);
      setGameState('playing');
    }
  };

  return (
    <div className="app-container dark-theme">
      {gameState === 'home' && (
        <div className="home-screen">
          <div className="home-content glass-panel">
            <h1 className="title">
              <Map className="title-icon" size={48} />
              GeoGssr
            </h1>
            <p className="subtitle">L'expérience exclusive de Gien (45500)</p>
            <div className="rules">
              <p>📍 5 manches pour explorer les lieux emblématiques.</p>
              <p>🎯 Placez votre marqueur sur la carte pour deviner où vous êtes.</p>
              <p>🏆 Plus vous êtes proche, plus vous marquez de points (Max 5000/manche).</p>
            </div>
            <button className="primary-btn pulse" onClick={startGame}>
              <Navigation size={20} style={{ marginRight: '8px' }} />
              Démarrer la partie
            </button>
          </div>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'roundResult') && locations.length > 0 && (
        <div className="game-screen">
          <StreetView 
            lat={locations[currentRoundIndex].lat} 
            lng={locations[currentRoundIndex].lng} 
          />
          
          <div className="game-ui-top">
            <div className="score-board glass-panel">
              <div className="score-item">
                <span className="label">Manche</span>
                <span className="value">{currentRoundIndex + 1} / {TOTAL_ROUNDS}</span>
              </div>
              <div className="score-item">
                <span className="label">Score Total</span>
                <span className="value text-accent">{totalScore}</span>
              </div>
            </div>
          </div>

          <div 
            className={`map-wrapper ${isMapExpanded ? 'expanded' : ''} ${gameState === 'roundResult' ? 'hidden' : ''}`}
            onMouseEnter={() => setIsMapExpanded(true)}
            onMouseLeave={() => setIsMapExpanded(false)}
          >
            <MiniMap 
              onMarkerPlaced={handleMarkerPlaced} 
              isInteractive={gameState === 'playing'}
              guessedPosition={guessedPosition}
            />
            
            {guessedPosition && gameState === 'playing' && (
              <button className="validate-btn" onClick={submitGuess}>
                Valider le choix
              </button>
            )}
          </div>

          {gameState === 'roundResult' && (
            <RoundResult 
              actualLocation={locations[currentRoundIndex]}
              guessedPosition={guessedPosition!}
              distance={roundDistance}
              score={roundScore}
              onNextRound={nextRound}
              isLastRound={currentRoundIndex + 1 >= TOTAL_ROUNDS}
            />
          )}
        </div>
      )}

      {gameState === 'gameSummary' && (
        <GameSummary 
          totalScore={totalScore} 
          maxScore={TOTAL_ROUNDS * 5000} 
          onReplay={startGame} 
        />
      )}
    </div>
  );
};

export default App;
