import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { getProfileImageUrl, handleImageError } from '../../../utils/imageUtils';

const OpponentSelection = ({ 
  opponents, 
  selectedOpponent, 
  onSelect, 
  onStartFight, 
  isLoading, 
  error 
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpponentClick = (opponent) => {
    onSelect(opponent);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    onStartFight(selectedOpponent);
  };

  if (isLoading) return <div className="loading">Chargement des adversaires...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="opponent-selection">
      <h2>Choisissez votre adversaire</h2>
      <div className="opponents-list">
        {opponents.map(opponent => (
          <div 
            key={opponent.id} 
            className={`opponent-card ${selectedOpponent?.id === opponent.id ? 'selected' : ''}`}
            onClick={() => handleOpponentClick(opponent)}
          >
            <div className="opponent-avatar-container">
              {opponent.profileImage ? (
                <img 
                  src={getProfileImageUrl(opponent.profileImage)}
                  alt={opponent.username}
                  onError={(e) => handleImageError(e, opponent.username)}
                  loading="lazy"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="default-avatar">
                  <span>{opponent.username.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="opponent-frame"></div>
              <div className="opponent-level">Niv. {opponent.level}</div>
            </div>

            <div className="opponent-info">
              <h3>{opponent.username}</h3>
              <span className="opponent-region">{opponent.region}</span>
              <div className="opponent-battle-stats">
                <div className="battle-stat">
                  <span className="stat-icon power">⚡</span>
                  <span>{opponent.battlePower}</span>
                </div>
                <div className="battle-stat">
                  <span className="stat-icon victories">🏆</span>
                  <span>{opponent.victories || 0}</span>
                </div>
              </div>
              <div className="opponent-stats">
                {Object.entries(opponent.stats).map(([key, value]) => {
                  const label = key === 'attaque' ? 'ATT'
                            : key === 'defense' ? 'DEF'
                            : key === 'puissance' ? 'PWR'
                            : key === 'vie' ? 'HP'
                            : key.toUpperCase().slice(0, 3);
                  return (
                    <div key={key} className="stat">
                      <span className="stat-label">{label}</span>
                      <span className="stat-value">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="challenge-btn">
              Défier
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedOpponent && (
        <ConfirmationModal
          opponent={selectedOpponent}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default OpponentSelection; 