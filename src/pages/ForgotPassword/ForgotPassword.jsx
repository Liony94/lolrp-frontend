import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.styles.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique de réinitialisation à implémenter
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Réinitialiser le mot de passe</h2>
        
        {!isSubmitted ? (
          <>
            <p className="forgot-password-description">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </p>
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="forgot-password-button">
                Envoyer le lien
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>
              Si un compte existe avec cet email, vous recevrez un lien de réinitialisation dans quelques minutes.
            </p>
          </div>
        )}
        
        <div className="navigation-links">
          <p className="back-to-login">
            <span onClick={() => navigate('/login')}>Retour à la connexion</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 