const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  path: string,
  token: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export type ImageUploadType = 'logo' | 'hero' | 'branch' | 'section';
export type PdfUploadType = 'privacy' | 'terms';

export async function uploadImage(
  file: File,
  token: string,
  type?: ImageUploadType
): Promise<{ url: string; alt: string }> {
  const body = new FormData();
  body.append('file', file);
  if (type) body.append('type', type);

  const res = await fetch(`${BASE_URL}/uploads/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
  if (res.status === 413) throw new Error('File too large');
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  return res.json() as Promise<{ url: string; alt: string }>;
}

export async function uploadPdf(
  file: File,
  token: string,
  type?: PdfUploadType
): Promise<{ url: string; source: string }> {
  const body = new FormData();
  body.append('file', file);
  if (type) body.append('type', type);

  const res = await fetch(`${BASE_URL}/api/uploads/pdf`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
  if (res.status === 413) throw new Error('File too large');
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  return res.json() as Promise<{ url: string; source: string }>;
}
