import React from 'react';
import CharacterCard from './CharacterCard';

const BattleArena = ({
  player,
  opponent,
  currentTurn,
  isArenaShaking,
  showCriticalHit,
  specialEffect,
  shieldEffect,
  showMissed,
  isAutoFighting,
  onStartBattle,
  battleLog,
  battleLogRef,
  winner,
  onReturnToSelect
}) => {
  return (
    <div className="battle-arena-enter">
      <div className="battle-arena-flash" />
      <div className="versus-text">VS</div>
      <div className={`battle-arena ${isArenaShaking ? 'shaking' : ''}`}>
        {showCriticalHit && <div className="critical-hit" />}
        {specialEffect && <div className="special-effect" />}
        {shieldEffect && <div className="shield-effect" />}
        {showMissed && <div className="missed-attack">ESQUIVÉ !</div>}
        
        <div className="arena-background">
          <div className="arena-overlay" />
          
          <div className="player-side">
            <CharacterCard {...player} isPlayer={true} />
          </div>

          <div className="arena-center">
            <div className="versus-badge">VS</div>
            <div className="battle-actions">
              {winner ? (
                <button 
                  className="action-button return"
                  onClick={onReturnToSelect}
                >
                  <span className="action-icon">🔄</span>
                  Retour à la sélection
                </button>
              ) : !isAutoFighting ? (
                <button 
                  className="action-button start-battle"
                  onClick={onStartBattle}
                >
                  <span className="action-icon">⚔️</span>
                  Commencer le combat
                </button>
              ) : (
                <div className="battle-status">Combat en cours...</div>
              )}
            </div>
          </div>

          <div className="opponent-side">
            <CharacterCard {...opponent} isPlayer={false} />
          </div>

          <div 
            className="battle-log"
            ref={battleLogRef}
          >
            {battleLog.map((log, index) => (
              <div key={index} className="battle-log-entry">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleArena; 