import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import PetProfile from './components/Register/PetProfile';
import BreedSelection from './components/Register/BreedSelection';
import AddPhotos from './components/Register/AddPhotos';
import Welcome from './components/Welcome/Welcome';
import SwipeScreen from './components/SwipeCards/SwipeScreen';
import MatchScreen from './components/MatchScreen';
import EditProfile from './components/EditProfile/EditProfile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/petprofile" element={<PetProfile />} />
        <Route path="/breedselection" element={<BreedSelection />} />
        <Route path="/addphotos" element={<AddPhotos />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/swipe" element={<SwipeScreen />} />
        <Route path="/matches" element={<MatchScreen />} />
        <Route path="/editprofile" element={<EditProfile />} /> 
      </Routes>
    </Router>
  );
};

export default App;
