import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import './ProductPage.css'; 

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Simple form state
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
    mobile: ''
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Simulate API call or validation here
    if(!address.name || !address.street || !address.mobile) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Clear the cart and go to Thank You page
    clearCart();
    navigate('/thankyou');
  };

  // Calculate Total (Same logic as CartPage)
  const finalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryCharges = finalPrice > 0 ? 499 : 0;
  const totalAmount = finalPrice + deliveryCharges;

  return (
    <div className="app-container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Checkout</h2>
      
      <div className="checkout-layout">
        
        {/* Left: Address Form */}
        <div className="checkout-form-section">
          <h3>Shipping Address</h3>
          <form className="address-form" onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={address.name} onChange={handleChange} required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" name="mobile" value={address.mobile} onChange={handleChange} required placeholder="1234567890" />
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input type="text" name="street" value={address.street} onChange={handleChange} required placeholder="Flat / House No / Building" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={address.city} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" name="zip" value={address.zip} onChange={handleChange} required />
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary-section">
          <h3>Order Summary</h3>
          <div className="summary-card">
            <div className="summary-row">
              <span>Items ({cart.reduce((acc, i) => acc + i.qty, 0)}):</span>
              <span>₹{finalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>₹{deliveryCharges}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total Payable:</span>
              <span>₹{totalAmount}</span>
            </div>
            
            <button className="btn-confirm-order" onClick={handleCheckout}>
              CHECKOUT
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .checkout-layout {
          display: flex;
          gap: 40px;
          padding: 20px 40px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .checkout-form-section {
          flex: 2;
          min-width: 300px;
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .order-summary-section {
          flex: 1;
          min-width: 280px;
        }
        .address-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .form-group label {
          font-weight: 500;
          font-size: 14px;
          color: #555;
        }
        .form-group input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        .form-row {
          display: flex;
          gap: 15px;
        }
        .form-row .form-group { flex: 1; }
        
        .summary-card {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          color: #555;
        }
        .summary-row.total {
          font-weight: bold;
          font-size: 18px;
          color: #333;
          border-top: 1px solid #eee;
          margin-top: 10px;
          padding-top: 20px;
        }
        .btn-confirm-order {
          width: 100%;
          background: #4a90e2;
          color: white;
          padding: 15px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 20px;
        }
        .btn-confirm-order:hover {
          background: #357abd;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;