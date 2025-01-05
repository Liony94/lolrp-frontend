import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './ArenaPreview.css';
import { getProfileImageUrl, handleImageError } from '../../../utils/imageUtils';

function ArenaPreview() {
  const [champion, setChampion] = useState(null);
  const [challengers, setChallengers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Récupérer tous les utilisateurs triés par victoires
        const response = await api.get('/user');
        const users = response.data;
        
        // Trier les utilisateurs par nombre de victoires
        const sortedUsers = users.sort((a, b) => b.victories - a.victories);
        
        // Le champion est le joueur avec le plus de victoires
        const championData = sortedUsers[0];
        
        // Calcul du taux de victoire
        const totalFights = championData.victories + championData.defeats;
        const winRate = totalFights > 0 
          ? Math.round((championData.victories / totalFights) * 100) 
          : 0;

        // Calcul de la puissance totale
        const powerLevel = championData.attaque + championData.defense + 
                         championData.puissance + championData.criticalDmg;

        setChampion({
          ...championData,
          title: "Champion Incontesté",
          stats: {
            winRate: `${winRate}%`,
            totalFights: totalFights,
            powerLevel: powerLevel
          },
          reward: `${Math.floor(powerLevel * 100)} OR`
        });

        // Prendre les 2 joueurs suivants comme challengers
        const nextChallengers = sortedUsers.slice(1, 3).map((user, index) => ({
          ...user,
          rank: index + 2,
          powerLevel: user.attaque + user.defense + user.puissance + user.criticalDmg
        }));

        setChallengers(nextChallengers);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading || !champion) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="arena-preview">
      <div className="champion-showcase">
        <div className="champion-banner">
          <div className="champion-medal">
            <img 
              src={getProfileImageUrl(champion.profileImage)}
              alt={`Champion ${champion.username}`}
              className="champion-avatar"
              onError={(e) => handleImageError(e, champion.username)}
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="champion-info">
            <div className="champion-titles">
              <h2>{champion.username}</h2>
              <span className="champion-title">Niveau {champion.level}</span>
            </div>
            <div className="champion-stats">
              <div className="stat">
                <span className="stat-value">{champion.stats.winRate}</span>
                <span className="stat-label">Taux de Victoire</span>
              </div>
              <div className="stat">
                <span className="stat-value">{champion.victories}</span>
                <span className="stat-label">Victoires</span>
              </div>
              <div className="stat">
                <span className="stat-value">{champion.stats.powerLevel}</span>
                <span className="stat-label">Puissance</span>
              </div>
            </div>
          </div>
          <div className="champion-challenge">
            <div className="reward-info">
              <span className="reward-label">Récompense de défi</span>
              <span className="reward-value">{champion.reward}</span>
            </div>
            <button 
              className="challenge-champion-btn"
              onClick={() => window.location.href = `/combat?opponent=${champion.id}`}
            >
              Défier le Champion
            </button>
          </div>
        </div>
      </div>

      <div className="challengers-section">
        <h3>Prochains Challengers</h3>
        <div className="challengers-list">
          {challengers.map(challenger => (
            <div key={challenger.id} className="challenger-card">
              <div className="challenger-rank">#{challenger.rank}</div>
              <div className="challenger-info">
                <span className="challenger-name">{challenger.username}</span>
                <div className="challenger-stats">
                  <span>{challenger.victories} victoires</span>
                  <span className="power-level">⚔️ {challenger.powerLevel}</span>
                </div>
              </div>
              <button 
                className="challenge-btn"
                onClick={() => window.location.href = `/combat?opponent=${challenger.id}`}
              >
                Défier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArenaPreview; 