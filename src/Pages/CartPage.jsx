import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import './ProductPage.css'; // Using the shared CSS
import Navbar from '../Components/Navbar';

const CartPage = () => {
  const { cart, removeFromCart, incrementQty, decrementQty, moveFromCartToWishlist } = useCart();

  // Calculations
  const totalItems = cart.length;
  const originalPrice = cart.reduce((acc, item) => acc + (item.price * 2 * item.qty), 0); // Assuming 50% discount logic like image
  const finalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discount = originalPrice - finalPrice;
  const deliveryCharges = finalPrice > 0 ? 499 : 0;
  const totalAmount = finalPrice + deliveryCharges;

  if (cart.length === 0) {
    return (
      <div> 
        {/* <Navbar /> */}
      <div className="app-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
          Shop Now
        </Link>
      </div>
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar /> */}
      <div className="app-container">
        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>MY CART ({totalItems})</h2>

        <div className="cart-layout">

          {/* LEFT SECTION: Cart Items */}
          <div className="cart-items-section">
            {cart.map((item) => (
              <div key={item.productId} className="cart-item-card">
                <div className="cart-img-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="price-block">
                    <span className="current-price">${item.price}</span>
                    <span className="original-price">${item.price * 2}</span>
                    <span className="discount-tag">50% off</span>
                  </div>

                  <div className="qty-controls">
                    <span>Quantity: </span>
                    <button onClick={() => decrementQty(item.productId)} 
                    // disabled={item.qty <= 1}
                    >-</button>
                    <span className="qty-value">{item.qty}</span>
                    <button onClick={() => incrementQty(item.productId)}>+</button>
                  </div>

                  <div className="cart-actions">
                    <button className="btn-remove" onClick={() => removeFromCart(item.productId)}>
                      Remove From Cart
                    </button>
                    <button className="btn-wishlist-outline" onClick={() => moveFromCartToWishlist(item)}>
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SECTION: Price Details */}
          <div className="price-details-section">
            <div className="price-card">
              <h3 className="price-header">PRICE DETAILS</h3>
              <hr />
              <div className="price-row">
                <span>Price ({cart.reduce((acc, i) => acc + i.qty, 0)} items)</span>
                <span>${originalPrice}</span>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <span className="text-green">- ${discount}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charges</span>
                <span>${deliveryCharges}</span>
              </div>

              <hr />
              <div className="price-row total-row">
                <span>TOTAL AMOUNT</span>
                <span>${totalAmount}</span>
              </div>
              <hr />
              <p className="savings-text">You will save ${discount} on this order</p>

              <Link to="/checkout" className="btn-place-order">
                PLACE ORDER
              </Link>
              {/* <button className="btn-place-order" onClick={() => alert('Order Placed!')}>
                    PLACE ORDER
                  </button> */}
            </div>
          </div>

        </div>

        {/* Internal CSS for Cart Page specifically */}
        <style>{`
        .cart-layout {
          display: flex;
          gap: 30px;
          padding: 20px 40px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Left Section */
        .cart-items-section {
          flex: 2;
          min-width: 300px;
        }

        .cart-item-card {
          display: flex;
          border: 1px solid #eee;
          margin-bottom: 20px;
          padding: 15px;
          background: #fff;
          gap: 20px;
        }

        .cart-img-wrapper img {
          width: 150px;
          height: 180px;
          object-fit: cover;
          background: #f0f0f0;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .price-block {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .current-price { font-size: 20px; font-weight: bold; }
        .original-price { text-decoration: line-through; color: #888; }
        .discount-tag { color: #ff9f00; font-size: 14px; }

        .qty-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        .qty-controls button {
          border: 1px solid #ccc;
          background: #fff;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
        }
        .qty-value { border: 1px solid #ddd; padding: 2px 15px; }

        .cart-actions {
          margin-top: auto;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .btn-remove, .btn-wishlist-outline {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 13px;
          transition: 0.2s;
        }
        .btn-remove:hover { background: #888; color: white; border-color: #888; }
        .btn-wishlist-outline:hover { border-color: #333; }

        /* Right Section */
        .price-details-section {
          flex: 1;
          min-width: 300px;
          max-width: 400px;
        }

        .price-card {
          background: #fff;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .price-header { color: #878787; font-size: 16px; margin-bottom: 10px; }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          margin: 15px 0;
          font-size: 15px;
        }
        
        .total-row {
          font-weight: bold;
          font-size: 18px;
          color: #212121;
        }

        .text-green { color: #388e3c; }
        .savings-text { color: #388e3c; font-weight: 600; margin: 15px 0; }

        .btn-place-order {
          background: #fb641b; /* Orange/Blue depending on preference, image has blue */
          background: #4a90e2; 
          color: white;
          width: 100%;
          padding: 15px;
          border: none;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
           .cart-layout { flex-direction: column; }
           .price-details-section { max-width: 100%; }
        }
      `}</style>
      </div>
    </div>
  );
};

export default CartPage;