import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../FirebaseSingIn/Firebase'; // Asegúrate de que la ruta a firebase.js es correcta
import "./EditProfile.css"; // Asegúrate de crear este archivo CSS
import profilePic from "../Assets/pet.png"; // Asegúrate de actualizar la ruta de la imagen
import editIcon from "../Assets/edit.png"; // Asegúrate de actualizar la ruta de la imagen

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, 'pets', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Set photoURL to the first photo if available
          const photoURL = data.photos && data.photos.length > 0 ? data.photos[0] : profilePic;
          setProfileData({ ...data, photoURL });
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user logged in");
      }

      setLoading(false);
    };

    fetchProfileData();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile data found.</div>;
  }

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
          {profileData.name}, {profileData.breed}
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
