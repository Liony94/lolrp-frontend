import React from 'react';
import './CurrentEvents.css';

function CurrentEvents() {
  const events = [
    {
      id: 1,
      title: "Invasion des Dragons",
      type: "world_event",
      timeRemaining: "2j 15h",
      rewards: ["Dragon légendaire", "Titre unique", "5000 Or"],
      progress: 75
    },
    {
      id: 2,
      title: "Festival des Éléments",
      type: "seasonal_event",
      timeRemaining: "5j",
      rewards: ["Familier élémentaire", "Costume festif"],
      progress: 30
    },
    {
      id: 3,
      title: "Tournoi PvP",
      type: "pvp_event",
      timeRemaining: "12h",
      rewards: ["Armure d'élite", "Titre de Champion"],
      progress: 50
    }
  ];

  return (
    <div className="current-events">
      <h2>Événements en cours</h2>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className={`event-card ${event.type}`}>
            <div className="event-header">
              <h3>{event.title}</h3>
              <span className="time-remaining">{event.timeRemaining}</span>
            </div>
            
            <div className="event-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${event.progress}%` }}
                />
              </div>
              <span className="progress-text">{event.progress}%</span>
            </div>

            <div className="event-rewards">
              <h4>Récompenses :</h4>
              <ul>
                {event.rewards.map((reward, index) => (
                  <li key={index}>{reward}</li>
                ))}
              </ul>
            </div>

            <button className="participate-button">
              Participer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentEvents; 