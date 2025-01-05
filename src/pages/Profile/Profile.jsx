import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { getProfileImageUrl, handleImageError } from '../../utils/imageUtils';
import './Profile.styles.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [availablePoints, setAvailablePoints] = useState(5);
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/user/me');
        const userData = response.data;
        
        setUserStats({
          stats: {
            vie: userData.vie,
            defense: userData.defense,
            attaque: userData.attaque,
            puissance: userData.puissance,
            esquive: userData.esquive,
            criticalChance: userData.criticalChance,
            criticalDmg: userData.criticalDmg,
            precision: userData.precision
          },
          region: userData.region?.name || "Région inconnue",
          niveau: Math.floor((userData.attaque + userData.defense + userData.puissance + userData.esquive) / 40),
          experience: Math.floor(Math.random() * 100),
          description: userData.description,
          profileImage: userData.profileImage,
          battlePower: userData.battlePower,
          victories: userData.victories,
          defeats: userData.defeats
        });
        
      } catch (err) {
        console.error('Erreur lors de la récupération des stats:', err);
        setError('Impossible de charger les statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const handleStatIncrease = async (statName) => {
    if (availablePoints > 0) {
      try {
        const updateData = {
          [statName]: userStats.stats[statName] + 1
        };

        await api.patch('/user/update-stats', updateData);

        // Mise à jour locale
        setUserStats(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            [statName]: prev.stats[statName] + 1
          }
        }));
        setAvailablePoints(prev => prev - 1);

      } catch (err) {
        console.error('Erreur lors de la mise à jour des stats:', err);
        setError('Impossible de mettre à jour les statistiques');
      }
    }
  };

  if (isLoading) {
    return <div className="loading">Chargement des statistiques...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-banner-stats">
            <div className="banner-stat">
              <div className="banner-stat-value">
                {userStats?.niveau || 0}
              </div>
              <div className="banner-stat-label">Niveau</div>
            </div>
            <div className="banner-stat">
              <div className="banner-stat-value">
                {userStats?.battlePower || 0}
              </div>
              <div className="banner-stat-label">Battle Power</div>
            </div>
            <div className="banner-stat">
              <div className="banner-stat-value">
                {userStats?.victories || 0}
              </div>
              <div className="banner-stat-label">Victoires</div>
            </div>
          </div>
          <div className="profile-avatar-container">
            <img 
              src={getProfileImageUrl(userStats?.profileImage)}
              alt={`Avatar de ${user?.username}`}
              className="profile-avatar"
              onError={(e) => handleImageError(e, user?.username)}
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="profile-info-header">
          <h1>{user?.username || "Invocateur"}</h1>
          <span className="profile-title">{userStats?.titre || "Titre"}</span>
          <div className="profile-badges">
            <span className="badge region">{userStats?.region}</span>
            <span className="badge role">{userStats?.role || "Rôle"}</span>
            <span className="badge grade">{userStats?.grade || "Grade"}</span>
          </div>
          <div className="profile-battle-stats">
            <div className="battle-stat">
              <span className="stat-icon power">⚡</span>
              <span className="stat-value">{userStats?.battlePower}</span>
              <span className="stat-label">Battle Power</span>
            </div>
            <div className="battle-stat">
              <span className="stat-icon victories">🏆</span>
              <span className="stat-value">{userStats?.victories || 0}</span>
              <span className="stat-label">Victoires</span>
            </div>
            <div className="battle-stat">
              <span className="stat-icon defeats">💀</span>
              <span className="stat-value">{userStats?.defeats || 0}</span>
              <span className="stat-label">Défaites</span>
            </div>
            <div className="battle-stat">
              <span className="stat-icon ratio">⚔️</span>
              <span className="stat-value">
                {userStats?.victories + userStats?.defeats > 0
                  ? ((userStats?.victories / (userStats?.victories + userStats?.defeats)) * 100).toFixed(1)
                  : 0}%
              </span>
              <span className="stat-label">Ratio V/D</span>
            </div>
          </div>
          <div className="experience-bar-container">
            <div className="experience-bar">
              <div 
                className="experience-fill" 
                style={{width: `${userStats?.experience}%`}}
              />
              <span className="experience-text">
                {userStats?.experience}% jusqu'au niveau {userStats?.niveau + 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section stats-section">
          <div className="stats-header">
            <h2>Statistiques de Combat</h2>
            <div className="available-points">
              Points disponibles: <span className="points-value">{availablePoints}</span>
            </div>
          </div>
          <div className="profile-stats-grid">
            {userStats && Object.entries(userStats.stats).map(([statName, value]) => (
              <div className="profile-stat-item" key={statName}>
                <div className="profile-stat-header">
                  <div className="profile-stat-label">
                    {statName === 'criticalChance' ? 'Chance Critique' :
                     statName === 'criticalDmg' ? 'Dégâts Critiques' :
                     statName === 'precision' ? 'Précision' :
                     statName.charAt(0).toUpperCase() + statName.slice(1)}
                  </div>
                  {availablePoints > 0 && (
                    <button 
                      className="increase-stat-btn"
                      onClick={() => handleStatIncrease(statName)}
                      title="Augmenter la statistique"
                    >
                      +
                    </button>
                  )}
                </div>
                <div className="profile-stat-bar">
                  <div 
                    className="profile-stat-fill" 
                    style={{
                      width: statName === 'vie' 
                        ? `${(value/1000)*100}%` 
                        : statName === 'criticalDmg'
                        ? `${(value/200)*100}%`
                        : `${value}%`
                    }}
                  />
                  <span className="profile-stat-value">{value}{statName === 'criticalChance' || statName === 'criticalDmg' || statName === 'precision' ? '%' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section description-section">
          <div className="section-header">
            <h2>Histoire du Personnage</h2>
            {!isEditing && (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Modifier
              </button>
            )}
          </div>
          {isEditing ? (
            <div className="edit-description">
              <textarea 
                defaultValue="Né dans une famille noble de Demacia, j'ai toujours su que mon destin était de servir le royaume. Après des années d'entraînement..."
              />
              <div className="edit-actions">
                <button onClick={() => setIsEditing(false)}>Sauvegarder</button>
                <button className="cancel" onClick={() => setIsEditing(false)}>
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <p className="character-description">
              Né dans une famille noble de Demacia, j'ai toujours su que mon destin était de servir le royaume. Après des années d'entraînement...
            </p>
          )}
        </div>

        <div className="profile-section achievements-section">
          <h2>Accomplissements</h2>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="achievement-icon">🗡️</div>
              <div className="achievement-info">
                <h3>Premier Sang</h3>
                <p>A remporté son premier duel</p>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">👑</div>
              <div className="achievement-info">
                <h3>Ascension</h3>
                <p>A atteint le grade de Capitaine</p>
              </div>
            </div>
            <div className="achievement-item locked">
              <div className="achievement-icon">⚔️</div>
              <div className="achievement-info">
                <h3>Maître Stratège</h3>
                <p>Participez à 10 batailles épiques</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 