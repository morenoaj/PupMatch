import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './PetDescription.css';
import backArrow from "../Assets/backArrow.png";
import pawIcon from "../Assets/paw.png";

const PetDescription = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const petId = params.get('petId'); // Obtener el petId de los parámetros

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContinue = () => {
    if (description && petId) {
      localStorage.setItem('description', description);

      navigate(`/addphotos?petId=${petId}`); // Usar petId obtenido de los parámetros
    }
  };

  return (
    <div className="pet-description-background">
      <div className="pet-description-container">
        <div className="content-container">
          <img src={backArrow} alt="Back Arrow" className="back-arrow" onClick={() => navigate(-1)} />
          <img src={pawIcon} alt="Paw Icon" className="paw-icon" />
          <h1 className="title">Pet Description</h1>
          <p className="subtitle">
            Tell us about your pet's personality, hobbies, etc.
          </p>
          <textarea
            className="description-input"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <button
            className={`continue-button ${description ? "active" : ""}`}
            onClick={handleContinue}
            disabled={!description}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDescription;
