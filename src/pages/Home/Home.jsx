import React, { useState, useEffect } from 'react';
import './Home.styles.css';

const backgroundImages = [
  {
    url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg',
    region: 'Demacia'
  },
  {
    url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Swain_0.jpg',
    region: 'Noxus'
  },
  {
    url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Karma_0.jpg',
    region: 'Ionia'
  },
  {
    url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg',
    region: 'Freljord'
  }
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div 
          className={`hero-background ${isTransitioning ? 'transitioning' : ''}`}
          style={{
            backgroundImage: `linear-gradient(var(--color-overlay), var(--color-overlay)), 
                           url(${backgroundImages[currentImageIndex].url})`
          }}
        />
        <div className="hero-content">
          <h1>Forge ta Légende dans Runeterra</h1>
          <p>Crée ton histoire, vis des aventures épiques, et rejoins une communauté de passionnés</p>
          <div className="cta-buttons">
            <button className="cta-primary">Commencer l'Aventure</button>
            <button className="cta-secondary">Explorer les Histoires</button>
          </div>
        </div>
      </div>

      <div className="regions-preview">
        <h2>Choisis ta Région</h2>
        <div className="regions-grid">
          <div className="region-card demacia">
            <h3>Demacia</h3>
            <p>Rejoins les rangs des valeureux chevaliers</p>
          </div>
          <div className="region-card noxus">
            <h3>Noxus</h3>
            <p>Prouve ta force dans l'empire conquérant</p>
          </div>
          <div className="region-card ionia">
            <h3>Ionia</h3>
            <p>Explore les terres mystiques et spirituelles</p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon character"></div>
          <h3>Personnalise ton Champion</h3>
          <p>Crée un personnage unique avec son histoire, son apparence et ses relations</p>
          <ul className="feature-list">
            <li>Choisis ta région d'origine</li>
            <li>Définis tes affiliations</li>
            <li>Développe tes relations</li>
          </ul>
        </div>

        <div className="feature-card">
          <div className="feature-icon story"></div>
          <h3>Écris ton Histoire</h3>
          <p>Participe à des aventures épiques dans l'univers de Runeterra</p>
          <ul className="feature-list">
            <li>Crée tes propres récits</li>
            <li>Participe à des événements</li>
            <li>Collabore avec d'autres joueurs</li>
          </ul>
        </div>

        <div className="feature-card">
          <div className="feature-icon community"></div>
          <h3>Rejoins la Communauté</h3>
          <p>Interagis avec d'autres passionnés de l'univers</p>
          <ul className="feature-list">
            <li>Forme des alliances</li>
            <li>Participe aux événements</li>
            <li>Influence l'histoire de Runeterra</li>
          </ul>
        </div>
      </div>

      <div className="latest-stories">
        <h2>Dernières Aventures</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-image demacia-story"></div>
            <div className="story-content">
              <h4>La Chute de la Garde</h4>
              <p>Une histoire de trahison au cœur de Demacia</p>
              <span className="story-author">Par Luxanna</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-image noxus-story"></div>
            <div className="story-content">
              <h4>L'Ascension du Général</h4>
              <p>La montée en puissance d'un nouveau leader Noxien</p>
              <span className="story-author">Par DariusLeBG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 