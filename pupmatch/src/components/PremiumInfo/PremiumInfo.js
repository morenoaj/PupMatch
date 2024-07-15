import React, { useState, useEffect, useRef } from "react";
import "./PremiumInfo.css";
import backArrow from "../Assets/backArrow.png";
import pawIcon from "../Assets/paw.png";
import PayPalButton from '../Payment/PayPalButton'; // Importar el componente del botón de PayPal
import { getAuth } from 'firebase/auth'; // Importar getAuth de firebase/auth
import handleSubscriptionUpdate from './handleSubscription'; // Importar el handler de suscripción

const PremiumInfo = () => {
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const [enablePayPalButtons, setEnablePayPalButtons] = useState(false);
  const [userId, setUserId] = useState(null);
  const paypalButtonContainerRef = useRef(null);

  useEffect(() => {
    // Recuperar el ID del usuario logueado
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      console.error("No user is logged in");
    }
  }, []);

  const handleUpgrade = () => {
    if (isPayPalReady) {
      setEnablePayPalButtons(true);
    } else {
      console.error("PayPal button is not ready yet.");
    }
  };

  const handleDecline = () => {
    alert("Maybe later!");
  };

  const handleSuccess = async (details) => {
    console.log('Transaction completed by ' + details.payer.name.given_name);
    // Aquí puedes utilizar el userId para guardar la información del pago en la base de datos
    console.log('User ID:', userId);
    const paymentDetails = {
      payerID: details.payer.payer_id,
      orderID: details.id,
      amount: details.purchase_units[0].amount.value,
      currency: details.purchase_units[0].amount.currency_code,
      status: details.status
    };

    await handleSubscriptionUpdate('active', paymentDetails);
  };

  const handlePayPalReady = (actions) => {
    console.log('PayPal button is ready');
    setIsPayPalReady(true);
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
            <button
              className="upgrade-button"
              onClick={handleUpgrade}
              style={{
                padding: '12px',
                border: 'none',
                borderRadius: '24px',
                background: 'linear-gradient(90deg, #0575F9 0%, #2BCDE3 100%)',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                width: '48%',
                textAlign: 'center',
              }}
            >
              Go Premium
            </button>
            <button className="decline-button" onClick={handleDecline}>
              No, thanks
            </button>
          </div>
          <div 
            id="paypal-button-container" 
            ref={paypalButtonContainerRef}
            style={{
              display: enablePayPalButtons ? 'block' : 'none',
              marginTop: '20px'
            }}
          >
            <PayPalButton onSuccess={handleSuccess} onReady={handlePayPalReady} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumInfo;
