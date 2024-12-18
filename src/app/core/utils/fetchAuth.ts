export function fetchWithAuth(url: string, options: RequestInit = {}) {
  const userData = localStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  return fetch(url, { ...options, headers });
}