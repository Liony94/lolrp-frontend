import React from 'react';
import './BattlePass.css';

function BattlePass() {
  const currentSeason = {
    name: "Saison des Dragons",
    level: 25,
    maxLevel: 100,
    rewards: [
      { level: 23, type: 'skin', name: 'Armure draconique', claimed: true },
      { level: 24, type: 'currency', amount: 500, claimed: true },
      { level: 25, type: 'mount', name: 'Drake de cristal', claimed: false },
      { level: 26, type: 'emote', name: 'Danse du dragon', claimed: false },
      { level: 27, type: 'currency', amount: 1000, claimed: false }
    ]
  };

  return (
    <div className="battle-pass">
      <div className="battle-pass-header">
        <h2>{currentSeason.name}</h2>
        <div className="season-progress">
          <span className="level">Niveau {currentSeason.level}</span>
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${(currentSeason.level / currentSeason.maxLevel) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rewards-track">
        {currentSeason.rewards.map((reward, index) => (
          <div 
            key={index}
            className={`reward-item ${reward.claimed ? 'claimed' : ''} ${
              currentSeason.level >= reward.level ? 'available' : ''
            }`}
          >
            <div className="reward-icon">
              {getRewardIcon(reward.type)}
            </div>
            <div className="reward-info">
              <span className="reward-level">Niveau {reward.level}</span>
              <span className="reward-name">
                {reward.type === 'currency' 
                  ? `${reward.amount} Pièces` 
                  : reward.name}
              </span>
            </div>
            {!reward.claimed && currentSeason.level >= reward.level && (
              <button className="claim-button">Réclamer</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getRewardIcon(type) {
  // Ici vous pouvez retourner les icônes appropriées selon le type de récompense
  return <i className={`reward-icon-${type}`} />;
}

export default BattlePass; 