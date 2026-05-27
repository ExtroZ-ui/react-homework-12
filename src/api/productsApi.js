const API_URL = 'https://dummyjson.com/products';

async function requestJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Не удалось получить данные с сервера');
  }

  return response.json();
}

export async function fetchProducts() {
  const data = await requestJson(`${API_URL}?limit=12`);
  return data.products;
}

export async function fetchProductById(id) {
  return requestJson(`${API_URL}/${id}`);
}
