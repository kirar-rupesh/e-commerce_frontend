import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import './ProductPage.css'; // Re-using shared CSS
import Navbar from '../Components/Navbar';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist ,removeFromWishlist, wishlist } = useCart();

    // Check if this specific product is already in the wishlist
  const isWishlisted = wishlist.some((item) => item.productId === productId);


  useEffect(() => {
    fetch(`https://e-commerce-backend-rosy-six.vercel.app/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data.product))
      .catch((err) => console.error(err));
  }, [productId]);

  // Handler for toggling wishlist
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.productId);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) return <div className="app-container" style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div className="app-container" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* <Navbar /> */}
      <div className="detail-page-wrapper">
        
        {/* LEFT COLUMN: Image & Action Buttons */}
        <div className="left-column">
          <div className="image-container">
            <img 
              src={product.image || "https://placehold.co/400x400"} 
              alt={product.name} 
              className="detail-product-img" 
            />
            {/* Wishlist Icon over image (Optional decorative touch) */}
            <button 
              className="wishlist-icon-btn"
               onClick={handleWishlistToggle}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              style={{
                color: isWishlisted ? 'red' : '#ccc', // Dynamic Color
                borderColor: isWishlisted ? 'red' : '#ddd'
              }}
              // onClick={() => addToWishlist(product)}
              // title="Add to Wishlist"
            >
              ♥ 
              {/* ♥ */}
            </button>
          </div>

          <div className="action-buttons-container">
            {/* <button 
              className="btn-action btn-buy-now" 
              onClick={() => alert("Proceeding to Checkout...")}
            >
              BUY NOW
            </button> */}
            <button 
              className="btn-action btn-add-cart" 
              onClick={() => addToCart(product)}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="right-column">
          <h1 className="product-title">{product.name}</h1>
          
          <p className="product-category-tag">Category: {product.category}</p>

          <div className="rating-block">
            <span className="rating-badge">{product.rating} ★</span>
            {/* <span className="rating-text">452 Ratings & 89 Reviews</span> */}
          </div>

          <div className="price-block">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.price * 2}</span> <br />
            <span className="discount-text">50% off</span>
          </div>

          {/* <div className="offers-section">
            <h4>Available offers</h4>
            <ul className="offers-list">
              <li>🏷️ <strong>Bank Offer:</strong> 5% Unlimited Cashback on Axis Bank Credit Card</li>
              <li>🏷️ <strong>Bank Offer:</strong> 10% Off on Bank of Baroda Mastercard debit card</li>
              <li>🏷️ <strong>Partner Offer:</strong> Buy this product and get upto ₹500 off on next purchase</li>
            </ul>
          </div> */}

          {/* Static Size Selector (Visual only, as logic wasn't requested) */}
          <div className="size-selector">
             <span className="size-label">Size:</span>
             <div className="size-options">
               <button className="size-box">S</button>
               <button className="size-box selected">M</button>
               <button className="size-box">L</button>
               <button className="size-box">XL</button>
             </div>
          </div>

        </div>
      </div>

      {/* Internal CSS for this specific layout */}
      <style>{`
        .detail-page-wrapper {
          display: flex;
          gap: 40px;
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        /* --- LEFT COLUMN STYLES --- */
        .left-column {
          flex: 0 0 400px; /* Fixed width for image column */
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .image-container {
          position: relative;
          border: 1px solid #f0f0f0;
          padding: 10px;
          border-radius: 4px;
        }

        .detail-product-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wishlist-icon-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
          color: #ccc;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .wishlist-icon-btn:hover { color: red; border-color: red; }

        .action-buttons-container {
          display: flex;
          gap: 10px;
        }

        .btn-action {
          flex: 1;
          padding: 16px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          border-radius: 2px;
          text-transform: uppercase;
        }

        .btn-buy-now {
          background-color: #fb641b;
          color: white;
          box-shadow: 0 1px 2px rgba(0,0,0,.2);
        }

        .btn-add-cart {
          background-color: #ff9f00;
          color: white;
          box-shadow: 0 1px 2px rgba(0,0,0,.2);
        }
        
        .btn-action:hover { opacity: 0.9; }

        /* --- RIGHT COLUMN STYLES --- */
        .right-column {
          flex: 1; /* Takes remaining space */
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .product-title {
          font-size: 24px;
          font-weight: 400;
          color: #212121;
          margin: 0 0 5px 0;
        }

        .product-category-tag {
          color: #878787;
          font-size: 14px;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .rating-block {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .rating-badge {
          background-color: #388e3c;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
        }

        .rating-text {
          color: #878787;
          font-size: 14px;
          font-weight: 500;
        }

        .price-block {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
        }

        .current-price {
          font-size: 28px;
          font-weight: 500;
          color: #212121;
        }

        .original-price {
          font-size: 16px;
          color: #878787;
          text-decoration: line-through;
        }

        .discount-text {
          font-size: 16px;
          color: #388e3c;
          font-weight: 500;
        }

        .offers-section {
          margin-bottom: 20px;
        }
        .offers-section h4 { font-size: 14px; margin-bottom: 10px; color: #212121; }
        .offers-list {
          list-style: none;
          padding: 0;
          font-size: 14px;
          color: #212121;
        }
        .offers-list li {
          margin-bottom: 8px;
          display: flex;
          gap: 8px;
        }

        /* Size Selector Styling (Visual) */
        .size-selector {
           display: flex;
           align-items: center;
           gap: 15px;
           margin-top: 10px;
        }
        .size-label { color: #878787; font-weight: 600; }
        .size-options { display: flex; gap: 10px; }
        .size-box {
           width: 40px; 
           height: 40px;
           border: 1px solid #e0e0e0;
           background: #fff;
           cursor: pointer;
           font-weight: bold;
           color: #212121;
        }
        .size-box.selected {
           border: 2px solid #2874f0;
           color: #2874f0;
           background: #f5faff;
        }

        @media (max-width: 768px) {
          .detail-page-wrapper { flex-direction: column; }
          .left-column { flex: auto; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useCart } from '../Context/CartContext';
// import './ProductPage.css'; // Re-using existing CSS
// import Navbar from '../Components/Navbar';

// const ProductDetailPage = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart, addToWishlist } = useCart();

//   useEffect(() => {
//     // Fetch single product from your Backend API
//     fetch(`http://localhost:5000/api/products/${productId}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data.data.product))
//       .catch((err) => console.error(err));
//   }, [productId]);

//   if (!product) return <div className="app-container" style={{ padding: '20px' }}>Loading...</div>;

//   return (
//     <div className="app-container">
//       <Navbar />
//       <div className="main-content"
//         style={{
//           // justifyContent: 'center',
//           // display: 'flex', flexDirection: 'row', alignItems: 'center',
//           // maxWidth: '800px', 
//           // width: '100%',
//           //  padding: '40px' 
//         }}
//       >

//         <div className="card-buttons">
//           <img
//             src={product.image || "https://placehold.co/400x300"}
//             alt={product.name}
//             className="product-img"
//           // style={{ height: '300px' }}
//           />
//           <button className="btn-primary" onClick={() => addToCart(product)}>
//             Add to Cart
//           </button>
//           <button className="btn-secondary" onClick={() => addToWishlist(product)}>
//             Add to Wishlist
//           </button>
//         </div>

//         <div className="product-card"
//         // style={{ maxWidth: '600px', width: '100%', padding: '40px' }}
//         >
//           <div className="product-info">
//             <h1 style={{ fontSize: '28px', margin: '20px 0' }}>{product.name}</h1>
//             <p
//               style={{ color: '#666', marginBottom: '20px' }}
//             >
//               Category: {product.category}
//             </p>
//             <div className="product-price" style={{ fontSize: '24px' }}>
//               Price: ${product.price}
//             </div>

//             <div className="product-rating"
//             // style={{ margin: '10px 0 20px' }}
//             >
//               Rating: {product.rating} ⭐
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;
