import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import PetProfile from './components/Register/PetProfile';
import SwipeScreen from './components/SwipeCards/SwipeScreen';
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
        <Route path="/petprofile" element={<PetProfile />} />
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
