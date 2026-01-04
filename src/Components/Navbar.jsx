import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; // Ensure path is correct based on your folder structure
import './Navbar.css'; // Import specific styles

const Navbar = () => {
  const { cart, wishlist, searchQuery, setSearchQuery } = useCart();
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Auto-redirect to products page if user types search
    if (window.location.pathname !== '/products') {
       navigate('/products');
    }
  };

  return (
    <nav className="navbar">
      
      {/* SECTION 1: Heading and Search Bar */}
      <div className="nav-section-main">
        <Link 
          to="/" 
          className="logo-link"
        >
          <div className="logo">MyShoppingSite</div>
        </Link>

        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search for products..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* SECTION 2: Wishlist and Cart Links */}
      <div className="nav-section-actions">
        <Link to="/wishlist" className="icon-btn">
          Wishlist &nbsp; 
          {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
        </Link>

        <Link to="/cart" className="icon-btn">
          Cart &nbsp;
          {totalCartItems > 0 && <span className="badge">{totalCartItems}</span>}
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;



// import React from 'react'
// import '../App.css'
// import { Link, useNavigate } from 'react-router-dom';
// import { useCart } from '../Context/CartContext';

// const Navbar =  () => {
//   const { cart, wishlist, searchQuery, setSearchQuery  } = useCart() ;
//     const navigate = useNavigate();

//     const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

//     // --- NEW CODE: Handle Search Input ---
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
    
//     // Auto-redirect to products page if user types search on Home Page or elsewhere
//     if (window.location.pathname !== '/products') {
//        navigate('/products');
//     }
//   };
//   // -------------------------------------

//   return (
//     <div>

//         {/* --- NAVBAR --- */}
//       <nav className="navbar">
//         {/* <div className="logo">MyShoppingSite</div> */}
//          <Link 
//             to={`/`} 
//             className=""
//             style={{textDecoration:'none', color: "#726f76ff"}}
//           >
//             <div className="logo">MyShoppingSite</div>
//             {/* <p>Shop {category.name}</p> */}
//           </Link>

//          {/* --- NEW CODE: Connected Input --- */}
//       <input 
//         type="text" 
//         className="search-bar" 
//         placeholder="Search for products..." 
//         value={searchQuery}
//         onChange={handleSearchChange}
//       />
//       {/* --------------------------------- */}
      
//         <div className="nav-icons">
//             <Link to="/wishlist" className="icon-btn" 
//             style={{textDecoration:'none', color:'inherit'}}>
//              Wishlist &nbsp;  <span className="badge">{wishlist.length}</span>
//           </Link>

//           &nbsp; &nbsp; 

//           {/* <button className="icon-btn">
//              Cart <span className="badge">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
//           </button> */}
          
//            {/* Updated: Now links to /cart */}
//         <Link to="/cart" className="icon-btn" 
//         style={{ textDecoration: 'none', color: 'inherit' }}>
          
//           Cart &nbsp;  
//           {
//           // totalCartItems > 0 &&   
//           <span className="badge">  {totalCartItems}</span>}
//         </Link>
         
//         </div>
//       </nav>



//     </div>
//   )
// }

// export default Navbar