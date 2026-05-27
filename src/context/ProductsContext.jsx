import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { fetchProducts } from '../api/productsApi.js';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    if (products.length > 0) {
      return products;
    }

    try {
      setIsLoading(true);
      setError('');
      const loadedProducts = await fetchProducts();
      setProducts(loadedProducts);
      return loadedProducts;
    } catch (requestError) {
      setError(requestError.message || 'Ошибка загрузки каталога');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [products]);

  const getProductFromCache = useCallback(
    (productId) => products.find((product) => String(product.id) === String(productId)),
    [products],
  );

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
      loadProducts,
      getProductFromCache,
    }),
    [products, isLoading, error, loadProducts, getProductFromCache],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts должен использоваться внутри ProductsProvider');
  }

  return context;
}
