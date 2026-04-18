import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DesktopIcon,
  DeviceMobileCameraIcon,
  ArrowSquareOutIcon,
  XIcon,
  ArrowLeftIcon,
  SwatchesIcon,
  FileTextIcon,
  FilesIcon,
  ShareNetworkIcon,
  GearIcon,
  CloudArrowUpIcon,
} from '@phosphor-icons/react';
import { useSiteConfigStore } from '../store/useSiteConfigStore';
import { useBranchStore } from '../store/useBranchStore';
import SiteTemplate from '../template/SiteTemplate';
import {
  BrandingSection,
  ContentSection,
  PagesSection,
  SettingsSection,
  PublishSection,
  SocialSection,
} from './sections';

type SectionId = 'branding' | 'content' | 'pages' | 'social' | 'settings' | 'publish';
type ViewMode = 'desktop' | 'mobile';

interface NavItem {
  id: SectionId;
  label: string;
  Icon: React.ComponentType<{ size?: string | number; weight?: string }>;
  component: React.FC;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

// ---------------------------------------------------------------------------
// Sidebar nav item
// ---------------------------------------------------------------------------
function NavButton({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
        active
          ? 'bg-indigo-50 text-indigo-700 font-medium'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-normal'
      }`}
    >
      <item.Icon
        size={16}
        weight={active ? 'fill' : 'regular'}
      />
      {item.label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------
export const Editor: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { config } = useSiteConfigStore();
  const { getActiveBranch } = useBranchStore();
  const activeBranch = getActiveBranch();

  const [activeSection, setActiveSection] = useState<SectionId>('branding');
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const navGroups: NavGroup[] = [
    {
      label: 'Design',
      items: [
        { id: 'branding', label: t('nav.branding'), Icon: SwatchesIcon, component: BrandingSection },
        { id: 'content',  label: t('nav.content'),  Icon: FileTextIcon,  component: ContentSection  },
      ],
    },
    {
      label: 'Pages',
      items: [
        { id: 'pages', label: t('nav.pages'), Icon: FilesIcon, component: PagesSection },
      ],
    },
    {
      label: 'Distribution',
      items: [
        { id: 'social',   label: 'Social',          Icon: ShareNetworkIcon, component: SocialSection   },
        { id: 'settings', label: t('nav.settings'), Icon: GearIcon,         component: SettingsSection },
      ],
    },
    {
      label: 'Deploy',
      items: [
        { id: 'publish', label: t('nav.publish'), Icon: CloudArrowUpIcon, component: PublishSection },
      ],
    },
  ];

  const allItems = navGroups.flatMap((g) => g.items);
  const ActiveComponent = allItems.find((s) => s.id === activeSection)?.component;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-0 flex items-center justify-between h-14 shrink-0">
        <div className="flex items-center gap-3 h-full">
          {/* Back link */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon size={14} />
            <span>Branches</span>
          </button>

          <div className="h-4 w-px bg-gray-200" />

          <img src="/src/assets/shawi-logo.png" alt="Shawi" className="h-7 object-contain" />

          {activeBranch && (
            <>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{activeBranch.name}</span>
                <span className="text-xs text-gray-400 font-mono">{activeBranch.subdomain}.shawi.app</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setFullscreenPreview(true)}
          className="flex items-center gap-1.5 text-sm px-3.5 py-1.5 bg-gray-900 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
        >
          <ArrowSquareOutIcon size={14} />
          Preview
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="w-52 bg-white border-r border-gray-200 flex flex-col overflow-y-auto shrink-0">
          <nav className="p-3 space-y-5 flex-1">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-3 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavButton
                      key={item.id}
                      item={item}
                      active={activeSection === item.id}
                      onClick={() => setActiveSection(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Editor panel ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* Form */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-xl mx-auto py-6 px-6">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>

          {/* ── Live Preview ── */}
          <div className="w-[55%] bg-white border-l border-gray-200 overflow-hidden flex flex-col shrink-0">
            <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between h-12 shrink-0">
              <span className="text-sm font-medium text-gray-700">Preview</span>
              <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'desktop'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <DesktopIcon size={14} />
                  Desktop
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'mobile'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <DeviceMobileCameraIcon size={14} />
                  Mobile
                </button>
              </div>
            </div>

            {viewMode === 'desktop' ? (
              <div className="flex-1 overflow-y-auto bg-gray-100">
                <div className="w-full bg-white min-h-full">
                  <SiteTemplate config={config} viewMode="desktop" />
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto bg-gray-800 flex justify-center py-6">
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl min-h-full" style={{ width: '390px', flexShrink: 0 }}>
                  <SiteTemplate config={config} viewMode="mobile" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen preview */}
      {fullscreenPreview && (
        <div className="fixed inset-0 bg-white flex flex-col" style={{ zIndex: 9999 }}>
          <div className="flex items-center justify-between px-5 h-12 bg-gray-900 shrink-0">
            <span className="text-sm font-medium text-gray-300">Full Preview</span>
            <button
              onClick={() => setFullscreenPreview(false)}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <XIcon size={14} />
              Back to Editor
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="w-full bg-white min-h-full">
              <SiteTemplate config={config} viewMode="desktop" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
