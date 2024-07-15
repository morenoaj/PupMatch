import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BreedSelection.css';
import backArrow from '../Assets/backArrow.png';
import pawIcon from '../Assets/paw.png';

const breeds = [
  "Golden Retriever", "Beagle", "Bulldog", "Poodle", "Chihuahua", "Labrador Retriever",
  "Pastor Alemán", "Shih Tzu", "Boxer", "Pug", "Rottweiler", "Siberian Husky",
  "Cocker Spaniel", "Doberman Pinscher", "Shiba Inu", "Border Collie", "Bull Terrier",
  "Chow Chow", "Maltés", "Akita Inu", "San Bernardo", "Alaskan Malamute", "Samoyedo",
  "Belgian Malinois", "Dálmata", "Irish Setter", "Gran Danés"
];

const BreedSelection = () => {
  const [selectedBreed, setSelectedBreed] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const petId = params.get('petId'); // Obtener el petId de los parámetros

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  const handleContinue = () => {
    if (selectedBreed && petId) {
      localStorage.setItem('breed', selectedBreed);

      navigate(`/petdescription?petId=${petId}`); // Usar petId obtenido de los parámetros
    }
  };

  return (
    <div className="breed-selection-background">
      <div className="breed-selection-container">
        <div className="content-container">
          <img src={backArrow} alt="Back Arrow" className="back-arrow" onClick={() => navigate(-1)} />
          <img src={pawIcon} alt="Paw Icon" className="paw-icon" />
          <h1 className="title">Select your pet's breed</h1>
          <p className="subtitle">Choose the breed of your pet from the options below.</p>
          <div className="breed-buttons-container">
            {breeds.map((breed, index) => (
              <button
                key={index}
                className={`breed-button ${selectedBreed === breed ? 'selected' : ''}`}
                onClick={() => handleBreedClick(breed)}
              >
                {breed}
              </button>
            ))}
          </div>
          <button
            className={`continue-button ${selectedBreed ? 'active' : ''}`}
            onClick={handleContinue}
            disabled={!selectedBreed}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreedSelection;
