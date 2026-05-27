import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function ProductCard({ product }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <article className="card">
      <img
        className="card-image"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="card-body">
        <p className="meta">{product.category}</p>
        <h2>{product.title}</h2>
        <p className="description">{product.description}</p>
        <div className="card-footer">
          <span className="price">${product.price}</span>
          <span className="rating">★ {product.rating}</span>
        </div>
        <div className="card-actions">
          <Link className="button button-primary" to={`/list/${product.id}`}>
            Подробнее
          </Link>
          <button className="button button-secondary" onClick={handleFavoriteClick}>
            {favorite ? 'Убрать' : 'В избранное'}
          </button>
        </div>
      </div>
    </article>
  );
}
