import { useEffect, useMemo } from 'react';
import { ErrorMessage } from '../components/ErrorMessage.jsx';
import { Loader } from '../components/Loader.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

export default function List() {
  const { products, isLoading, error, loadProducts } = useProducts();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const sortedProducts = useMemo(
    () => [...products].sort((firstProduct, secondProduct) => firstProduct.title.localeCompare(secondProduct.title)),
    [products],
  );

  return (
    <section>
      <div className="page-title">
        <p className="eyebrow">Каталог</p>
        <h1>Список товаров</h1>
        <p>Данные загружаются из внешнего API и сохраняются в контексте приложения.</p>
      </div>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <div className="grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
