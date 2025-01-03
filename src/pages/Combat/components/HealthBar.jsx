import React from 'react';

const HealthBar = ({ currentHealth, maxHealth, isTakingDamage }) => {
  return (
    <div className={`health-bar ${isTakingDamage ? 'taking-damage' : ''}`}>
      <div 
        className={`health-fill ${isTakingDamage ? 'damage' : ''}`} 
        style={{width: `${(currentHealth / maxHealth) * 100}%`}}
      >
        <div className="health-info">
          {currentHealth} / {maxHealth}
        </div>
      </div>
    </div>
  );
};

export default HealthBar; 