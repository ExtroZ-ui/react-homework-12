import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { fetchProductById, fetchProducts } from '../api/productsApi.js';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const loadProducts = useCallback(async (signal) => {
    if (loaded || loading) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      const productsFromApi = await fetchProducts(signal);
      setProducts(productsFromApi);
      setLoaded(true);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Не удалось загрузить список товаров');
      }
    } finally {
      setLoading(false);
    }
  }, [loaded, loading]);

  const getProductById = useCallback((id) => {
    return products.find((product) => String(product.id) === String(id));
  }, [products]);

  const loadProductById = useCallback(async (id, signal) => {
    const productFromState = products.find(
      (product) => String(product.id) === String(id),
    );

    if (productFromState) {
      return productFromState;
    }

    const productFromApi = await fetchProductById(id, signal);
    setProducts((currentProducts) => {
      const alreadyExists = currentProducts.some(
        (product) => String(product.id) === String(productFromApi.id),
      );

      if (alreadyExists) {
        return currentProducts;
      }

      return [...currentProducts, productFromApi];
    });

    return productFromApi;
  }, [products]);

  const value = useMemo(() => ({
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    loadProductById,
  }), [products, loading, error, loadProducts, getProductById, loadProductById]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts должен использоваться внутри ProductsProvider');
  }

  return context;
}
