// src/pages/HomePage.jsx - Home Page Component

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router
import Navbar from '../Components/Navbar';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories from your backend
    fetch('http://localhost:5000/api/categories') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        setCategories(data.data.categories);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div> 

    <Navbar/>
    <div className="home-page-container">

      <h1>Featured Categories</h1>
      <div className="category-list">
        {categories.map(category => (
          // Link to the product list page, passing categoryId in the URL
          <Link 
            to={`/products/${category.categoryId}`} 
            key={category.categoryId} 
            className="category-card"
          >
            <h2>{category.name}</h2>
            {/* <p>Shop {category.name}</p> */}
          </Link>
        ))}
      </div>
      
      {/* Basic Styling Hint for CSS */}
      <style>{`

        .home-page-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

         .category-list {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .category-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        //   gap: 20px;
          margin-top: 20px;
        }

        .category-card {
          border: 1px solid #ddd;
        //   padding: 20px;
          border-radius: 8px;
          text-align: center;
          text-decoration: none; /* Remove underline from Link */
          color: inherit;
          transition: transform 0.2s;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

      `}</style>

    </div>
     </div>
  );
}

export default HomePage;