import React from 'react';
import DailyQuests from './components/DailyQuests';
import Leaderboard from './components/Leaderboard';
import PlayerStats from './components/PlayerStats';
import ArenaPreview from './components/ArenaPreview';
import CurrentEvents from './components/CurrentEvents';
import GuildStatus from './components/GuildStatus';
import './Dashboard.styles.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de Bord</h1>
        <PlayerStats />
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="dashboard-card arena-section">
            <ArenaPreview />
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card daily-quests">
              <DailyQuests />
            </div>
            
            <div className="dashboard-card current-events">
              <CurrentEvents />
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="dashboard-card leaderboard">
            <Leaderboard />
          </div>
          
          <div className="dashboard-card guild">
            <GuildStatus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 