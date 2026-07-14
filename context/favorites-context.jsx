"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "maison-elyra-favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* Charger les favoris depuis localStorage */
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);

      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        }
      }
    } catch (error) {
      console.error("Impossible de charger les favoris :", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /* Sauvegarder les favoris */
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Impossible de sauvegarder les favoris :", error);
    }
  }, [favorites, isLoaded]);

  const isFavorite = useCallback(
    (productHref) => {
      return favorites.some(
        (product) => product.href === productHref
      );
    },
    [favorites]
  );

  const toggleFavorite = useCallback((product) => {
    if (!product?.href) return;

    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.href === product.href
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (item) => item.href !== product.href
        );
      }

      return [...currentFavorites, product];
    });
  }, []);

  const removeFavorite = useCallback((productHref) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (product) => product.href !== productHref
      )
    );
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      isLoaded,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [
      favorites,
      isLoaded,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites doit être utilisé dans FavoritesProvider"
    );
  }

  return context;
}