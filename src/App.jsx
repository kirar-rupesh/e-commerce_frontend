import { useState } from 'react'
import './App.css'
// src/App.jsx - Main Application Component (Requires react-router-dom)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; // Import Provider
import HomePage from './Pages/Home'; // Import the Home Page component
import ProductPage from './Pages/ProductPage'; // Import the Product List Page component
import ProductDetailPage from './Pages/ProductDetailPage'; // Import Detail Page
import WishlistPage from './Pages/WishlistPage'; // Import Wishlist Page
import CartPage from './Pages/CartPage'; // Import Cart Page
import Navbar from './Components/Navbar';
import CheckoutPage from './Pages/CheckoutPage';
import ThankYouPage from './Pages/ThankyouPage';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          {/* Route for the landing page / Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Main Product Listing */}
          <Route path="/products" element={<ProductPage />} />

          {/* Route for the Product List Page, which uses the categoryId URL parameter */}
          {/* <Route path="/products/:categoryId" element={<ProductPage />} /> */}

          {/* Specific Route for Category Filtering */}
          <Route path="/products/:categoryId" element={<ProductPage />} />

          {/* New Routes */}
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;