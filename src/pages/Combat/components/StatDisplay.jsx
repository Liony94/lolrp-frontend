import React from 'react';

const StatDisplay = ({ stats }) => {
  const statIcons = {
    attaque: '⚔️',
    defense: '🛡️',
    vitesse: '⚡',
    puissance: '✨',
    criticalChance: '🎯',
    criticalDmg: '💥',
    precision: '🎯'
  };

  // Filtrer les stats pour exclure la vie
  const displayStats = Object.entries(stats || {}).filter(([key]) => key !== 'vie');

  return (
    <div className="combat-stats-container">
      <div className="combat-stats-grid">
        {displayStats.map(([statName, value]) => (
          <div key={statName} className="combat-stat-row">
            <div className="combat-stat-icon">{statIcons[statName]}</div>
            <div className="combat-stat-info">
              <span className="combat-stat-label">
                {statName === 'criticalChance' ? 'Chance Crit.' :
                 statName === 'criticalDmg' ? 'Dégâts Crit.' :
                 statName.charAt(0).toUpperCase() + statName.slice(1)}
              </span>
              <span className="combat-stat-value">
                {value}{['criticalChance', 'criticalDmg', 'precision'].includes(statName) ? '%' : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatDisplay; 