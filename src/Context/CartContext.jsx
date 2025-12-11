import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

   // --- NEW CODE: Search State ---
  const [searchQuery, setSearchQuery] = useState(""); 
  // ------------------------------

  // Logic: Add to Cart (Increments qty if exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
    alert(`${product.name} added to Cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };


   const incrementQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  // NEW: Clear Cart after successful payment
  const clearCart = () => {
    setCart([]);
  };

  // Logic: Add to Wishlist (Avoid duplicates)
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.productId === product.productId)) {
        return [...prev, product];
      }
      return prev;
    });
    // Optional: Alert user
    alert(`${product.name} added to Wishlist!`);
  };

  // Logic: Remove from Wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Logic: Move from Wishlist to Cart
  const moveFromWishlistToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.productId);
  };

   // Move from Cart to Wishlist
  const moveFromCartToWishlist = (product) => {
    addToWishlist(product);
    removeFromCart(product.productId);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      wishlist, 
      searchQuery,    
      setSearchQuery,
      addToCart, 
      removeFromCart,
      incrementQty,
      decrementQty,
      clearCart,
      addToWishlist, 
      removeFromWishlist, 
      moveFromWishlistToCart,
      moveFromCartToWishlist 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default useCart;