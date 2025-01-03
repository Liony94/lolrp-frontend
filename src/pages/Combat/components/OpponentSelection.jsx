import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

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
            <div className="opponent-avatar">
              <img src={opponent.avatar} alt={opponent.username} />
              <div className="opponent-level">{opponent.level}</div>
            </div>
            <div className="opponent-info">
              <h3>{opponent.username}</h3>
              <span className="opponent-region">{opponent.region}</span>
              <div className="opponent-stats">
                {Object.entries(opponent.stats).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="stat">
                    <span className="stat-label">{key.toUpperCase().slice(0, 3)}</span>
                    <span className="stat-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
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