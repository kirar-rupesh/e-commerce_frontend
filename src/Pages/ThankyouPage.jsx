import React from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css'; 

const ThankYouPage = () => {
  return (
    <div className="app-container" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center' 
    }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
      <h1 style={{ color: '#2874f0', marginBottom: '10px' }}>Thank You for Shopping!</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Your order has been placed successfully.
      </p>
      
      <Link to="/products" className="btn-primary" style={{ textDecoration: 'none', padding: '15px 40px' }}>
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYouPage;