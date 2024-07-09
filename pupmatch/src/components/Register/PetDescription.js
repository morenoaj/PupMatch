import React, { useState } from 'react';
import './PetDescription.css';  
import backArrow from '../Assets/backArrow.png'; 

const PetDescription = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="pet-description-container">
      <div className="content-container">
        <img src={backArrow} alt="Back Arrow" className="back-arrow" />
        <h1 className="title">I am</h1>
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
