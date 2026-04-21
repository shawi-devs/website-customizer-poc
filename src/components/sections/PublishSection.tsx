import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSiteConfigStore } from '../../store/useSiteConfigStore';
import { useBranchStore } from '../../store/useBranchStore';
import { usePutConfig, usePublishBranch } from '../../hooks/useConfigApi';
import { FormInput, Section } from '../common/index';

export const PublishSection: React.FC = () => {
  const { t } = useTranslation();
  const { config, updatePublishing, exportConfig } = useSiteConfigStore();
  const { publishing } = config;

  const { getActiveBranch, publishActiveBranch } = useBranchStore();
  const activeBranch = getActiveBranch();
  const putConfig = usePutConfig();
  const { mutate: publishBranch, isPending: isPublishing, isError: publishFailed } = usePublishBranch();

  const downloadRef = useRef<HTMLAnchorElement>(null);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const handleSubdomainChange = (value: string) => {
    const slugified = slugify(value);
    updatePublishing({ customSubdomain: slugified });
  };

  // Detect unpublished changes: compare current config to last published snapshot
  const hasUnpublishedChanges =
    activeBranch?.isPublished &&
    JSON.stringify(activeBranch.config) !== JSON.stringify(activeBranch.publishedConfig);

  const handlePublish = () => {
    if (!activeBranch) return;
    publishBranch(activeBranch.id, {
      onSuccess: () => {
        publishActiveBranch();
        updatePublishing({ isPublished: true });
      },
    });
  };

  const handleExportConfig = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.download = `${publishing.customSubdomain}-config.json`;
      downloadRef.current.click();
    }
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const json = event.target?.result as string;
      const success = useSiteConfigStore.getState().importConfig(json);
      if (!success) {
        alert('Failed to import config. Invalid JSON.');
        return;
      }
      const branch = useBranchStore.getState().getActiveBranch();
      if (branch) {
        try {
          await putConfig(branch.id, useSiteConfigStore.getState().config);
        } catch {
          console.error('[Import] PUT config failed');
        }
      }
      alert(t('common.import') + ' successful!');
    };
    reader.readAsText(file);
  };

  const isPublished = activeBranch?.isPublished ?? false;

  return (
    <Section title={t('publish.title')}>
      <div className="space-y-8">

        {/* Published Status */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {!isPublished
                ? t('publish.notPublished')
                : hasUnpublishedChanges
                ? 'Unpublished changes'
                : t('publish.published')}
            </h3>
            <p className="text-sm text-gray-600">
              {!isPublished
                ? 'Your site is saved but not yet published.'
                : hasUnpublishedChanges
                ? 'You have changes since the last publish. Click "Update Site" to go live.'
                : 'Your site is live and accessible to the public.'}
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${
              !isPublished
                ? 'bg-gray-400'
                : hasUnpublishedChanges
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
          >
            {!isPublished ? 'Draft' : hasUnpublishedChanges ? '⚠ Changes' : '✓ Live'}
          </div>
        </div>

        {/* Branch info */}
        {activeBranch && (
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
            <p className="text-xs font-semibold text-indigo-700 mb-0.5">Active branch</p>
            <p className="text-sm font-medium text-indigo-900">{activeBranch.name}</p>
            <p className="text-xs text-indigo-600 mt-0.5">
              https://{activeBranch.subdomain}.shawi.app
            </p>
          </div>
        )}

        {/* Subdomain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('publish.subdomain')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={publishing.customSubdomain}
              onChange={(e) => handleSubdomainChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="mycompany"
            />
            <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600">
              {t('publish.subdomainFormat')}
            </span>
          </div>
          <p className="text-sm text-green-600 mt-2">
            https://{publishing.customSubdomain}.shawi.app
          </p>
        </div>

        {/* Custom Domain */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            {t('publish.customDomain')}
          </h3>

          <FormInput
            label={t('publish.customDomain')}
            value={publishing.customDomain || ''}
            onChange={(value) => updatePublishing({ customDomain: value || undefined })}
            type="url"
            placeholder="example.com"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              {t('publish.dnsSetup')}
            </h4>
            <p className="text-sm text-blue-800 mb-3">
              {t('publish.dnsInstructions')}
            </p>
            <div className="bg-white p-3 rounded font-mono text-xs text-gray-700">
              <div>Type: CNAME</div>
              <div>Name: www</div>
              <div>Value: {publishing.customSubdomain}.shawi.app</div>
            </div>
          </div>
        </div>

        {/* Publish / Update Button */}
        <div className="flex flex-col gap-2 pt-6 border-t">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
              !isPublished
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : hasUnpublishedChanges
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPublishing
              ? 'Publishing…'
              : !isPublished
              ? t('publish.publishButton')
              : hasUnpublishedChanges
              ? 'Update Site'
              : 'Republish'}
          </button>
          {publishFailed && (
            <p className="text-xs text-red-600 text-center">Publish failed. Please try again.</p>
          )}
        </div>

        {/* Export/Import */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Configuration</h3>

          <div className="flex gap-3">
            <button
              onClick={handleExportConfig}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors"
            >
              {t('publish.exportConfig')}
            </button>
            <label className="flex-1">
              <input
                type="file"
                accept=".json"
                onChange={handleImportConfig}
                className="hidden"
              />
              <button className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors cursor-pointer">
                {t('common.import')} Config
              </button>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Download your site configuration as JSON for backup or sharing.
          </p>
        </div>
      </div>

      <a ref={downloadRef} style={{ display: 'none' }} />
    </Section>
  );
};
