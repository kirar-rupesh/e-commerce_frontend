import './ProductPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import Navbar from '../Components/Navbar';

const ProductPage = () => {

  // 2. Get the functions from Context
  const { addToCart, addToWishlist, searchQuery, cart, wishlist } = useCart();

  // --- STATE MANAGEMENT --- 
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState(""); // "lowToHigh" | "highToLow"

  const { state } = useLocation();
  // Filter States
  const [priceRange, setPriceRange] = useState(2000); // Max price slider
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    state && state.categoryName ? [state.categoryName] : []
  );

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching from the API created in previous steps
        const prodRes = await fetch('https://e-commerce-backend-rosy-six.vercel.app/api/products');
        const catRes = await fetch('https://e-commerce-backend-rosy-six.vercel.app/api/categories');

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setAllProducts(prodData.data.products);
        // setFilteredProducts(prodData.data.products); // Initially show all
        setCategories(catData.data.categories);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // --- HANDLE INCOMING CATEGORY FROM HOME PAGE ---
  // useEffect(() => {
  //   if (state && state.categoryName) {
  //     // Directly set the selected category to the one passed in state
  //     setSelectedCategories([state.categoryName]);
  //   }
  // }, [state]);

  // --- FILTERING LOGIC ---
  useEffect(() => {
    let tempProducts = [...allProducts];

    // --- NEW CODE: Filter by Search Query ---
    if (searchQuery) {
      tempProducts = tempProducts.filter(prod =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // ----------------------------------------


    // 1. Filter by Price (Slider sets the maximum price)
    tempProducts = tempProducts.filter(prod => prod.price <= priceRange);

    // 2. Filter by Category
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter(prod =>
        selectedCategories.includes(prod.category) // Matching category name from schema
      );
    }

    // 3. Filter by Rating
    if (minRating > 0) {
      tempProducts = tempProducts.filter(prod => prod.rating >= minRating);
    }

    // 4. Sort by Price
    if (sortOrder === "lowToHigh") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(tempProducts);
  }, [allProducts, priceRange, selectedCategories, minRating, sortOrder, searchQuery]);


  // --- HANDLERS ---
  const handleCategoryChange = (catName) => {
    setSelectedCategories(prev =>
      prev.includes(catName)
        ? prev.filter(c => c !== catName) // Remove if exists
        : [...prev, catName]              // Add if doesn't exist
    );
  };

  const clearFilters = () => {
    setPriceRange(2000);
    setSelectedCategories([]);
    setMinRating(0);
    setSortOrder("");
  };

  return (
    <div className="app-container">

      {/* --- NAVBAR --- */}
      <Navbar />

      <div className="main-content">
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-btn">Clear</button>
          </div>

          {/* Price Filter (Slider) */}
          <div className="filter-section">
            <label className="filter-title">Price (Max: ${priceRange})</label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>0</span><span>2000</span>
            </div>
          </div>

          {/* Category Filter (Checkboxes) */}
          <div className="filter-section">
            <label className="filter-title">Category</label>
            {categories.map(cat => (
              <label key={cat.categoryId} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => handleCategoryChange(cat.name)}
                />
                {cat.name}
              </label>
            ))}
          </div>

          {/* Rating Filter (Radio) */}
          <div className="filter-section">
            <label className="filter-title">Rating</label>
            {[4, 3, 2, 1].map(star => (
              <label key={star} className="radio-label">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === star}
                  onChange={() => setMinRating(star)}
                />
                {star} Stars & above
              </label>
            ))}
          </div>

          {/* Sort By (Radio) */}
          <div className="filter-section">
            <label className="filter-title">Sort by Price</label>
            <label className="radio-label">
              <input
                type="radio"
                name="sort"
                checked={sortOrder === "lowToHigh"}
                onChange={() => setSortOrder("lowToHigh")}
              />
              Price - Low to High
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sort"
                checked={sortOrder === "highToLow"}
                onChange={() => setSortOrder("highToLow")}
              />
              Price - High to Low
            </label>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <main className="product-section">
          <div className="products-header">
            {/* Showing All Products  */}
            {searchQuery ? `Results for "${searchQuery}"` : "Showing All Products"}
            ({filteredProducts.length} products)
          </div>

          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.productId} className="product-card">
                {/* Image Placeholder used if actual image fails or placeholder API is slow */}

                <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={product.image || "https://placehold.co/180x120"}
                    alt={product.name}
                    className="product-img"
                  />

                  <div className="product-info">
                    <h3>{product.name}</h3>

                    <span className="product-price">${product.price}
                    </span>
                    &nbsp; &ensp; 
                    {/* &ensp; */}

                      <span className="product-rating">
                        {product.rating} ⭐
                      </span>
                    {/* <div className="product-rating">
                      {product.rating} ⭐
                    </div> */}
                  </div>

                </Link>

                <div className="card-buttons">
                  <button className="btn-primary"
                    onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="btn-secondary"
                    onClick={() => addToWishlist(product)}>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;