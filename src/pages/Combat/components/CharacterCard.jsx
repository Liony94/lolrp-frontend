import React from 'react';
import { getProfileImageUrl, handleImageError } from '../../../utils/imageUtils';
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
          {character?.profileImage ? (
            <img 
              src={getProfileImageUrl(character.profileImage)}
              alt={character.username}
              className="character-image"
              onError={(e) => {
                console.log('Image load error for:', character.username);
                console.log('Image URL:', getProfileImageUrl(character.profileImage));
                handleImageError(e, character.username);
              }}
              loading="lazy"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="default-avatar">
              <span>{character?.username?.charAt(0)?.toUpperCase() || '?'}</span>
            </div>
          )}
          <div className="character-level">
            <span>Niv. {character.level}</span>
          </div>
        </div>
      </div>
      <div className="character-info">
        <div className="character-name">{character.username || "Votre Champion"}</div>
        <span className="character-region">{character.region}</span>
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