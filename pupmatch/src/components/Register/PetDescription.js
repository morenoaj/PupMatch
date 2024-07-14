import React, { useState } from 'react';
import './PetDescription.css';  
import backArrow from '../Assets/backArrow.png'; 
import pawIcon from '../Assets/paw.png';  // Asegúrate de actualizar la ruta de la imagen

const PetDescription = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="pet-description-container">
      <div className="content-container">
        <img src={backArrow} alt="Back Arrow" className="back-arrow" />
        <div className="header">
          <h1 className="title">Pet Description</h1>
          <img src={pawIcon} alt="Paw Icon" className="paw-icon" />
        </div>
        <p className="subtitle">Tell us about your pet's personality, hobbies, etc.</p>
        <textarea
          className="description-input"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <button
          className={`continue-button ${description ? 'active' : ''}`}
          disabled={!description}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default PetDescription;
