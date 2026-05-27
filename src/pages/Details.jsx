import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loader from '../components/Loader.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

export default function Details() {
  const { id } = useParams();
  const { loadProductById, getProductById } = useProducts();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const [product, setProduct] = useState(() => getProductById(id));
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadDetails() {
      try {
        setLoading(true);
        setError('');
        const productData = await loadProductById(id, controller.signal);
        setProduct(productData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Не удалось загрузить данные товара');
        }
      } finally {
        setLoading(false);
      }
    }

    loadDetails();

    return () => controller.abort();
  }, [id, loadProductById]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!product) {
    return <ErrorMessage message="Товар не найден" />;
  }

  const favorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <section className="details">
      <Link className="back-link" to="/list">← Назад к каталогу</Link>

      <div className="details-card">
        <div className="details-image-wrap">
          <img
            className="details-image"
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
          />
        </div>

        <div className="details-info">
          <p className="meta">{product.brand || 'Без бренда'} / {product.category}</p>
          <h1>{product.title}</h1>
          <p className="details-description">{product.description}</p>

          <div className="details-meta">
            <span>Цена: <strong>${product.price}</strong></span>
            <span>Рейтинг: <strong>★ {product.rating}</strong></span>
            <span>Остаток: <strong>{product.stock} шт.</strong></span>
          </div>

          <button className="button button-primary" onClick={handleFavoriteClick}>
            {favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          </button>
        </div>
      </div>
    </section>
  );
}
