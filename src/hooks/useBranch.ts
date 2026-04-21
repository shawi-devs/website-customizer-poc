import { useAuthInfo } from '@propelauth/react';
import { useCallback, useState } from 'react';
import { apiFetch } from '../lib/api';
import { Branch, DEFAULT_SITE_CONFIG, SiteConfig } from '../types';

interface ApiBranchDetail {
  id: string;
  name: string;
  subdomain: string | null;
  config: Partial<SiteConfig>;
  published_config: Partial<SiteConfig> | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

function mergeConfig(partial: Partial<SiteConfig>): SiteConfig {
  return {
    ...DEFAULT_SITE_CONFIG,
    ...partial,
    branding:    { ...DEFAULT_SITE_CONFIG.branding,    ...(partial.branding    ?? {}) },
    content:     { ...DEFAULT_SITE_CONFIG.content,     ...(partial.content     ?? {}) },
    pages:       { ...DEFAULT_SITE_CONFIG.pages,       ...(partial.pages       ?? {}) },
    settings:    { ...DEFAULT_SITE_CONFIG.settings,    ...(partial.settings    ?? {}) },
    social:      { ...DEFAULT_SITE_CONFIG.social,      ...(partial.social      ?? {}) },
    publishing:  { ...DEFAULT_SITE_CONFIG.publishing,  ...(partial.publishing  ?? {}) },
  };
}

export function mapApiBranchDetail(api: ApiBranchDetail): Branch {
  return {
    id:              api.id,
    name:            api.name,
    subdomain:       api.subdomain ?? '',
    config:          mergeConfig(api.config ?? {}),
    publishedConfig: api.published_config ? mergeConfig(api.published_config) : null,
    isPublished:     api.is_published,
    createdAt:       new Date(api.created_at).getTime(),
    updatedAt:       new Date(api.updated_at).getTime(),
  };
}

export function useFetchBranch() {
  const { accessToken } = useAuthInfo();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBranch = useCallback(async (id: string): Promise<Branch | null> => {
    if (!accessToken) return null;
    setLoadingId(id);
    setError(null);
    try {
      const data = await apiFetch<ApiBranchDetail>(`/business/branches/${id}`, accessToken);
      return mapApiBranchDetail(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load branch');
      return null;
    } finally {
      setLoadingId(null);
    }
  }, [accessToken]);

  return { fetchBranch, loadingId, error };
}
