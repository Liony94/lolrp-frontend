import React, { useState, useEffect, useRef } from 'react';
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
  const [playerHealth, setPlayerHealth] = useState(1000);
  const [opponentHealth, setOpponentHealth] = useState(1000);
  const [isAutoFighting, setIsAutoFighting] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('player'); // 'player' ou 'opponent'
  const [battleLog, setBattleLog] = useState([]);
  const battleLogRef = useRef(null);

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
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Warwick_0.jpg"
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
    setPlayerHealth(1000);
    setOpponentHealth(1000);
    setBattleLog([]);
    // On ne démarre pas le combat automatiquement, on attend que le joueur clique sur "Commencer le combat"
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

  const calculateDamage = (attacker, isSpecial = false) => {
    const baseDamage = attacker === 'player' ? mockPlayerStats.attaque : mockOpponentStats.attaque;
    const isCritical = Math.random() < (attacker === 'player' ? mockPlayerStats.critique : mockOpponentStats.critique) / 100;
    const damage = isSpecial ? baseDamage * 1.5 : baseDamage;
    return {
      damage: Math.round(isCritical ? damage * 1.5 : damage),
      isCritical
    };
  };

  const performAttack = (attacker) => {
    const { damage, isCritical } = calculateDamage(attacker);
    const isSpecialAttack = Math.random() < 0.2; // 20% de chance d'attaque spéciale
    const isCompanionAttack = Math.random() < 0.15; // 15% de chance d'attaque du compagnon

    if (attacker === 'player') {
      setPlayerAnimation(isSpecialAttack ? 'special' : 'attacking');
      setIsArenaShaking(true);
      if (isCompanionAttack) {
        setCompanionAnimation('attacking');
      }
      setTimeout(() => {
        setOpponentAnimation('taking-damage');
        setShowDamage(true);
        setShowCriticalHit(isCritical);
        setOpponentHealth(prev => Math.max(0, prev - damage));
        setBattleLog(prev => [...prev, `Vous infligez ${damage} dégâts${isCritical ? ' critiques' : ''} !`]);
      }, 300);
    } else {
      setOpponentAnimation(isSpecialAttack ? 'special' : 'attacking');
      setTimeout(() => {
        setPlayerAnimation('taking-damage');
        setShowDamage(true);
        setShowCriticalHit(isCritical);
        setPlayerHealth(prev => Math.max(0, prev - damage));
        setBattleLog(prev => [...prev, `L'adversaire inflige ${damage} dégâts${isCritical ? ' critiques' : ''} !`]);
      }, 300);
    }

    setTimeout(() => {
      resetAnimations();
      if (playerHealth <= 0 || opponentHealth <= 0) {
        endBattle();
      } else {
        setCurrentTurn(attacker === 'player' ? 'opponent' : 'player');
      }
    }, 1000);
  };

  const resetAnimations = () => {
    setPlayerAnimation('');
    setOpponentAnimation('');
    setIsArenaShaking(false);
    setShowDamage(false);
    setShowCriticalHit(false);
    setCompanionAnimation('running');
  };

  const startAutoBattle = () => {
    setIsAutoFighting(true);
    setBattleLog(['Le combat commence !']);
    // On commence avec le joueur
    setCurrentTurn('player');
  };

  const endBattle = () => {
    setIsAutoFighting(false);
    const winner = playerHealth <= 0 ? 'opponent' : 'player';
    setBattleLog(prev => [...prev, `Combat terminé ! ${winner === 'player' ? 'Vous avez gagné !' : 'Vous avez perdu !'}`]);
  };

  // Fonction pour faire défiler vers le bas
  const scrollToBottom = () => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  };

  // Utilisez useEffect pour détecter les changements dans battleLog
  useEffect(() => {
    scrollToBottom();
  }, [battleLog]); // Se déclenche à chaque fois que battleLog change

  useEffect(() => {
    if (isAutoFighting && playerHealth > 0 && opponentHealth > 0) {
      const timer = setTimeout(() => {
        performAttack(currentTurn);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isAutoFighting && (playerHealth <= 0 || opponentHealth <= 0)) {
      endBattle();
    }
  }, [isAutoFighting, currentTurn, playerHealth, opponentHealth]);

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
                {!isAutoFighting ? (
                  <button 
                    className="action-button start-battle"
                    onClick={startAutoBattle}
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
          <div className="health-bar">
            <div 
              className={`health-fill ${showDamage ? 'damage' : ''}`} 
              style={{width: `${playerHealth/10}%`}}
            >
              <div className="health-info">
                {playerHealth} / 1000
              </div>
            </div>
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
      )}
    </div>
  );
};

export default Combat; 