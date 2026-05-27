import { NavLink, Outlet } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function Layout() {
  const { favorites } = useFavorites();

  const getLinkClass = ({ isActive }) => (
    isActive ? 'nav-link nav-link-active' : 'nav-link'
  );

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <div className="logo">React Shop</div>
          <nav className="nav">
            <NavLink to="/" className={getLinkClass}>Главная</NavLink>
            <NavLink to="/list" className={getLinkClass}>Каталог</NavLink>
            <NavLink to="/favorites" className={getLinkClass}>
              Избранное ({favorites.length})
            </NavLink>
            <NavLink to="/about" className={getLinkClass}>О проекте</NavLink>
          </nav>
        </div>
      </header>

      <main className="container main">
        <Outlet />
      </main>
    </div>
  );
}
