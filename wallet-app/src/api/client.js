const API_BASE = '/api';

let onUnauthorized = null;

export function setOnUnauthorized(fn) {
  onUnauthorized = fn;
}

export async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 30000);

  const config = {
    method: options.method || 'GET',
    headers,
    credentials: 'include',
    signal: controller.signal,
  };
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    clearTimeout(timeoutId);

    if (response.status === 401 && onUnauthorized) {
      onUnauthorized();
      throw new Error('انتهت الجلسة، سجل الدخول مجدداً');
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.code !== 0) {
      throw new Error(data.message || 'حدث خطأ غير متوقع');
    }
    return data.data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('انتهت مهلة الاتصال');
    }
    throw err;
  }
}
