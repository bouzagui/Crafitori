import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import HomePage from './pages/homePage'
import ConfEmail from './pages/ConfEmail'
import ProductPage from './pages/productPage'
import ProfilePge from './pages/UserProfile';
import SellerProfile from './pages/SellerProfile';


function App() {
  return (

    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<ConfEmail />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/auth/profile/" element={<ProfilePge />} />
        <Route path="/seller/:sellerId" element={<SellerProfile />} />
      </Routes>
    </Router>

    </div>
    
  );
}

export default App;

// Epickeen1
