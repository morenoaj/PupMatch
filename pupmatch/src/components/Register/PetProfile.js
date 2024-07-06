import React, { useState } from 'react';
import './PetProfile.css';  // Asegúrate de crear este archivo CSS

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');

  const handleGenderClick = (gender) => {
    setGender(gender);
  };

  const handleSizeClick = (size) => {
    setSize(size);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar datos al backend
    console.log({ name, age, gender, size });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">My first name is</label>
          <input
            className="input"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">My birthday is</label>
          <input
            className="input"
            type="date"
            placeholder="YYYY/MM/DD"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">I am a</label>
          <div className="button-group">
            <button
              type="button"
              className={`button ${gender === 'Female' ? 'active' : ''}`}
              onClick={() => handleGenderClick('Female')}
            >
              FEMALE
            </button>
            <button
              type="button"
              className={`button ${gender === 'Male' ? 'active' : ''}`}
              onClick={() => handleGenderClick('Male')}
            >
              MALE
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="label">Size</label>
          <div className="button-group">
            <button
              type="button"
              className={`button ${size === 'Small' ? 'active' : ''}`}
              onClick={() => handleSizeClick('Small')}
            >
              SMALL
            </button>
            <button
              type="button"
              className={`button ${size === 'Medium' ? 'active' : ''}`}
              onClick={() => handleSizeClick('Medium')}
            >
              MEDIUM
            </button>
            <button
              type="button"
              className={`button ${size === 'Large' ? 'active' : ''}`}
              onClick={() => handleSizeClick('Large')}
            >
              LARGE
            </button>
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="submit-button"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;
