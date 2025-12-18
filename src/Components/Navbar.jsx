import React from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Navbar =  () => {
  const { 
    // addToCart, addToWishlist, 
    cart, wishlist, searchQuery, setSearchQuery  } = useCart() ;
    const navigate = useNavigate();
  // ----------------------------------

    const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

    // --- NEW CODE: Handle Search Input ---
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    
    // Auto-redirect to products page if user types search on Home Page or elsewhere
    if (window.location.pathname !== '/products') {
       navigate('/products');
    }
  };
  // -------------------------------------


  return (
    <div>

        {/* --- NAVBAR --- */}
      <nav className="navbar">
        {/* <div className="logo">MyShoppingSite</div> */}
         <Link 
            to={`/`} 
            className=""
            style={{textDecoration:'none', color: "#726f76ff"}}
          >
            <div className="logo">MyShoppingSite</div>
            {/* <p>Shop {category.name}</p> */}
          </Link>

         {/* --- NEW CODE: Connected Input --- */}
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search for products..." 
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {/* --------------------------------- */}
      
        <div className="nav-icons">
            <Link to="/wishlist" className="icon-btn" style={{textDecoration:'none', color:'inherit'}}>
             Wishlist &nbsp;  <span className="badge">{wishlist.length}</span>
          </Link>

          &nbsp; &nbsp; 

          {/* <button className="icon-btn">
             Cart <span className="badge">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
          </button> */}
          
           {/* Updated: Now links to /cart */}
        <Link to="/cart" className="icon-btn" style={{ 
          textDecoration: 'none', 
          color: 'inherit' 
          }}>
          Cart &nbsp; &nbsp; 
          {totalCartItems > 0 &&   <span className="badge">  {totalCartItems}</span>}
        </Link>
          {/* <button className="icon-btn">
             Wishlist <span className="badge">1</span>
          </button>
          <button className="icon-btn">
             Cart <span className="badge">1</span>
          </button> */}
        </div>
      </nav>



    </div>
  )
}

export default Navbar