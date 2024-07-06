import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProfileSetup from './components/ProfileSetup';
import SwipeScreen from './components/SwipeScreen';
import MatchScreen from './components/MatchScreen';
import Settings from './components/Settings';
import AddPhotos from './components/Register/AddPhotos';
import Prueba from './components/Prueba';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/swipe" element={<SwipeScreen />} />
        <Route path="/matches" element={<MatchScreen />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/addphotos" element={<AddPhotos />} />
        <Route path="/prueba" element={<Prueba />} />
      </Routes>
    </Router>
  );
};

export default App;
