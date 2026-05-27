import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="content-card">
      <h1>Страница не найдена</h1>
      <p>Такого маршрута в приложении нет.</p>
      <Link className="button button-primary" to="/">На главную</Link>
    </section>
  );
}
