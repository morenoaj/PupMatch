import React from 'react';
import './PremiumInfo.css';  
import backArrow from '../Assets/backArrow.png'; 
import pawIcon from '../Assets/paw.png';  

const PremiumInfo = () => {
  const handleUpgrade = () => {
    // Lógica para actualizar a usuario premium
    alert('Upgrade to Premium!');
  };

  const handleDecline = () => {
    // Lógica para declinar la oferta premium
    alert('Maybe later!');
  };

  return (
    <div className="premium-info-container">
      <div className="content-container">
        <img src={backArrow} alt="Back Arrow" className="back-arrow" />
        <img src={pawIcon} alt="Paw Icon" className="paw-icon" />
        <h1 className="title">Get PupMatch Premium</h1>
        <p className="subtitle">Enjoy exclusive benefits and level up your PupMatch experience!</p>
        
        <div className="benefits-section">
          <h2>Premium Benefits:</h2>
          <ul>
            <li>See your matches</li>
            <li>Unlimited messages</li>
            <li>Unlimited swipes</li>
          </ul>
        </div>
        
        <div className="pricing-section">
          <h2>Pricing:</h2>
          <div className="pricing-option selected">
            <span>1 month - $4.99</span>
          </div>
          {/* Additional pricing options can be added here */}
        </div>
        
        <div className="actions">
          <button className="upgrade-button" onClick={handleUpgrade}>Go Premium</button>
          <button className="decline-button" onClick={handleDecline}>No, thanks</button>
        </div>
      </div>
    </div>
  );
};

export default PremiumInfo;
