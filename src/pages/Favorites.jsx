import ProductCard from '../components/ProductCard.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section>
      <div className="page-title">
        <p className="meta">Context API</p>
        <h1>Избранные товары</h1>
        <p>
          Здесь отображаются товары, которые пользователь добавил в избранное.
          Список хранится в Context API и дополнительно сохраняется в localStorage.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-box">Пока нет избранных товаров.</div>
      ) : (
        <div className="grid">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
