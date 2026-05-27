import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { Loader } from './components/Loader.jsx';
import { FavouritesProvider } from './context/FavouritesContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const List = lazy(() => import('./pages/List.jsx'));
const Details = lazy(() => import('./pages/Details.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Favourites = lazy(() => import('./pages/Favourites.jsx'));

export function AppContent() {
  return (
    <>
      <Header />
      <main className="container main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/list/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/favorites" element={<Navigate to="/favourites" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default function App() {
  return (
    <ProductsProvider>
      <FavouritesProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </FavouritesProvider>
    </ProductsProvider>
  );
}
