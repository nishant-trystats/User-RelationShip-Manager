const BASE_URL = "http://localhost:3000/api";

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`API error ${res.status}: ${msg}`);
  }

  return res.json();
}

export const api = {
  getGraph: () => request<{ data: any }>(`${BASE_URL}/graph`),

  createUser: (user: any) =>
    request(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ user }),
    }),

  updateUser: (id: string, data: any) =>
    request(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    }),

  deleteUser: (id: string) =>
    request(`${BASE_URL}/users/${id}`, { method: "DELETE" }),

  linkUsers: (targetId: string, fromId: string) =>
    request(`${BASE_URL}/users/${targetId}/link`, {
      method: "POST",
      body: JSON.stringify({ fromId }),
    }),

  unlinkUsers: (targetId: string, fromId: string) =>
    request(`${BASE_URL}/users/${targetId}/unlink`, {
      method: "DELETE",
      body: JSON.stringify({ fromId }),
    }),
};
