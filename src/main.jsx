import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
