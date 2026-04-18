import { create } from 'zustand';
import { SiteConfig, DEFAULT_SITE_CONFIG } from '../types';
import { useBranchStore } from './useBranchStore';

interface SiteConfigStore {
  config: SiteConfig;
  updateConfig: (updates: Partial<SiteConfig>) => void;
  updateBranding: (branding: Partial<SiteConfig['branding']>) => void;
  updateContent: (content: Partial<SiteConfig['content']>) => void;
  updatePages: (pages: Partial<SiteConfig['pages']>) => void;
  updateSettings: (settings: Partial<SiteConfig['settings']>) => void;
  updateSocial: (social: Partial<SiteConfig['social']>) => void;
  updatePublishing: (publishing: Partial<SiteConfig['publishing']>) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (configJson: string) => boolean;
}

// Helper: read active branch config from branch store
function getActiveBranchConfig(): SiteConfig {
  const branch = useBranchStore.getState().getActiveBranch();
  return branch?.config ?? DEFAULT_SITE_CONFIG;
}

// Helper: write a full config update to the active branch
function patchActiveBranch(updates: Partial<SiteConfig>) {
  useBranchStore.getState().updateActiveBranchConfig(updates);
}

// Helper: merge a nested key and persist
function mergeKey<K extends keyof SiteConfig>(
  key: K,
  partial: Partial<SiteConfig[K]>
) {
  const current = getActiveBranchConfig();
  patchActiveBranch({
    [key]: { ...(current[key] as object), ...(partial as object) },
  } as Partial<SiteConfig>);
}

export const useSiteConfigStore = create<SiteConfigStore>(() => {
  // Seed the store's config from whatever branch is currently active.
  // After init, the store reacts to branch-store changes via the subscription below.
  const initialConfig = getActiveBranchConfig();

  return {
    config: initialConfig,

    updateConfig: (updates) => {
      patchActiveBranch(updates);
    },

    updateBranding: (branding) => {
      mergeKey('branding', branding);
    },

    updateContent: (content) => {
      mergeKey('content', content);
    },

    updatePages: (pages) => {
      mergeKey('pages', pages);
    },

    updateSettings: (settings) => {
      mergeKey('settings', settings);
    },

    updateSocial: (social) => {
      mergeKey('social', social);
    },

    updatePublishing: (publishing) => {
      mergeKey('publishing', publishing);
    },

    resetConfig: () => {
      useBranchStore.getState().setActiveBranchConfig({ ...DEFAULT_SITE_CONFIG });
    },

    exportConfig: () => {
      return JSON.stringify(getActiveBranchConfig(), null, 2);
    },

    importConfig: (configJson: string) => {
      try {
        const parsed = JSON.parse(configJson) as SiteConfig;
        useBranchStore.getState().setActiveBranchConfig(parsed);
        return true;
      } catch {
        return false;
      }
    },
  };
});

// Keep useSiteConfigStore.config in sync whenever the branch store changes
// (branch switch, any config mutation, publish, etc.)
useBranchStore.subscribe((branchState) => {
  const branch = branchState.branches.find(
    (b) => b.id === branchState.activeBranchId
  ) ?? branchState.branches[0];

  const newConfig = branch?.config ?? DEFAULT_SITE_CONFIG;
  useSiteConfigStore.setState({ config: newConfig });
});
