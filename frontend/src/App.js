import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import HomePage from './pages/homePage'
import ConfEmail from './pages/ConfEmail'
import ProductPage from './pages/productPage'
import ProfilePge from './pages/UserProfile';
import SellerProfile from './pages/SellerProfile';
import SubcategoryPage from './components/category/SubcategoryPage';
import ProductsPage from './components/products/ProductsPage';
import CreateProduct from './components/products/CreateProduct';
import CartPage from './components/cart/CartPage';
import { CartProvider } from './context/CartContext';
import PaymentPage from './pages/PaymentPage';
import SellerDashboard from './components/dashboard/SellerDashboard';
import TestCreateProduct from './components/products/CreateProduct';


function App() {
  return (

    <div>
      
      <CartProvider>
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-email" element={<ConfEmail />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth/profile/" element={<ProfilePge />} />
          <Route path="/seller/:seller_id" element={<SellerProfile />} />
          <Route path="/subcategory/:parentId" element={<SubcategoryPage />} />
          <Route path="/productsPage/:subcategoryId" element={<ProductsPage />} />
          <Route path="/newProduct" element={<CreateProduct />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/dashboard" element={<SellerDashboard />} />
          <Route path="/create-product" element={<TestCreateProduct />} />
        </Routes>
      </Router>
      </CartProvider>
    </div>
    
  );
}


export default App;

// Epickeen1
