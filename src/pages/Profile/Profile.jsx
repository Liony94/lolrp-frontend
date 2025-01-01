import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.styles.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const mockStats = {
    vie: 580,
    defense: 35,
    attaque: 68,
    puissance: 45,
    mobilite: 30,
    difficulte: 2,
  };

  const mockInfo = {
    role: "Combattant",
    grade: "Capitaine",
    region: "Demacia",
    titre: "La Lame Vertueuse",
    niveau: 28,
    experience: 75, // pourcentage jusqu'au prochain niveau
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-avatar-container">
            <img 
              src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg" 
              alt="Avatar" 
              className="profile-avatar"
            />
            <div className="profile-level">
              <span>{mockInfo.niveau}</span>
            </div>
          </div>
        </div>
        <div className="profile-info-header">
          <h1>{user?.username || "Invocateur"}</h1>
          <span className="profile-title">{mockInfo.titre}</span>
          <div className="profile-badges">
            <span className="badge region">{mockInfo.region}</span>
            <span className="badge role">{mockInfo.role}</span>
            <span className="badge grade">{mockInfo.grade}</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section stats-section">
          <h2>Statistiques de Combat</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Vie</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${(mockStats.vie/1000)*100}%`}}></div>
                <span className="stat-value">{mockStats.vie}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Défense</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${mockStats.defense}%`}}></div>
                <span className="stat-value">{mockStats.defense}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Attaque</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${mockStats.attaque}%`}}></div>
                <span className="stat-value">{mockStats.attaque}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Puissance</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${mockStats.puissance}%`}}></div>
                <span className="stat-value">{mockStats.puissance}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Mobilité</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${mockStats.mobilite}%`}}></div>
                <span className="stat-value">{mockStats.mobilite}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Difficulté</div>
              <div className="difficulty-rating">
                {[...Array(3)].map((_, index) => (
                  <span 
                    key={index} 
                    className={`difficulty-star ${index < mockStats.difficulte ? 'active' : ''}`}
                  >★</span>
                ))}
              </div>
            </div>
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