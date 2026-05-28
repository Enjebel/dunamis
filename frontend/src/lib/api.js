export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export const apiAssetUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`;
};

export const getStoredSession = () => {
  try {
    return JSON.parse(localStorage.getItem('dunamis_session') || 'null');
  } catch {
    return null;
  }
};

export const saveSession = (session) => {
  localStorage.setItem('dunamis_session', JSON.stringify(session));
};

export const clearSession = () => {
  localStorage.removeItem('dunamis_session');
};

export const apiRequest = async (path, options = {}) => {
  const session = getStoredSession();
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === 'string'
      ? (data.trim().startsWith('<!DOCTYPE') || data.trim().startsWith('<html') ? `API route not found: ${path}. Restart the backend on ${API_BASE_URL}.` : data)
      : data.error || 'Request failed';
    throw new Error(message);
  }

  return data;
};

export const login = (email, password) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const studentLogin = (matricule, password) => {
  return apiRequest('/auth/student-login', {
    method: 'POST',
    body: JSON.stringify({ matricule, password }),
  });
};

export const requestPasswordReset = (matricule) => {
  return apiRequest('/auth/password-reset-request', {
    method: 'POST',
    body: JSON.stringify({ matricule }),
  });
};
