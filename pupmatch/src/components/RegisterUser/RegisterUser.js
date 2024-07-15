import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Checkbox, FormControlLabel, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import './RegisterUser.css';

const CustomButton = styled(Button)({
  background: 'linear-gradient(90deg, #0575F9 0%, #2BCDE3 100%)',
  color: 'white',
  fontSize: '16px',
  padding: '12px',
  borderRadius: '50px',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(90deg, #0575F9 0%, #2BCDE3 100%)',
  },
});

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = name && phone && location && profilePicture && termsAccepted && privacyAccepted;
    setIsFormValid(isValid);
  }, [name, phone, location, profilePicture, termsAccepted, privacyAccepted]);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const showNotification = (message, type) => {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    setTimeout(() => {
      notification.className = 'notification';
      if (type === 'success') {
        navigate('/welcome');
      }
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí puedes añadir la lógica para registrar al usuario con los datos proporcionados
      console.log({
        name,
        phone,
        location,
        profilePicture,
        termsAccepted,
        privacyAccepted
      });

      // Mostrar notificación de éxito
      showNotification("Registration successful", "success");

    } catch (error) {
      console.error("Error during registration:", error);
      showNotification("An error occurred during registration", "error");
    }
  };

  return (
    <Container component={Paper} elevation={6} className="container">
      <form onSubmit={handleSubmit} className="form">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add your user info
        </Typography>
        <Box className="form-group">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box className="form-group">
          <TextField
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
        <Box className="form-group">
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Box>
        <Box className="form-group">
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input type="file" hidden onChange={handleProfilePictureChange} />
          </Button>
          {profilePicture && <Avatar src={profilePicture} alt="Profile Picture" className="profile-picture" />}
        </Box>
        <Box className="form-group">
          <FormControlLabel
            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
            label="I accept the Terms and Conditions"
          />
        </Box>
        <Box className="form-group">
          <FormControlLabel
            control={<Checkbox checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />}
            label="I accept the Privacy Policy"
          />
        </Box>
        <CustomButton type="submit" fullWidth className="submit-button" disabled={!isFormValid}>
          REGISTER
        </CustomButton>
      </form>
      <div id="notification" className="notification"></div>
    </Container>
  );
};

export default RegisterUser;
