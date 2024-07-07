import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Button, Grid, IconButton } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../FirebaseSingIn/Firebase'; // Asegúrate de que la ruta a firebase.js es correcta
import './AddPhoto.css';

const AddPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const petId = params.get('petId');

  const handleAddPhoto = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (photo) => {
    setPhotos(photos.filter(p => p !== photo));
  };

  const handleRegister = async () => {
    if (petId && photos.length >= 2) {
      const photoUploadPromises = photos.map(async (photo, index) => {
        const response = await fetch(photo);
        const blob = await response.blob();
        const storageRef = ref(storage, `photos/${petId}/${index}`);
        await uploadBytes(storageRef, blob);
        return getDownloadURL(storageRef);
      });

      const photoURLs = await Promise.all(photoUploadPromises);

      const name = localStorage.getItem('petName');
      const age = localStorage.getItem('petAge');
      const gender = localStorage.getItem('petGender');
      const size = localStorage.getItem('petSize');
      const breed = localStorage.getItem('petBreed');

      await setDoc(doc(db, 'pets', petId), { name, age, gender, size, breed, photos: photoURLs });
      navigate('/Welcome'); // Navega a la página principal o a donde quieras ir después de registrar
    }
  };

  return (
    <Container maxWidth="xs" className="add-photos-container">
      <Typography variant="h4" className="title">Add photos</Typography>
      <Typography variant="body2" className="subtitle">Add at least 2 photos to continue</Typography>
      <Grid container spacing={2} className="photos-grid">
        {photos.map((photo, index) => (
          <Grid item xs={4} key={index} className="photo-item">
            <div className="photo-wrapper">
              <img src={photo} alt={`Photo ${index + 1}`} className="photo" />
              <IconButton className="remove-photo-button" onClick={() => handleRemovePhoto(photo)}>
                <Close />
              </IconButton>
            </div>
          </Grid>
        ))}
        {photos.length < 6 && (
          <Grid item xs={4} className="photo-item">
            <div className="add-photo-wrapper">
              <input
                accept="image/*"
                className="input-file"
                type="file"
                multiple
                onChange={handleAddPhoto}
              />
              <Add className="add-photo-icon" />
            </div>
          </Grid>
        )}
      </Grid>
      <Button
        fullWidth
        variant="contained"
        className="continue-button"
        onClick={handleRegister}
        disabled={photos.length < 2}
      >
        Register
      </Button>
    </Container>
  );
};

export default AddPhotos;
