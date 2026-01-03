import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import './ProductPage.css'; // Importing the responsive CSS

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveFromWishlistToCart } = useCart();

  return (
    <div className="app-container">
      <h2 style={{ textAlign: 'center', margin: '20px' }}>My Wishlist ({wishlist.length})</h2>
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="btn-primary" style={{ display:'inline-block', marginTop:'15px', textDecoration:'none', width: 'auto', padding: '10px 30px' }}>
             Start Shopping
          </Link>
        </div>
      ) : (
        <div className="main-content" style={{ display: 'block' }}> 
          {/* Note: Added style={{display:'block'}} to override flex behavior of main-content for this specific page if no sidebar exists */}
          
          <div className="product-grid">
            {wishlist.map((product) => (
              <div key={product.productId} className="product-card">
                <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={product.image || "https://placehold.co/180x120"} alt={product.name} className="product-img" />
                  
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-price">${product.price}</div>
                  </div>
                </Link>

                <div className="card-buttons">
                  <button 
                    className="btn-primary" 
                    onClick={() => moveFromWishlistToCart(product)}
                  >
                    Move to Cart
                  </button>
                  
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
  );
};

export default WishlistPage;


  // return (
  //   <div> 

  //     {/* <Navbar /> */}
  //   <div className="app-container">
  //     <h2 style={{ textAlign: 'center', margin: '20px' }}>My Wishlist ({wishlist.length})</h2>
      
  //     {wishlist.length === 0 ? (
  //       <p style={{ textAlign: 'center' }}>Your wishlist is empty.</p>
  //     ) : (
  //       <div className="main-content">
  //         <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }} 
  //         // className="product-grid" 
  //         >
  //           {wishlist.map((product) => (
  //             <div key={product.productId} className="product-card">
  //               <img src={product.image} alt={product.name} className="product-img" />
  //               <div 
  //               // className="product-info"
  //               >
  //                 <h3>{product.name}</h3>
  //                 <div className="product-price">${product.price}</div>
  //               </div>
  //               <div className="card-buttons">
  //                 {/* Requirement: Add to Cart (Move) */}
  //                 <button 
  //                   className="btn-primary" 
  //                   onClick={() => moveFromWishlistToCart(product)}
  //                 >
  //                   Move to Cart
  //                 </button>
                  
  //                 {/* Requirement: Remove from Wishlist */}
  //                 <button 
  //                   className="btn-secondary" 
  //                   onClick={() => removeFromWishlist(product.productId)}
  //                   style={{ borderColor: 'red', color: 'red' }}
  //                 >
  //                   Remove
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  //   </div>
  // );

  