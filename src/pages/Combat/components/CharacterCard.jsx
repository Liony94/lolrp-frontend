import React from 'react';
import HealthBar from './HealthBar';
import StatDisplay from './StatDisplay';

const CharacterCard = ({
  character,
  health,
  stats,
  isCurrentTurn,
  isTakingDamage,
  animation,
  showDamage,
  currentDamage,
  showCriticalHit,
  companionAnimation,
  isPlayer
}) => {
  return (
    <div className={`character-container ${isPlayer ? 'player' : 'opponent'} ${animation} ${isCurrentTurn ? 'active-turn' : ''}`}>
      <div className="rank-border">
        <div className="character-avatar">
          <img 
            src={character.avatar || "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg"} 
            alt={isPlayer ? "Player" : "Opponent"}
          />
        </div>
      </div>
      <div className="character-info">
        <div className="character-name">{character.username || "Votre Champion"}</div>
        <HealthBar
          currentHealth={health}
          maxHealth={stats?.vie}
          isTakingDamage={isTakingDamage}
        />
        <StatDisplay stats={stats} />
      </div>
      {companionAnimation && (
        <div className="companion-container">
          <div className={`companion-sprite wolf ${companionAnimation}`} />
        </div>
      )}
      {isTakingDamage && showDamage && (
        <div className="damage-effect">
          {showCriticalHit ? `CRITIQUE -${currentDamage}` : `-${currentDamage}`}
        </div>
      )}
    </div>
  );
};

export default CharacterCard; 