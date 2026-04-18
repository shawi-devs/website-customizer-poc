import { create } from 'zustand';
import { Branch, SiteConfig, DEFAULT_SITE_CONFIG } from '../types';

const BRANCHES_KEY = 'shawi-branches';
const LEGACY_CONFIG_KEY = 'shawi-site-config';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createDefaultBranch(overrides?: Partial<Branch>): Branch {
  return {
    id: generateId(),
    name: 'Main Branch',
    subdomain: 'main',
    config: { ...DEFAULT_SITE_CONFIG },
    publishedConfig: null,
    isPublished: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...overrides,
  };
}

interface BranchStoreState {
  branches: Branch[];
  activeBranchId: string | null;

  // Getters
  getActiveBranch: () => Branch | null;

  // Branch CRUD
  createBranch: (name: string, subdomain: string) => Branch;
  deleteBranch: (id: string) => void;
  switchBranch: (id: string) => void;

  // Config writes (called by the site config store)
  updateActiveBranchConfig: (updates: Partial<SiteConfig>) => void;
  setActiveBranchConfig: (config: SiteConfig) => void;

  // Publish
  publishActiveBranch: () => void;
}

function loadState(): { branches: Branch[]; activeBranchId: string | null } {
  try {
    const raw = localStorage.getItem(BRANCHES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { branches: Branch[]; activeBranchId: string | null };
      if (Array.isArray(parsed.branches) && parsed.branches.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fall through to migration
  }

  // Migration: if old single-config key exists, seed first branch from it
  try {
    const legacyRaw = localStorage.getItem(LEGACY_CONFIG_KEY);
    if (legacyRaw) {
      const legacyConfig = JSON.parse(legacyRaw) as SiteConfig;
      const merged: SiteConfig = {
        ...DEFAULT_SITE_CONFIG,
        ...legacyConfig,
        content: { ...DEFAULT_SITE_CONFIG.content, ...legacyConfig.content },
        branding: { ...DEFAULT_SITE_CONFIG.branding, ...legacyConfig.branding },
        settings: { ...DEFAULT_SITE_CONFIG.settings, ...legacyConfig.settings },
        social: { ...DEFAULT_SITE_CONFIG.social, ...legacyConfig.social },
        publishing: { ...DEFAULT_SITE_CONFIG.publishing, ...legacyConfig.publishing },
      };
      const branch = createDefaultBranch({
        name: merged.branding.companyName || 'Main Branch',
        subdomain: merged.publishing.customSubdomain || 'main',
        config: merged,
        isPublished: merged.publishing.isPublished ?? false,
      });
      return { branches: [branch], activeBranchId: branch.id };
    }
  } catch {
    // fall through to blank default
  }

  const branch = createDefaultBranch();
  return { branches: [branch], activeBranchId: branch.id };
}

function persist(branches: Branch[], activeBranchId: string | null) {
  localStorage.setItem(BRANCHES_KEY, JSON.stringify({ branches, activeBranchId }));
}

const initial = loadState();

export const useBranchStore = create<BranchStoreState>((set, get) => ({
  branches: initial.branches,
  activeBranchId: initial.activeBranchId,

  getActiveBranch: () => {
    const { branches, activeBranchId } = get();
    return branches.find((b) => b.id === activeBranchId) ?? branches[0] ?? null;
  },

  createBranch: (name, subdomain) => {
    const newBranch = createDefaultBranch({ name, subdomain });
    set((state) => {
      const branches = [...state.branches, newBranch];
      persist(branches, newBranch.id);
      return { branches, activeBranchId: newBranch.id };
    });
    return newBranch;
  },

  deleteBranch: (id) => {
    set((state) => {
      const branches = state.branches.filter((b) => b.id !== id);
      // If deleted branch was active, switch to first remaining
      let activeBranchId = state.activeBranchId;
      if (activeBranchId === id) {
        activeBranchId = branches[0]?.id ?? null;
      }
      persist(branches, activeBranchId);
      return { branches, activeBranchId };
    });
  },

  switchBranch: (id) => {
    set((state) => {
      if (!state.branches.find((b) => b.id === id)) return state;
      persist(state.branches, id);
      return { activeBranchId: id };
    });
  },

  updateActiveBranchConfig: (updates) => {
    set((state) => {
      const active = state.branches.find((b) => b.id === state.activeBranchId);
      if (!active) return state;
      const branches = state.branches.map((b) =>
        b.id === active.id
          ? { ...b, config: { ...b.config, ...updates }, updatedAt: Date.now() }
          : b
      );
      persist(branches, state.activeBranchId);
      return { branches };
    });
  },

  setActiveBranchConfig: (config) => {
    set((state) => {
      const active = state.branches.find((b) => b.id === state.activeBranchId);
      if (!active) return state;
      const branches = state.branches.map((b) =>
        b.id === active.id ? { ...b, config, updatedAt: Date.now() } : b
      );
      persist(branches, state.activeBranchId);
      return { branches };
    });
  },

  publishActiveBranch: () => {
    set((state) => {
      const active = state.branches.find((b) => b.id === state.activeBranchId);
      if (!active) return state;
      const publishedConfig = { ...active.config };
      console.log(
        `[Publish] Branch "${active.name}" (${active.subdomain}.shawi.app)`,
        JSON.stringify(publishedConfig, null, 2)
      );
      const branches = state.branches.map((b) =>
        b.id === active.id
          ? { ...b, isPublished: true, publishedConfig, updatedAt: Date.now() }
          : b
      );
      persist(branches, state.activeBranchId);
      return { branches };
    });
  },
}));
