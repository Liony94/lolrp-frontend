import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CharacterProgression.css';

function CharacterProgression() {
  const characterStats = {
    strength: 75,
    agility: 60,
    intelligence: 45,
    stamina: 80,
    currentClass: "Guerrier",
    specialization: "Maître d'armes",
    equipment: {
      weaponLevel: 85,
      armorLevel: 78,
    },
    talents: {
      offensive: 8,
      defensive: 6,
      utility: 4,
    }
  };

  return (
    <div className="character-progression">
      <div className="character-header">
        <div className="character-avatar">
          <img src="/assets/character-avatar.png" alt="Character" />
          <div className="class-icon">
            <img src="/assets/warrior-icon.png" alt="Warrior" />
          </div>
        </div>
        <div className="character-info">
          <h2>Progression du Personnage</h2>
          <div className="character-class">
            <span>{characterStats.currentClass}</span>
            <span className="specialization">{characterStats.specialization}</span>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="primary-stats">
          {Object.entries({
            Force: characterStats.strength,
            Agilité: characterStats.agility,
            Intelligence: characterStats.intelligence,
            Endurance: characterStats.stamina
          }).map(([stat, value]) => (
            <div key={stat} className="stat-circle">
              <CircularProgressbar
                value={value}
                text={`${value}`}
                styles={{
                  path: { stroke: `var(--stat-${stat.toLowerCase()}-color)` },
                  text: { fill: '#fff', fontSize: '24px' }
                }}
              />
              <span className="stat-label">{stat}</span>
            </div>
          ))}
        </div>

        <div className="equipment-progress">
          <h3>Niveau d'équipement</h3>
          <div className="progress-bars">
            <div className="progress-item">
              <label>Arme</label>
              <div className="progress-bar">
                <div 
                  className="progress-fill weapon"
                  style={{ width: `${characterStats.equipment.weaponLevel}%` }}
                />
                <span>{characterStats.equipment.weaponLevel}</span>
              </div>
            </div>
            <div className="progress-item">
              <label>Armure</label>
              <div className="progress-bar">
                <div 
                  className="progress-fill armor"
                  style={{ width: `${characterStats.equipment.armorLevel}%` }}
                />
                <span>{characterStats.equipment.armorLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterProgression; 