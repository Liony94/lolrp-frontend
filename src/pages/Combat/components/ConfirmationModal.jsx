import React from 'react';
import './ConfirmationModal.styles.css';

const ConfirmationModal = ({ opponent, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmation de combat</h2>
        <p>Voulez-vous affronter {opponent.username} ?</p>
        <div className="opponent-preview">
          <img 
            src={opponent.avatar} 
            alt={opponent.username} 
            className="opponent-preview-avatar"
          />
          <div className="opponent-preview-stats">
            <div className="preview-stat">
              <span>Niveau {opponent.level}</span>
            </div>
            <div className="preview-stat">
              <span>Région: {opponent.region}</span>
            </div>
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