import React from 'react';
import './ConfirmationModal.styles.css';
import { getProfileImageUrl, handleImageError } from '../../../utils/imageUtils';

const ConfirmationModal = ({ opponent, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmation de combat</h2>
        <p>Voulez-vous affronter {opponent.username} ?</p>
        <div className="opponent-preview">
          <div className="opponent-preview-avatar-container">
            {opponent.profileImage ? (
              <img 
                src={getProfileImageUrl(opponent.profileImage)}
                alt={opponent.username}
                className="opponent-preview-avatar"
                onError={(e) => handleImageError(e, opponent.username)}
                loading="lazy"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="default-avatar">
                <span>{opponent.username.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div className="opponent-preview-frame"></div>
            <div className="opponent-preview-level">Niv. {opponent.level}</div>
          </div>
          <div className="opponent-preview-stats">
            <div className="preview-stat-group">
              <div className="preview-stat">
                <span className="stat-icon power">⚡</span>
                <span>{opponent.battlePower}</span>
              </div>
              <div className="preview-stat">
                <span className="stat-icon victories">🏆</span>
                <span>{opponent.victories || 0}</span>
              </div>
            </div>
            <span className="preview-region">{opponent.region}</span>
          </div>
        </div>
        <div className="modal-actions">
          <button 
            className="modal-button confirm" 
            onClick={onConfirm}
          >
            Combattre
          </button>
          <button 
            className="modal-button cancel" 
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 