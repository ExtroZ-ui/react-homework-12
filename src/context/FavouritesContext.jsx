import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'react-shop-favourites';

const FavouritesContext = createContext(null);

function readFavouritesFromStorage() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    return savedValue ? JSON.parse(savedValue) : [];
  } catch {
    return [];
  }
}

function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    rating: product.rating,
    thumbnail: product.thumbnail || product.images?.[0],
    quantity: 1,
  };
}

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(readFavouritesFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = useCallback((product) => {
    setFavourites((currentItems) => {
      const existingProduct = currentItems.find((item) => item.id === product.id);

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, normalizeProduct(product)];
    });
  }, []);

  const removeFromFavourites = useCallback((productId) => {
    setFavourites((currentItems) => currentItems.filter((item) => item.id !== productId));
  }, []);

  const clearFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  const isFavourite = useCallback(
    (productId) => favourites.some((item) => item.id === productId),
    [favourites],
  );

  const totalCount = useMemo(
    () => favourites.reduce((sum, item) => sum + item.quantity, 0),
    [favourites],
  );

  const totalPrice = useMemo(
    () => favourites.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [favourites],
  );

  const value = useMemo(
    () => ({
      favourites,
      addToFavourites,
      removeFromFavourites,
      clearFavourites,
      isFavourite,
      totalCount,
      totalPrice,
    }),
    [
      favourites,
      addToFavourites,
      removeFromFavourites,
      clearFavourites,
      isFavourite,
      totalCount,
      totalPrice,
    ],
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites должен использоваться внутри FavouritesProvider');
  }

  return context;
}
