import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import PetProfile from './components/Register/PetProfile';
import BreedSelection from './components/Register/BreedSelection';
import PetDescription from './components/Register/PetDescription';
import AddPhotos from './components/Register/AddPhotos';
import Welcome from './components/Welcome/Welcome';
import SwipeScreen from './components/SwipeCards/SwipeScreen';
import MatchScreen from './components/MatchScreen';
import EditProfile from './components/EditProfile/EditProfile';
import PremiumInfo from './components/PremiumInfo/PremiumInfo';
import RegisterUser from './components/RegisterUser/RegisterUser';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/petprofile" element={<PetProfile />} />
        <Route path="/breedselection" element={<BreedSelection />} />
        <Route path="/petdescription" element={<PetDescription />} /> 
        <Route path="/addphotos" element={<AddPhotos />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/swipe" element={<SwipeScreen />} />
        <Route path="/matches" element={<MatchScreen />} />
        <Route path="/editprofile" element={<EditProfile />} /> 
        <Route path="/premiuminfo" element={<PremiumInfo />} />
        <Route path="/registeruser" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
};

export default App;
