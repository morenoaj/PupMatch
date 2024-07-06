
import React, { useState } from 'react';
import { Container, Typography, Button, Grid, IconButton } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import './AddPhoto.css';

const AddPhotos = ({ onNext }) => {
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (photo) => {
    setPhotos(photos.filter(p => p !== photo));
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
        onClick={onNext}
        disabled={photos.length < 2}
      >
        Register
      </Button>
    </Container>
  );
};

export default AddPhotos;
