import { useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loader from '../components/Loader.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

export default function List() {
  const { products, loading, error, loadProducts } = useProducts();

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);

    return () => controller.abort();
  }, [loadProducts]);

  return (
    <section>
      <div className="page-title">
        <p className="meta">/list</p>
        <h1>Список товаров</h1>
        <p>
          Данные загружаются из API и сохраняются в глобальном состоянии,
          чтобы не делать повторный запрос при переходе на страницу товара.
        </p>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
