import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BreedSelection.css';

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
  const petId = params.get('petId');

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  const handleContinue = () => {
    if (selectedBreed && petId) {
      localStorage.setItem('petBreed', selectedBreed);
      navigate(`/addphotos?petId=${petId}`);
    }
  };

  return (
    <div className="breed-selection-container">
      <h1>Select your pet's breed</h1>
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
        className={`continue-button ${!selectedBreed ? 'disabled' : ''}`}
        onClick={handleContinue}
        disabled={!selectedBreed}
      >
        CONTINUE
      </button>
    </div>
  );
};

export default BreedSelection;
