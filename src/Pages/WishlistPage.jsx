import React from 'react';
import { useCart } from '../Context/CartContext';
// import './ProductPage.css'; // Re-using existing CSS
import Navbar from '../Components/Navbar';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveFromWishlistToCart } = useCart();

  return (
    <div> 

      {/* <Navbar /> */}
    <div className="app-container">
      <h2 style={{ textAlign: 'center', margin: '20px' }}>My Wishlist ({wishlist.length})</h2>
      
      {wishlist.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your wishlist is empty.</p>
      ) : (
        <div className="main-content">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }} 
          // className="product-grid" 
          >
            {wishlist.map((product) => (
              <div key={product.productId} className="product-card">
                <img src={product.image} alt={product.name} className="product-img" />
                <div 
                // className="product-info"
                >
                  <h3>{product.name}</h3>
                  <div className="product-price">${product.price}</div>
                </div>
                <div className="card-buttons">
                  {/* Requirement: Add to Cart (Move) */}
                  <button 
                    className="btn-primary" 
                    onClick={() => moveFromWishlistToCart(product)}
                  >
                    Move to Cart
                  </button>
                  
                  {/* Requirement: Remove from Wishlist */}
                  <button 
                    className="btn-secondary" 
                    onClick={() => removeFromWishlist(product.productId)}
                    style={{ borderColor: 'red', color: 'red' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default WishlistPage;