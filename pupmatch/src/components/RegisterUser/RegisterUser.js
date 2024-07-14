import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Checkbox, FormControlLabel, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import bcrypt from 'bcryptjs';
import './RegisterUser.css';

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

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const showNotification = (message, type) => {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    setTimeout(() => {
      notification.className = 'notification';
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      // Hashear la contraseña antes de almacenarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Aquí puedes añadir la lógica para registrar al usuario con hashedPassword
      console.log({
        name,
        username,
        email,
        hashedPassword,
        phone,
        profilePicture,
        termsAccepted,
        privacyAccepted
      });

      // Mostrar notificación de éxito
      showNotification("Registration successful", "success");

      // Redireccionar al usuario a la página de bienvenida después de un retraso
      setTimeout(() => {
        navigate('/welcome');
      }, 3000);
    } catch (error) {
      console.error("Error hashing password:", error);
      showNotification("An error occurred during registration", "error");
    }
  };

  return (
    <Container component={Paper} elevation={6} className="container">
      <form onSubmit={handleSubmit} className="form">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Your Account
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
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box className="form-group">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box className="form-group">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box className="form-group">
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <CustomButton type="submit" fullWidth className="submit-button" disabled={!termsAccepted || !privacyAccepted}>
          REGISTER
        </CustomButton>
      </form>
      <div id="notification" className="notification"></div>
    </Container>
  );
};

export default RegisterUser;
