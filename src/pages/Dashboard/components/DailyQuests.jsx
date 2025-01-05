import React from 'react';
import './DailyQuests.css';

function DailyQuests() {
  const quests = [
    {
      id: 1,
      title: "Domination totale",
      description: "Gagner 3 combats consécutifs",
      progress: 2,
      total: 3,
      reward: {
        type: "xp",
        amount: 1000,
        icon: "⚔️"
      },
      timeLeft: "8h"
    },
    {
      id: 2,
      title: "Maître stratège",
      description: "Utiliser 5 compétences spéciales",
      progress: 3,
      total: 5,
      reward: {
        type: "gold",
        amount: 500,
        icon: "💰"
      },
      timeLeft: "4h"
    },
    {
      id: 3,
      title: "Champion du jour",
      description: "Atteindre le top 10 du classement",
      progress: 0,
      total: 1,
      reward: {
        type: "item",
        name: "Équipement rare",
        icon: "🎁"
      },
      timeLeft: "24h"
    }
  ];

  return (
    <div className="daily-quests-container">
      <div className="quests-header">
        <h2>Quêtes Quotidiennes</h2>
        <div className="quest-refresh">
          <span>Réinitialisation dans: 12:45:30</span>
        </div>
      </div>

      <div className="quests-list">
        {quests.map(quest => (
          <div key={quest.id} className="quest-card">
            <div className="quest-info">
              <div className="quest-title-row">
                <h3>{quest.title}</h3>
                <span className="time-left">{quest.timeLeft}</span>
              </div>
              <p>{quest.description}</p>
              
              <div className="quest-progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                  />
                  <span className="progress-text">
                    {quest.progress}/{quest.total}
                  </span>
                </div>
              </div>
            </div>

            <div className="quest-reward">
              <div className="reward-icon">{quest.reward.icon}</div>
              <div className="reward-info">
                {quest.reward.type === 'xp' && (
                  <span>{quest.reward.amount} XP</span>
                )}
                {quest.reward.type === 'gold' && (
                  <span>{quest.reward.amount} Or</span>
                )}
                {quest.reward.type === 'item' && (
                  <span>{quest.reward.name}</span>
                )}
              </div>
            </div>

            {quest.progress >= quest.total ? (
              <button className="claim-button">Réclamer</button>
            ) : (
              <button className="go-to-quest">Commencer</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyQuests; 