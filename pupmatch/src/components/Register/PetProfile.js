import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, ToggleButton, ToggleButtonGroup, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../FirebaseSingIn/Firebase.js';
import './PetProfile.css';

const CustomButton = styled(Button)({
  background: 'linear-gradient(90deg, #0575F9 0%, #2BCDE3 100%)',
  color: 'white',
  fontSize: '16px',
  padding: '12px',
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(90deg, #0575F9 0%, #2BCDE3 100%)',
  },
});

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGenderClick = (event, newGender) => {
    setGender(newGender);
  };

  const handleSizeClick = (event, newSize) => {
    setSize(newSize);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      // Guardar datos en localStorage
      localStorage.setItem('petName', name);
      localStorage.setItem('petAge', age);
      localStorage.setItem('petGender', gender);
      localStorage.setItem('petSize', size);
      
      // Guardar datos en Firestore
      await setDoc(doc(db, 'pets', user.uid), {
        userId: user.uid,
        name,
        age,
        gender,
        size,
      }, { merge: true });

      navigate(`/breedselection?petId=${user.uid}`);
    }
  };

  return (
    <Container component={Paper} elevation={6} className="container">
      <form onSubmit={handleSubmit} className="form">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Your Pet's Profile
        </Typography>
        <Box className="form-group">
          <TextField
            label="My first name is"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box className="form-group">
          <TextField
            label="My birthday is"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Box>
        <Typography variant="subtitle1" className="label">I am a</Typography>
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={handleGenderClick}
          fullWidth
          className="button-group"
        >
          <ToggleButton value="Female" className="button">FEMALE</ToggleButton>
          <ToggleButton value="Male" className="button">MALE</ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="subtitle1" className="label">Size</Typography>
        <ToggleButtonGroup
          value={size}
          exclusive
          onChange={handleSizeClick}
          fullWidth
          className="button-group"
        >
          <ToggleButton value="Small" className="button">SMALL</ToggleButton>
          <ToggleButton value="Medium" className="button">MEDIUM</ToggleButton>
          <ToggleButton value="Large" className="button">LARGE</ToggleButton>
        </ToggleButtonGroup>
        <CustomButton type="submit" fullWidth className="submit-button">
          CONTINUE
        </CustomButton>
      </form>
    </Container>
  );
};

export default ProfileSetup;
