import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.styles.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.username, formData.password);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Erreur de connexion:', err.response?.data?.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        
        {error && (
          <div className="error-message">
            {error === 'Unauthorized' ? 'Identifiants incorrects' : error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'invocateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-text">Connexion en cours...</span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
        
        <div className="additional-links">
          <p className="forgot-password">
            <span onClick={() => navigate('/forgot-password')}>
              Mot de passe oublié?
            </span>
          </p>
          <p className="register-link">
            Pas encore de compte? <span onClick={() => navigate('/register')}>S'inscrire</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 