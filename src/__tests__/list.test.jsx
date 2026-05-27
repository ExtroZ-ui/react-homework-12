import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../App.jsx';
import { FavouritesProvider } from '../context/FavouritesContext.jsx';
import { ProductsProvider } from '../context/ProductsContext.jsx';

const products = [
  {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    rating: 4.69,
    category: 'smartphones',
    thumbnail: 'https://example.com/iphone.png',
  },
  {
    id: 2,
    title: 'Samsung Universe 9',
    description: 'Samsung new variant',
    price: 1249,
    rating: 4.09,
    category: 'smartphones',
    thumbnail: 'https://example.com/samsung.png',
  },
];

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

describe('Каталог', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ products }),
      }),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('загружает и отображает список товаров', async () => {
    renderRoute('/list');

    expect(await screen.findByRole('heading', { name: /iPhone 9/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Samsung Universe 9/i })).toBeInTheDocument();
  });
});
