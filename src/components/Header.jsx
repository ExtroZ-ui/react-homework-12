import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext.jsx';

function HeaderComponent() {
  const { totalCount } = useFavourites();

  const getLinkClassName = ({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link');

  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="logo">
          React Shop
        </NavLink>

        <nav className="navigation" aria-label="Основная навигация">
          <NavLink to="/" className={getLinkClassName}>
            Главная
          </NavLink>
          <NavLink to="/list" className={getLinkClassName}>
            Каталог
          </NavLink>
          <NavLink to="/favourites" className={getLinkClassName}>
            Избранное ({totalCount})
          </NavLink>
          <NavLink to="/about" className={getLinkClassName}>
            О проекте
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
