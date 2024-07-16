import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Button, Grid, IconButton } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { db, storage } from "../FirebaseSingIn/Firebase";
import "./AddPhoto.css";
import pawIcon from '../Assets/paw.png';

const AddPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const petId = params.get("petId"); // Obtener el petId de los parámetros
  const auth = getAuth();

  const handleAddPhoto = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (photo) => {
    setPhotos(photos.filter((p) => p !== photo));
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

      localStorage.setItem('photos', JSON.stringify(photoURLs));

      const user = auth.currentUser;
      if (user) {
        const profileData = {
          petId: user.uid,
          name: localStorage.getItem('name'),
          age: localStorage.getItem('age'),
          gender: localStorage.getItem('gender'),
          size: localStorage.getItem('size'),
          vet: localStorage.getItem('vet'),
          vaccinated: localStorage.getItem('vaccinated'),
          allergies: localStorage.getItem('allergies'),
          allergyDetails: localStorage.getItem('allergyDetails'),
          park: localStorage.getItem('park'),
          breed: localStorage.getItem('breed'),
          description: localStorage.getItem('description'),
          photos: JSON.parse(localStorage.getItem('photos')),
        };

        try {
          const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
          });

          if (response.ok) {
            localStorage.clear(); // Clear localStorage after successful registration
            navigate('/welcome'); // Navegar a la página de bienvenida u otra página deseada después del registro
          } else {
            console.error('Error saving pet profile');
          }
        } catch (error) {
          console.error('Error saving pet profile', error);
        }
      }
    }
  };

  return (
    <div className="add-photos-background">
      <Container maxWidth="xs" className="add-photos-container">
        <img src={pawIcon} alt="Paw Icon" className="ppaw-icon" />
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
          className={`continue-button ${photos.length >= 2 ? 'active' : ''}`}
          onClick={handleRegister}
          disabled={photos.length < 2}
        >
          Register
        </Button>
      </Container>
    </div>
  );
};

export default AddPhotos;
