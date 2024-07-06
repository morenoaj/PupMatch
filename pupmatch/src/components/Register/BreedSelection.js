import React, { useState } from 'react';
import './BreedSelection.css';
import backArrow from '../Assets/backArrow.png'; 

const breeds = [
  "Golden Retriever", "Beagle", "Bulldog", "Poodle", "Chihuahua", "Labrador Retriever",
  "Pastor Alemán", "Shih Tzu", "Boxer", "Pug", "Rottweiler", "Siberian Husky",
  "Cocker Spaniel", "Doberman Pinscher", "Shiba Inu", "Border Collie", "Bull Terrier",
  "Chow Chow", "Maltés", "Akita Inu", "San Bernardo", "Alaskan Malamute", "Samoyedo",
  "Belgian Malinois", "Dálmata", "Irish Setter", "Gran Danés"
];


const BreedSelection = () => {
  const [selectedBreed, setSelectedBreed] = useState('');

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  return (
    <div className="breed-selection-container">
      <div className="content-container">
        <img src={backArrow} alt="Back Arrow" className="back-arrow" />
        <h1 className="title">RACES</h1>
        <p className="subtitle">Select your pet's breed to add it to their profile.</p>
        <div className="breed-buttons-container">
          {breeds.map((breed, index) => (
            <button
              key={index}
              className={`breed-button ${selectedBreed === breed ? 'selected' : ''}`}
              onClick={() => handleBreedClick(breed)}
              disabled={selectedBreed && selectedBreed !== breed}
            >
              {breed}
            </button>
          ))}
        </div>
        <button
          className={`continue-button ${selectedBreed ? 'active' : ''}`}
          disabled={!selectedBreed}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default BreedSelection;
