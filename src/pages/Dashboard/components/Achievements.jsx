import React from 'react';
import './Achievements.css';

function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "Maître du Combat",
      description: "Gagner 100 combats",
      progress: 75,
      total: 100,
      completed: false
    },
    {
      id: 2,
      title: "Collectionneur",
      description: "Obtenir 50 objets rares",
      progress: 30,
      total: 50,
      completed: false
    },
    {
      id: 3,
      title: "Champion du Peuple",
      description: "Atteindre le rang 1 du classement",
      progress: 1,
      total: 1,
      completed: true
    }
  ];

  return (
    <div className="achievements-container">
      <h2>Succès</h2>
      <div className="achievements-list">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`achievement-card ${achievement.completed ? 'completed' : ''}`}
          >
            <div className="achievement-info">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
            <div className="achievement-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                />
              </div>
              <span>{achievement.progress}/{achievement.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements; 