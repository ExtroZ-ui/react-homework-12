import { memo } from 'react';
import { Link } from 'react-router-dom';

function ProductCardComponent({ product }) {
  return (
    <article className="card">
      <img className="card-image" src={product.thumbnail} alt={product.title} loading="lazy" />
      <div className="card-content">
        <p className="card-category">{product.category}</p>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div className="card-meta">
          <span>{product.price} $</span>
          <span>Рейтинг: {product.rating}</span>
        </div>
        <Link to={`/list/${product.id}`} className="button button-secondary">
          Подробнее
        </Link>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
