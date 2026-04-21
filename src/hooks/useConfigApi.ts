import { useEffect, useRef, useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthInfo } from '@propelauth/react';
import { useBranchStore } from '../store/useBranchStore';
import { apiFetch } from '../lib/api';
import { SiteConfig } from '../types';

export type SaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

const DEBOUNCE_MS = 1500;

// ---------------------------------------------------------------------------
// useConfigSync — debounced PATCH auto-save, mount once in Editor
// ---------------------------------------------------------------------------
export function useConfigSync() {
  const { accessToken } = useAuthInfo();
  const [status, setStatus] = useState<SaveStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastBranchIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Seed with the currently active branch so the initial render doesn't trigger a save
    lastBranchIdRef.current = useBranchStore.getState().activeBranchId;

    const unsub = useBranchStore.subscribe((state) => {
      if (!accessToken) return;

      const active = state.branches.find((b) => b.id === state.activeBranchId);
      if (!active) return;

      // Branch switched — config was just loaded from API, don't auto-save it back
      if (active.id !== lastBranchIdRef.current) {
        lastBranchIdRef.current = active.id;
        if (timerRef.current) clearTimeout(timerRef.current);
        setStatus('idle');
        return;
      }

      setStatus('pending');
      if (timerRef.current) clearTimeout(timerRef.current);

      const branchId = active.id;
      const config = active.config;

      timerRef.current = setTimeout(async () => {
        setStatus('saving');
        try {
          await apiFetch(`/business/branches/${branchId}/config`, accessToken, {
            method: 'PATCH',
            body: JSON.stringify(config),
          });
          setStatus('saved');
        } catch (e) {
          console.error('[ConfigSync] PATCH failed:', e);
          setStatus('error');
        }
      }, DEBOUNCE_MS);
    });

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [accessToken]);

  return status;
}

// ---------------------------------------------------------------------------
// usePutConfig — immediate full config replace (import / reset)
// ---------------------------------------------------------------------------
export function usePutConfig() {
  const { accessToken } = useAuthInfo();

  return useCallback(
    async (branchId: string, config: SiteConfig): Promise<void> => {
      if (!accessToken) throw new Error('Not authenticated');
      await apiFetch(`/business/branches/${branchId}/config`, accessToken, {
        method: 'PUT',
        body: JSON.stringify(config),
      });
    },
    [accessToken]
  );
}

// ---------------------------------------------------------------------------
// usePublishBranch — POST /business/branches/{branchId}/publish
// ---------------------------------------------------------------------------
export function usePublishBranch() {
  const { accessToken } = useAuthInfo();

  return useMutation({
    mutationFn: async (branchId: string) => {
      if (!accessToken) throw new Error('Not authenticated');
      await apiFetch(`/business/branches/${branchId}/publish`, accessToken, {
        method: 'POST',
      });
    },
  });
}
