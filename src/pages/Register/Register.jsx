import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { REGIONS } from '../../constants/regions';
import './Register.styles.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError, loading } = useAuth();
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Étape 2
    description: '',
    region: '',
    profileImage: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage' && files) {
      setFormData(prev => ({
        ...prev,
        profileImage: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }
      setStep(2);
    } else {
      try {
        await register(formData);
        navigate('/login');
      } catch (err) {
        console.error('Erreur lors de l\'inscription:', err);
        setError(err.message);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">
          {step === 1 ? 'Créer un compte' : 'Compléter votre profil'}
        </h2>
        
        {(error || authError) && (
          <div className="error-message">
            {error || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          {step === 1 ? (
            <>
              <div className="form-group">
                <label htmlFor="username">Nom d'invocateur</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="region">Région</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez une région</option>
                  {REGIONS.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profileImage">Image de profil</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="register-button"
            disabled={loading}
          >
            {loading 
              ? 'Chargement...' 
              : (step === 1 ? 'Suivant' : 'S\'inscrire')
            }
          </button>
        </form>
        
        {step === 1 && (
          <p className="login-link">
            Déjà un compte? <span onClick={() => navigate('/login')}>Se connecter</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register; 