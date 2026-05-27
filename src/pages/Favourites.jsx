import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FavouriteItem } from '../components/FavouriteItem.jsx';
import { useFavourites } from '../context/FavouritesContext.jsx';

export default function Favourites() {
  const { favourites, removeFromFavourites, clearFavourites, totalCount, totalPrice } = useFavourites();

  const sortedFavourites = useMemo(
    () => [...favourites].sort((firstItem, secondItem) => firstItem.title.localeCompare(secondItem.title)),
    [favourites],
  );

  if (favourites.length === 0) {
    return (
      <section className="empty-state">
        <h1>Избранное пустое</h1>
        <p>Откройте каталог и добавьте товары в избранное.</p>
        <Link to="/list" className="button">
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-title page-title-row">
        <div>
          <p className="eyebrow">Избранное</p>
          <h1>Выбранные товары</h1>
          <p>
            Всего товаров с учётом количества: {totalCount}. Общая сумма: {totalPrice.toFixed(2)} $
          </p>
        </div>
        <button type="button" className="button button-danger" onClick={clearFavourites}>
          Очистить список
        </button>
      </div>

      <div className="favorites-list">
        {sortedFavourites.map((item) => (
          <FavouriteItem key={item.id} item={item} onRemove={removeFromFavourites} />
        ))}
      </div>
    </section>
  );
}
