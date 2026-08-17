const API_BASE = '/api';

export async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const config = {
    method: options.method || 'GET',
    headers,
    credentials: 'include',
  };
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }
  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.code !== 0) {
    throw new Error(data.message || 'حدث خطأ غير متوقع');
  }
  return data.data;
}
