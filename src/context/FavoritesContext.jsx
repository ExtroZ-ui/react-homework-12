import { createContext, useContext, useMemo, useState } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorite-products');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const saveFavorites = (nextFavorites) => {
    setFavorites(nextFavorites);
    localStorage.setItem('favorite-products', JSON.stringify(nextFavorites));
  };

  const addToFavorites = (product) => {
    const alreadyAdded = favorites.some((item) => item.id === product.id);

    if (alreadyAdded) {
      return;
    }

    saveFavorites([...favorites, product]);
  };

  const removeFromFavorites = (id) => {
    saveFavorites(favorites.filter((product) => product.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((product) => product.id === Number(id));
  };

  const value = useMemo(() => ({
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }), [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites должен использоваться внутри FavoritesProvider');
  }

  return context;
}
