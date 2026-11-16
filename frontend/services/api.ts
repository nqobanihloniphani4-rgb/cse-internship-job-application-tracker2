export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://cse-internship-job-application-tracker2.onrender.com';

interface RequestOptions extends RequestInit {
  adminPassword?: string;
}

export async function fetchWithAuth(url: string, options: RequestOptions = {}) {
  const { adminPassword, headers, ...customConfig } = options;

  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (adminPassword) {
    reqHeaders['x-admin-password'] = adminPassword;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...customConfig,
    headers: reqHeaders,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API Request failed');
  }

  return data;
}