import React, { useState } from 'react';
import './Combat.styles.css';

const Combat = () => {
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [isFighting, setIsFighting] = useState(false);
  const [playerAnimation, setPlayerAnimation] = useState('');
  const [opponentAnimation, setOpponentAnimation] = useState('');
  const [showDamage, setShowDamage] = useState(false);
  const [isArenaShaking, setIsArenaShaking] = useState(false);
  const [showCriticalHit, setShowCriticalHit] = useState(false);
  const [companionAnimation, setCompanionAnimation] = useState('');
  const [specialEffect, setSpecialEffect] = useState(false);
  const [shieldEffect, setShieldEffect] = useState(false);

  // Données mockées pour les adversaires potentiels
  const mockOpponents = [
    {
      id: 1,
      username: "DemacianWarrior",
      level: 28,
      region: "Demacia",
      grade: "Capitaine",
      avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg",
      companion: {
        name: "Loup de Demacia",
        type: "Loup",
      }
    },
    {
      id: 2,
      username: "NoxianBlade",
      level: 27,
      region: "Noxus",
      avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg",
      companion: {
        name: "Ours de Combat",
        type: "Ours",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg"
      }
    },
    {
      id: 3,
      username: "IonianMaster",
      level: 29,
      region: "Ionia",
      avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Irelia_0.jpg",
      companion: {
        name: "Renard Spirituel",
        type: "Renard",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg"
      }
    }
  ];

  // Ajoutez ces stats mockées au début du composant
  const mockPlayerStats = {
    attaque: 68,
    defense: 35,
    vitesse: 45,
    critique: 25, // pourcentage
  };

  // Ajoutez les stats pour l'adversaire
  const mockOpponentStats = {
    attaque: 72,
    defense: 40,
    vitesse: 38,
    critique: 20,
  };

  const handleOpponentSelect = (opponent) => {
    setSelectedOpponent(opponent);
  };

  const startFight = () => {
    setIsFighting(true);
  };

  const handleAttack = () => {
    setPlayerAnimation('attacking');
    setIsArenaShaking(true);
    
    // Déclencher l'animation de dégâts sur l'adversaire après un court délai
    setTimeout(() => {
      setOpponentAnimation('taking-damage');
      setShowDamage(true);
      
      // Chance de coup critique (25%)
      if (Math.random() < 0.25) {
        setShowCriticalHit(true);
      }
    }, 300);

    // Réinitialiser les animations
    setTimeout(() => {
      setIsArenaShaking(false);
      setOpponentAnimation('');
      setShowDamage(false);
      setPlayerAnimation('');
      setShowCriticalHit(false);
    }, 800);
  };

  const handleDefend = () => {
    setPlayerAnimation('defending');
    setShieldEffect(true);
    setTimeout(() => {
      setShieldEffect(false);
      setPlayerAnimation('');
    }, 800);
  };

  const handleSpecial = () => {
    setPlayerAnimation('special');
    setSpecialEffect(true);
    setTimeout(() => {
      setSpecialEffect(false);
      setPlayerAnimation('');
    }, 1200);
  };

  const handleCompanionAttack = () => {
    setCompanionAnimation('attacking');
    setTimeout(() => {
      setOpponentAnimation('taking-damage');
      setShowDamage(true);
    }, 300);

    setTimeout(() => {
      setCompanionAnimation('running');
      setOpponentAnimation('');
      setShowDamage(false);
    }, 800);
  };

  return (
    <div className="combat-container">
      {!isFighting ? (
        <div className="opponent-selection">
          <h2>Choisissez votre adversaire</h2>
          <div className="opponents-list">
            {mockOpponents.map(opponent => (
              <div 
                key={opponent.id} 
                className={`opponent-card ${selectedOpponent?.id === opponent.id ? 'selected' : ''}`}
                onClick={() => handleOpponentSelect(opponent)}
              >
                <div className="opponent-avatar">
                  <img src={opponent.avatar} alt={opponent.username} />
                  <div className="opponent-level">{opponent.level}</div>
                </div>
                <div className="opponent-info">
                  <h3>{opponent.username}</h3>
                  <span className="opponent-region">{opponent.region}</span>
                  <div className="opponent-companion">
                    <img 
                      src={opponent.companion.image} 
                      alt={opponent.companion.name}
                      className="companion-avatar"
                    />
                    <span>{opponent.companion.name}</span>
                  </div>
                </div>
                {selectedOpponent?.id === opponent.id && (
                  <button 
                    className="fight-button"
                    onClick={startFight}
                  >
                    Combattre
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`battle-arena ${isArenaShaking ? 'shaking' : ''}`}>
          {showCriticalHit && <div className="critical-hit" />}
          {specialEffect && <div className="special-effect" />}
          {shieldEffect && <div className="shield-effect" />}
          <div className="arena-background">
            <div className="arena-overlay"></div>
            
            <div className="player-side">
              <div className={`character-container player ${playerAnimation}`}>
                <div className="rank-border">
                  <div className="character-avatar">
                    <img 
                      src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg" 
                      alt="Player"
                    />
                  </div>
                </div>
                <div className="character-info">
                  <div className="character-name">Votre Champion</div>
                  <div className={`health-bar ${opponentAnimation === 'taking-damage' ? 'taking-damage' : ''}`}>
                    <div 
                      className={`health-fill ${showDamage ? 'damage' : ''}`} 
                      style={{width: '100%'}}
                    >
                      <div className="health-info">
                        1000 / 1000
                      </div>
                    </div>
                  </div>
                  <div className="character-stats">
                    <div className="stat">
                      <div className="stat-label">Attaque</div>
                      <span className="stat-icon">⚔️</span>
                      <span className="stat-value">{mockPlayerStats.attaque}</span>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Défense</div>
                      <span className="stat-icon">🛡️</span>
                      <span className="stat-value">{mockPlayerStats.defense}</span>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Vitesse</div>
                      <span className="stat-icon">⚡</span>
                      <span className="stat-value">{mockPlayerStats.vitesse}</span>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Critique</div>
                      <span className="stat-icon">✨</span>
                      <span className="stat-value">{mockPlayerStats.critique}%</span>
                    </div>
                  </div>
                </div>
                <div className="companion-container">
                  <div className={`companion-sprite wolf ${companionAnimation || 'running'}`} />
                </div>
                {showDamage && (
                  <div className="damage-effect">
                    {showCriticalHit ? 'CRITIQUE -50' : '-25'}
                  </div>
                )}
              </div>
            </div>

            <div className="arena-center">
              <div className="versus-badge">VS</div>
              <div className="battle-actions">
                <button className="action-button attack" onClick={handleAttack}>
                  <span className="action-icon">⚔️</span>
                  Attaque
                </button>
                <button className="action-button defend" onClick={handleDefend}>
                  <span className="action-icon">🛡️</span>
                  Défense
                </button>
                <button className="action-button special" onClick={handleSpecial}>
                  <span className="action-icon">✨</span>
                  Spécial
                </button>
                <button 
                  className="action-button companion-action" 
                  onClick={handleCompanionAttack}
                >
                  <span className="action-icon">🐺</span>
                  Compagnon
                </button>
              </div>
            </div>

            <div className="opponent-side">
              <div className={`character-container opponent ${opponentAnimation}`}>
                <div className="rank-border">
                  <div className="character-avatar">
                    <img 
                      src={selectedOpponent?.avatar} 
                      alt="Opponent"
                    />
                  </div>
                </div>
                <div className="character-info">
                  <div className="character-name">{selectedOpponent?.username}</div>
                  <div className={`health-bar ${opponentAnimation === 'taking-damage' ? 'taking-damage' : ''}`}>
                    <div 
                      className={`health-fill ${showDamage ? 'damage' : ''}`} 
                      style={{width: '100%'}}
                    >
                      <div className="health-info">
                        1000 / 1000
                      </div>
                    </div>
                  </div>
                  <div className="character-stats">
                    <div className="stat">
                      <div className="stat-label">Attaque</div>
                      <span className="stat-icon">⚔️</span>
                      <span className="stat-value">{mockOpponentStats.attaque}</span>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Défense</div>
                      <span className="stat-icon">🛡️</span>
                      <span className="stat-value">{mockOpponentStats.defense}</span>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Vitesse</div>
                      <span className="stat-icon">⚡</span>
                      <span className="stat-value">{mockOpponentStats.vitesse}</span>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Critique</div>
                      <span className="stat-icon">✨</span>
                      <span className="stat-value">{mockOpponentStats.critique}%</span>
                    </div>
                  </div>
                </div>
                <div className="companion-container">
                  <div className="companion-sprite wolf idle"></div>
                </div>
                {showDamage && (
                  <div className="damage-effect">
                    {showCriticalHit ? 'CRITIQUE -50' : '-25'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Combat; 