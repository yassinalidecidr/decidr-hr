export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    startDate: string;
    organisation: {
      settings: {
        allowedDomains: string[];
      };
      _id: string;
      name: string;
      domain: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

export const storeAuthData = (data: AuthResponse) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  document.cookie = `token=${data.token}; path=/; max-age=86400`;
}; 