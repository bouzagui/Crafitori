import React from 'react';
import './App.css';
import './styles/variables.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import HomePage from './pages/homePage'
import ConfEmail from './pages/confEmail'
import ProductPage from './pages/productPage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confEmail" element={<ConfEmail />} />
        <Route path="/productPage" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
