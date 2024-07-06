import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Grid, Button, Avatar } from '@mui/material';
import { ThumbUp, ThumbDown, Star, FlashOn, RotateLeft, Chat, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './SwipeScreen.css';
import f1 from '../Assets/f1.png';  // Importa la imagen directamente

const profiles = [
  {
    id: 1,
    name: 'Max',
    age: 3,
    breed: 'Golden Retriever',
    photo: f1,  // Utiliza la imagen importada
    description: 'Friendly and energetic',
    interests: ['Movies', 'Walking', 'Shopping', 'Online Games', 'Crafts'],
  },
  {
    id: 2,
    name: 'Bella',
    age: 2,
    breed: 'Labrador',
    photo: f1,
    description: 'Loves playing fetch',
    interests: ['Running', 'Eating', 'Sleeping'],
  },
  {
    id: 1,
    name: 'Max',
    age: 3,
    breed: 'Golden Retriever',
    photo: f1,  // Utiliza la imagen importada
    description: 'Friendly and energetic',
    interests: ['Movies', 'Walking', 'Shopping', 'Online Games', 'Crafts'],
  },
  {
    id: 1,
    name: 'Max',
    age: 3,
    breed: 'Golden Retriever',
    photo: f1,  // Utiliza la imagen importada
    description: 'Friendly and energetic',
    interests: ['Movies', 'Walking', 'Shopping', 'Online Games', 'Crafts'],
  },
  // Agrega más perfiles aquí
];

const SwipeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState('matches'); // Estado para gestionar la vista actual
  const navigate = useNavigate();

  const handleLike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleDislike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="swipe-screen">
      <Box className="sidebar">
        <Avatar
          src={currentProfile.photo}
          alt="Profile"
          className="profile-avatar"
          onClick={() => navigate('/profile-setup')}
        />
        <Typography variant="h6" className="sidebar-title">{view === 'matches' ? 'Matches' : 'Chats'}</Typography>
        <Grid container spacing={1} className="sidebar-content">
          {profiles.map((profile) => (
            <Grid item xs={4} key={profile.id} className="sidebar-grid-item">
              <img src={profile.photo} alt={profile.name} className="sidebar-avatar" />
            </Grid>
          ))}
        </Grid>
        <Box className="bottom-menu">
          <Button startIcon={<People />} onClick={() => setView('matches')} className="menu-button">
            Matches
          </Button>
          <Button startIcon={<Chat />} onClick={() => setView('chats')} className="menu-button">
            Chats
          </Button>
        </Box>
      </Box>
      <Box className="main-content">
        <Card className="profile-card">
          <CardMedia
            component="img"
            height="400"
            image={currentProfile.photo}
            alt={`${currentProfile.name} photo`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {currentProfile.name}, {currentProfile.age}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {currentProfile.breed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentProfile.description}
            </Typography>
            <Box className="interests">
              {currentProfile.interests.map((interest, index) => (
                <Box key={index} className="interest-chip">{interest}</Box>
              ))}
            </Box>
          </CardContent>
        </Card>
        <Box className="action-buttons">
          <IconButton onClick={handleDislike} className="dislike-button">
            <ThumbDown />
          </IconButton>
          <IconButton onClick={handleLike} className="like-button">
            <ThumbUp />
          </IconButton>
          <IconButton className="star-button">
            <Star />
          </IconButton>
          <IconButton className="super-like-button">
            <FlashOn />
          </IconButton>
          <IconButton className="rewind-button">
            <RotateLeft />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};

export default SwipeScreen;
