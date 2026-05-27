const API_URL = import.meta.env.VITE_API_URL || 'https://dummyjson.com';

async function request(path, signal) {
  const response = await fetch(`${API_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchProducts(signal) {
  const data = await request('/products?limit=12', signal);
  return data.products ?? [];
}

export async function fetchProductById(id, signal) {
  return request(`/products/${id}`, signal);
}
