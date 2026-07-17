"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import FavoriteToast from "@/components/favorite-toast/favorite-toast";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "maison-elyra-favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [favoriteToast, setFavoriteToast] = useState(null);

  const toastTimerRef = useRef(null);

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

  /* Sauvegarder les favoris dans localStorage */
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error(
        "Impossible de sauvegarder les favoris :",
        error
      );
    }
  }, [favorites, isLoaded]);

  /* Nettoyer le timer quand le provider est démonté */
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showFavoriteToast = useCallback((product, action) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setFavoriteToast({
      product,
      action,
    });

    toastTimerRef.current = setTimeout(() => {
      setFavoriteToast(null);
      toastTimerRef.current = null;
    }, 5000);
  }, []);

  const closeFavoriteToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }

    setFavoriteToast(null);
  }, []);

  const isFavorite = useCallback(
    (productHref) => {
      return favorites.some(
        (product) => product.href === productHref
      );
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (product) => {
      const productExists = favorites.some(
        (item) => item.href === product.href
      );

      if (productExists) {
        setFavorites((currentFavorites) =>
          currentFavorites.filter(
            (item) => item.href !== product.href
          )
        );

        showFavoriteToast(product, "removed");
        return;
      }

      setFavorites((currentFavorites) => [
        ...currentFavorites,
        product,
      ]);

      showFavoriteToast(product, "added");
    },
    [favorites, showFavoriteToast]
  );

  const removeFavorite = useCallback(
    (productHref) => {
      setFavorites((currentFavorites) =>
        currentFavorites.filter(
          (product) => product.href !== productHref
        )
      );
    },
    []
  );

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

      <FavoriteToast
        toast={favoriteToast}
        onClose={closeFavoriteToast}
      />
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