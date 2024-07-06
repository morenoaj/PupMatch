import React from "react";
import "./EditProfile.css"; // Asegúrate de crear este archivo CSS
import profilePic from "../Assets/pet.png"; // Asegúrate de actualizar la ruta de la imagen
import editIcon from "../Assets/edit.png"; // Asegúrate de actualizar la ruta de la imagen

const EditProfile = () => {
  const profileData = {
    name: "Sasha",
    age: 2,
    photoURL: profilePic,
    completion: 26,
  };

  return (
    <div className="edit-profile-container">
      <div className="profile-header">
        <img src={profileData.photoURL} alt="Profile" className="profile-pic" />
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              transform: `rotate(${(profileData.completion / 100) * 360}deg)`,
            }}
          ></div>
        </div>
        <span className="profile-completion">
          {profileData.completion}% COMPLETE
        </span>
        <h1 className="profile-name">
          {profileData.name}, {profileData.age}
        </h1>
        <div className="edit-icon-container">
          <img src={editIcon} alt="Edit Profile" className="edit-icon" />
        </div>
        <span className="edit-text">EDIT PROFILE</span>
        <div className="platinum-section">
          <h2 className="platinum-title">PawMatch Platinum</h2>
          <p className="platinum-description">
            Level up every action you take on PawMatch
          </p>
          <button className="learn-more-button">LEARN MORE</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
