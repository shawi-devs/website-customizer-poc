import { useQuery } from '@tanstack/react-query';
import { useAuthInfo } from '@propelauth/react';
import { apiFetch } from '../lib/api';

export interface ApiBranch {
  id: string;
  name: string;
  subdomain: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function useBranches() {
  const { accessToken } = useAuthInfo();

  return useQuery({
    queryKey: ['branches', accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error('Not authenticated');
      const data = await apiFetch<{ branches: ApiBranch[] }>('/business/branches', accessToken);
      return data.branches;
    },
    enabled: !!accessToken,
  });
}
