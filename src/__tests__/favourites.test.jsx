import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../App.jsx';
import { FavouritesProvider } from '../context/FavouritesContext.jsx';
import { ProductsProvider } from '../context/ProductsContext.jsx';

const product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://example.com/iphone.png',
  images: ['https://example.com/iphone.png'],
};

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

describe('Избранное', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(product),
      }),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('добавляет товар в избранное и показывает его на странице избранного', async () => {
    const user = userEvent.setup();
    renderRoute('/list/1');

    expect(await screen.findByRole('heading', { name: /iPhone 9/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Добавить в избранное/i }));
    await user.click(screen.getByRole('link', { name: /Избранное \(1\)/i }));

    expect(await screen.findByRole('heading', { name: /Выбранные товары/i })).toBeInTheDocument();
    expect(screen.getByText(/Количество: 1/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /iPhone 9/i })).toBeInTheDocument();
  });

  test('удаляет товар из избранного', async () => {
    const user = userEvent.setup();
    renderRoute('/list/1');

    expect(await screen.findByRole('heading', { name: /iPhone 9/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Добавить в избранное/i }));
    await user.click(screen.getByRole('link', { name: /Избранное \(1\)/i }));
    await user.click(await screen.findByRole('button', { name: /Удалить/i }));

    expect(await screen.findByRole('heading', { name: /Избранное пустое/i })).toBeInTheDocument();
  });
});
