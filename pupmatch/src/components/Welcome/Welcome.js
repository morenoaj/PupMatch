import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import pawIcon from '../Assets/paw.png'; 
import backArrow from '../Assets/backArrow.png'; 

const Welcome = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate('/editprofile');
  };

  return (
    <div className="welcome-container">
      <div className="content-container">
        <img src={backArrow} alt="Back Arrow" className="back-arrow" />
        <img src={pawIcon} alt="Paw Icon" className="paw-icon" />
        <h1 className="title">Welcome to PupMatch.</h1>
        <p className="subtitle">Please follow these House Rules.</p>
        <ul className="rules-list">
          <li>
            <span className="checkmark">✔</span> 
            Represent your pet accurately.
            <p className="rule-detail">Ensure the photos, age, and bio of your pet are accurate and up-to-date.</p>
          </li>
          <li>
            <span className="checkmark">✔</span> 
            Stay safe.
            <p className="rule-detail">Don't be too quick to give out personal information. <a href="#">Date Safely</a></p>
          </li>
          <li>
            <span className="checkmark">✔</span> 
            Play it cool.
            <p className="rule-detail">Respect others and treat them as you would like to be treated.</p>
          </li>
          <li>
            <span className="checkmark">✔</span> 
            Be proactive.
            <p className="rule-detail">Always report bad behavior.</p>
          </li>
        </ul>
        <button className="agree-button" onClick={handleAgree}>I AGREE</button>
      </div>
    </div>
  );
};

export default Welcome;
