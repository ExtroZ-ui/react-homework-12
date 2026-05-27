import { memo } from 'react';
import { Link } from 'react-router-dom';

function FavouriteItemComponent({ item, onRemove }) {
  return (
    <article className="favorite-card">
      <img className="favorite-image" src={item.thumbnail} alt={item.title} loading="lazy" />
      <div className="favorite-content">
        <p className="card-category">{item.category}</p>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <div className="card-meta">
          <span>Количество: {item.quantity}</span>
          <span>Цена: {item.price} $</span>
          <span>Итого: {item.price * item.quantity} $</span>
        </div>
        <div className="actions-row">
          <Link to={`/list/${item.id}`} className="button button-secondary">
            Открыть товар
          </Link>
          <button type="button" className="button button-danger" onClick={() => onRemove(item.id)}>
            Удалить
          </button>
        </div>
      </div>
    </article>
  );
}

export const FavouriteItem = memo(FavouriteItemComponent);
