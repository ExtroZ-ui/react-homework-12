import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../App.jsx';
import { FavouritesProvider } from '../context/FavouritesContext.jsx';
import { ProductsProvider } from '../context/ProductsContext.jsx';

function renderRoute(route) {
  return render(
    <ProductsProvider>
      <FavouritesProvider>
        <MemoryRouter initialEntries={[route]}>
          <AppContent />
        </MemoryRouter>
      </FavouritesProvider>
    </ProductsProvider>,
  );
}

describe('Маршрутизация приложения', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('отображает главную страницу', async () => {
    renderRoute('/');

    expect(await screen.findByRole('heading', { name: /React-приложение интернет-магазина/i })).toBeInTheDocument();
  });

  test('отображает страницу о проекте', async () => {
    renderRoute('/about');

    expect(await screen.findByRole('heading', { name: /Интернет-магазин на React/i })).toBeInTheDocument();
  });

  test('отображает пустую страницу избранного', async () => {
    renderRoute('/favourites');

    expect(await screen.findByRole('heading', { name: /Избранное пустое/i })).toBeInTheDocument();
  });
});
