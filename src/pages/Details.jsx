import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productsApi.js';
import { ErrorMessage } from '../components/ErrorMessage.jsx';
import { Loader } from '../components/Loader.jsx';
import { useFavourites } from '../context/FavouritesContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

export default function Details() {
  const { id } = useParams();
  const { getProductFromCache } = useProducts();
  const { addToFavourites, isFavourite } = useFavourites();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      const cachedProduct = getProductFromCache(id);

      if (cachedProduct) {
        setProduct(cachedProduct);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const loadedProduct = await fetchProductById(id);

        if (!ignore) {
          setProduct(loadedProduct);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message || 'Ошибка загрузки товара');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      ignore = true;
    };
  }, [id, getProductFromCache]);

  const mainImage = useMemo(
    () => product?.images?.[0] || product?.thumbnail || '',
    [product],
  );

  const handleAddToFavourites = useCallback(() => {
    if (product) {
      addToFavourites(product);
    }
  }, [product, addToFavourites]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!product) {
    return null;
  }

  return (
    <section>
      <Link to="/list" className="back-link">
        ← Вернуться в каталог
      </Link>

      <article className="details">
        <div className="details-image-wrapper">
          <img className="details-image" src={mainImage} alt={product.title} />
        </div>

        <div className="details-content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <div className="details-meta">
            <span>Цена: {product.price} $</span>
            <span>Скидка: {product.discountPercentage}%</span>
            <span>Рейтинг: {product.rating}</span>
            <span>Бренд: {product.brand || 'не указан'}</span>
          </div>

          <button type="button" className="button" onClick={handleAddToFavourites}>
            {isFavourite(product.id) ? 'Добавить ещё раз' : 'Добавить в избранное'}
          </button>
        </div>
      </article>
    </section>
  );
}
