import React from 'react';
import { Trophy, RotateCcw, Swords } from 'lucide-react';

interface GameSummaryProps {
  totalScore: number;
  maxScore: number;
  onReplay: () => void;
  onRematch: () => void;
}

export const GameSummary: React.FC<GameSummaryProps> = ({ totalScore, maxScore, onReplay, onRematch }) => {
  const percentage = Math.round((totalScore / maxScore) * 100);
  
  let message = "";
  if (percentage >= 95) message = "Incroyable ! Un vrai Giennois !";
  else if (percentage >= 80) message = "Très bien joué ! Vous connaissez bien la ville.";
  else if (percentage >= 50) message = "Pas mal ! Il y a encore des coins à découvrir.";
  else message = "Aïe... Vous êtes sûr de ne pas avoir confondu Gien et Orléans ?";

  return (
    <div className="overlay-container glass-panel animate-fade-in">
      <div className="summary-card">
        <Trophy className="summary-icon" size={64} />
        <h2>Fin de la partie</h2>
        
        <div className="final-score-box">
          <span className="final-score">{totalScore}</span>
          <span className="max-score">/ {maxScore} pts</span>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>

        <p className="summary-message">{message}</p>

        <div className="summary-actions mt-6">
          <button className="primary-btn" onClick={onReplay}>
            <RotateCcw size={20} style={{ marginRight: '8px' }} />
            Nouvelle partie
          </button>
          
          <button className="secondary-btn" onClick={onRematch}>
            <Swords size={20} style={{ marginRight: '8px' }} />
            Revanche (Mêmes lieux)
          </button>
        </div>
      </div>
    </div>
  );
};
