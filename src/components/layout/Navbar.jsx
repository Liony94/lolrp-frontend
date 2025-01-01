import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.styles.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">LoL RP</NavLink>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <div className="user-info">
              <span className="username">{user.username}</span>
              {user.region && (
                <span className="user-region">{user.region.name}</span>
              )}
            </div>
            <NavLink to="/profile">Profil</NavLink>
            <NavLink to="/regions">Régions</NavLink>
            <NavLink to="/stories">Histoires</NavLink>
            <button onClick={handleLogout} className="logout-button">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Se connecter</NavLink>
            <NavLink to="/register">S'inscrire</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 