import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import f1 from '../Assets/f1.png';
import f2 from '../Assets/f2.png';
import f3 from '../Assets/f3.png';
import likeImage from '../Assets/paw.png';
import dislikeImage from '../Assets/nopaw.png';
import expandImage from '../Assets/expand.png';
import ownerAvatar from '../Assets/pet.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SwipeScreen.css';

const profiles = [
  {
    id: 1,
    name: 'Max',
    age: 3,
    breed: 'Golden Retriever',
    photos: [f1, f2, f3],
    sex: 'Male',
    description: 'Friendly and energetic',
    details: {
      veterinarian: 'Dr. Smith',
      vaccination: 'Up-to-date',
      favoritePark: 'Central Park',
      size: 'Large',
      allergies: 'None',
      owner: {
        name: 'John Doe',
        photo: ownerAvatar,
        phone: '123-456-7890',
        location: 'New York, NY'
      }
    },
  },
  {
    id: 2,
    name: 'Bella',
    age: 2,
    breed: 'Labrador',
    photos: [f1, f2],
    sex: 'Female',
    description: 'Loves playing fetch',
    details: {
      veterinarian: 'Dr. Jones',
      vaccination: 'Up-to-date',
      favoritePark: 'Riverside Park',
      size: 'Medium',
      allergies: 'Grass',
      owner: {
        name: 'Jane Smith',
        photo: ownerAvatar,
        phone: '987-654-3210',
        location: 'Los Angeles, CA'
      }
    },
  },
];

const chats = [
  {
    id: 1,
    name: 'Remy Sharp',
    message: "I'll be in your neighborhood doing errands this…",
    avatar: f1,
  },
  {
    id: 2,
    name: 'Travis Howard',
    message: "Wish I could come, but I'm out of town this…",
    avatar: f1,
  },
  {
    id: 3,
    name: 'Cindy Baker',
    message: "Do you have Paris recommendations? Have you ever…",
    avatar: f1,
  },
];

const SwipeScreen = () => {
  const [view, setView] = useState('matches');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleLike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleDislike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const currentProfile = profiles[currentIndex];

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleDislike(),
    onSwipedRight: () => handleLike(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (!currentProfile) {
    return <div>Loading...</div>;
  }

  const photos = currentProfile.photos && currentProfile.photos.length > 0 ? currentProfile.photos : [f1];

  return (
    <div className="swipe-screen container-fluid">
      <div className="sidebar">
        <img src={f1} alt="Profile" className="profile-image img-fluid" />
        <h6 className="username">Nala</h6>
        <div className="button-group">
          <button className="sidebar-button btn" onClick={() => handleViewChange('matches')}>
            Matches
          </button>
          <button className="sidebar-button btn" onClick={() => handleViewChange('chats')}>
            Chats
          </button>
        </div>
        <div className="sidebar-content">
          {view === 'matches' ? (
            <>
              <h6 className="sidebar-title">Matches</h6>
              <div className="matches-grid">
                {profiles.map((profile) => (
                  <div key={profile.id} className="match-card">
                    <img src={profile.photos[0]} alt={profile.name} className="match-photo img-fluid" />
                    <p>{profile.name}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h6 className="sidebar-title">Chats</h6>
              <div className="chats-list">
                {chats.map((chat, index) => (
                  <React.Fragment key={chat.id}>
                    <div className="chat-item">
                      <img alt={chat.name} src={chat.avatar} className="sidebar-avatar img-fluid" />
                      <div className="chat-text">
                        <span className="chat-name">{chat.name}</span>
                        <span className="chat-message">{chat.message}</span>
                      </div>
                    </div>
                    {index < chats.length - 1 && <hr className="chat-divider" />}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="main-content">
        <div {...swipeHandlers} className={`profile-card card ${expanded ? 'expanded' : ''}`}>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {photos.map((photo, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={photo} className="d-block w-100" alt={`slide ${index}`} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="profile-info card-body text-center">
            <h5 className="profile-name card-title">{currentProfile.name}, {currentProfile.age}</h5>
            <div className="breed-container">
              <span className="breed-circle badge badge-primary">{currentProfile.breed}</span>
            </div>
            <p className="profile-sex">{currentProfile.sex}</p>
          </div>
          <div className="expand-container card-footer" onClick={handleExpandClick}>
            <span className="expand-text">{expanded ? "Hide Details" : "Show Details"}</span>
            <img
              src={expandImage}
              alt="Expand"
              className={`expand-image ${expanded ? 'expanded' : ''}`}
            />
          </div>
          {expanded && (
            <>
              <div className={`profile-details card-body ${expanded ? 'expanded' : ''}`}>
                <p>😊 Description: {currentProfile.description}</p>
                <p>🌳 Favorite Park: {currentProfile.details.favoritePark}</p>
                <p>🐕 Size: {currentProfile.details.size}</p>
                <p>🚫 Allergies: {currentProfile.details.allergies}</p>
                <p>💉 Vaccination: {currentProfile.details.vaccination}</p>
                <p>🩺 Veterinarian: {currentProfile.details.veterinarian}</p>
              </div>
              <div className={`owner-info card mt-3 ${expanded ? 'expanded' : ''}`}>
                <h6>Owner Information</h6>
                <div className="owner-details">
                  <img src={currentProfile.details.owner.photo} alt="Owner" className="owner-photo img-fluid rounded-circle" />
                  <div>
                    <p>🙂 Name: {currentProfile.details.owner.name}</p>
                    <p>📞 Phone: {currentProfile.details.owner.phone}</p>
                    <p>📍 Location: {currentProfile.details.owner.location}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="action-buttons mt-3 text-center">
          <button onClick={handleDislike} className="dislike-button btn">
            <img src={dislikeImage} alt="Dislike" className="dislike-image" />
          </button>
          <button onClick={handleLike} className="like-button btn">
            <img src={likeImage} alt="Like" className="like-image" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeScreen;
