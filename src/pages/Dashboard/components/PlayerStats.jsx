import React from 'react';
import './PlayerStats.css';

function PlayerStats() {
  // Ces données devraient venir de votre contexte d'authentification
  // ou d'un appel API dans un cas réel
  const mockPlayerStats = {
    level: 25,
    experience: 2500,
    nextLevelXP: 3000,
    gold: 1250,
    victories: 47,
    defeats: 12
  };

  return (
    <div className="player-stats-container">
      <div className="stat-group level">
        <span className="stat-label">Niveau</span>
        <span className="stat-value">{mockPlayerStats.level}</span>
        <div className="xp-bar">
          <div 
            className="xp-fill"
            style={{ 
              width: `${(mockPlayerStats.experience / mockPlayerStats.nextLevelXP) * 100}%`
            }}
          />
          <span className="xp-text">
            {mockPlayerStats.experience}/{mockPlayerStats.nextLevelXP} XP
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Or</span>
          <span className="stat-value gold">{mockPlayerStats.gold}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Victoires</span>
          <span className="stat-value victories">{mockPlayerStats.victories}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Défaites</span>
          <span className="stat-value defeats">{mockPlayerStats.defeats}</span>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats; 