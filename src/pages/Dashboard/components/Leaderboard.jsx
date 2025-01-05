import React from 'react';

function Leaderboard() {
  const mockPlayers = [
    { id: 1, name: "DragonSlayer", score: 1500, rank: 1 },
    { id: 2, name: "ShadowNinja", score: 1350, rank: 2 },
    { id: 3, name: "MageSupreme", score: 1200, rank: 3 },
  ];

  return (
    <div className="leaderboard-container">
      <h2>Classement</h2>
      <div className="leaderboard-list">
        {mockPlayers.map(player => (
          <div key={player.id} className="leaderboard-item">
            <div className="rank">#{player.rank}</div>
            <div className="player-info">
              <span className="player-name">{player.name}</span>
              <span className="player-score">{player.score} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard; 