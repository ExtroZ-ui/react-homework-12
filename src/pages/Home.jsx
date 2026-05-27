import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <div>
        <p className="meta">Домашнее задание 12</p>
        <h1>Каталог товаров на React</h1>
        <p>
          Приложение показывает работу маршрутизации, загрузку данных из API,
          обработку ошибок и управление избранными товарами через Context API.
        </p>
        <Link className="button button-primary hero-button" to="/list">
          Перейти в каталог
        </Link>
      </div>
    </section>
  );
}
