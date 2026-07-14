"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "maison-elyra-cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Impossible de charger le panier :", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Impossible de sauvegarder le panier :", error);
    }
  }, [cart, isLoaded]);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((currentValue) => !currentValue);
  }, []);

  const addToCart = useCallback((product) => {
    if (!product?.href) return;

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.href === product.href
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.href === product.href
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // Kay7ell panier automatiquement mlli tzid produit
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productHref) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.href !== productHref)
    );
  }, []);

  const increaseQuantity = useCallback((productHref) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.href === productHref
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productHref) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.href === productHref
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      isLoaded,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      isLoaded,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart doit être utilisé dans CartProvider"
    );
  }

  return context;
}