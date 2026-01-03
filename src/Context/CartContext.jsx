import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // --- STATE INITIALIZATION WITH LOCAL STORAGE ---
  
  // 1. Initialize Wishlist from Local Storage if available
  const [wishlist, setWishlist] = useState(  () => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error reading wishlist from localStorage", error);
      return [];
    }
  });

  // 2. Initialize Cart from Local Storage if available 
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }
  });

   // --- NEW CODE: Search State ---
  const [searchQuery, setSearchQuery] = useState(""); 
  // ------------------------------

  // --- PERSISTENCE EFFECTS ---

  // 3. Save Wishlist to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 4. Save Cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);



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
    // alert(`${product.name} added to Cart!`);
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
    setCart((prev) => {
      // Find the item first to check quantity
      const existingItem = prev.find((item) => item.productId === productId);
      
      if (existingItem?.qty === 1) {
        // If quantity is 1, remove the item entirely
        return prev.filter((item) => item.productId !== productId);
      } else {
        // Otherwise decrement
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, qty: item.qty - 1 }
            : item
        );
      }
    }
      
      // prev.map((item) =>
      //   item.productId === productId
      //     ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
      //     : item
      // )
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
    // alert(`${product.name} added to Wishlist!`);
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