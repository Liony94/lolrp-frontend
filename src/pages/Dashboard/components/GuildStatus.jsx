import React from 'react';
import './GuildStatus.css';

function GuildStatus() {
  const guildInfo = {
    name: "Les Gardiens du Code",
    level: 15,
    members: 25,
    maxMembers: 50,
    rank: "Elite",
    weeklyContribution: 5000,
    nextReward: "Bannière de guilde exclusive"
  };

  return (
    <div className="guild-container">
      <h2>Statut de Guilde</h2>
      <div className="guild-info">
        <h3>{guildInfo.name}</h3>
        <div className="guild-stats">
          <div className="guild-stat">
            <span className="label">Niveau</span>
            <span className="value">{guildInfo.level}</span>
          </div>
          <div className="guild-stat">
            <span className="label">Membres</span>
            <span className="value">{guildInfo.members}/{guildInfo.maxMembers}</span>
          </div>
          <div className="guild-stat">
            <span className="label">Rang</span>
            <span className="value">{guildInfo.rank}</span>
          </div>
        </div>
        <div className="guild-contribution">
          <h4>Contribution hebdomadaire</h4>
          <div className="contribution-bar">
            <div className="contribution-fill" style={{ width: '75%' }}></div>
          </div>
          <span>{guildInfo.weeklyContribution} points</span>
        </div>
        <div className="next-reward">
          <h4>Prochaine récompense</h4>
          <p>{guildInfo.nextReward}</p>
        </div>
      </div>
    </div>
  );
}

export default GuildStatus; 