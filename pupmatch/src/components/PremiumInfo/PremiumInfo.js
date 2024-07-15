import React from "react";
import "./PremiumInfo.css";
import backArrow from "../Assets/backArrow.png";
import pawIcon from "../Assets/paw.png";

const PremiumInfo = () => {
  const handleUpgrade = () => {
    // Lógica para actualizar a usuario premium
    alert("Upgrade to Premium!");
  };

  const handleDecline = () => {
    // Lógica para declinar la oferta premium
    alert("Maybe later!");
  };

  return (
    <div className="premium-info-background">
      <div className="premium-info-container">
        <div className="content-container">
          <img src={backArrow} alt="Back Arrow" className="back-arrow" />
          <img src={pawIcon} alt="Paw Icon" className="paww-icon" />
          <h1 className="title">Get PupMatch Premium</h1>
          <p className="subtitle">
            Enjoy exclusive benefits and level up your PupMatch experience!
          </p>

          <div className="benefits-section">
            <h2>Premium Benefits:</h2>
            <ul>
              <li>
                <span className="checkmark">✔</span> See your matches
                <p className="benefit-description">Know who liked your pet's profile.</p>
              </li>
              <li>
                <span className="checkmark">✔</span> Unlimited messages
                <p className="benefit-description">Chat without limits with other pet owners.</p>
              </li>
              <li>
                <span className="checkmark">✔</span> Unlimited swipes
                <p className="benefit-description">Browse as many profiles as you want.</p>
              </li>
              <li>
                <span className="checkmark">✔</span> Rewind previous profile
                <p className="benefit-description">Go back to the previous profile if you accidentally swiped left.</p>
              </li>
            </ul>
          </div>
          <div className="pricing-section">
            <h2>Pricing:</h2>
            <div className="pricing-option selected">
              <span>1 month - $4.99</span>
            </div>
          </div>
          <div className="actions">
            <button className="upgrade-button" onClick={handleUpgrade}>
              Go Premium
            </button>
            <button className="decline-button" onClick={handleDecline}>
              No, thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumInfo;
