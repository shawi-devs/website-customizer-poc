import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadSimpleIcon, PencilSimpleIcon, FilePdfIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { useAuthInfo } from '@propelauth/react';
import { useSiteConfigStore } from '../../store/useSiteConfigStore';
import { Section } from '../common/index';
import { PageContent } from '../../types';
import { uploadPdf, PdfUploadType } from '../../lib/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// ---------------------------------------------------------------------------
// Mode toggle — Upload / Type
// ---------------------------------------------------------------------------
function ModeToggle({
  value,
  onChange,
}: {
  value: 'upload' | 'typed';
  onChange: (v: 'upload' | 'typed') => void;
}) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-gray-100 rounded-lg w-fit">
      {(['upload', 'typed'] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            value === mode
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {mode === 'upload' ? <UploadSimpleIcon size={13} /> : <PencilSimpleIcon size={13} />}
          {mode === 'upload' ? 'Upload PDF' : 'Write content'}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PDF upload zone
// ---------------------------------------------------------------------------
function PdfUpload({
  fileUrl,
  uploading,
  error,
  onFileSelected,
}: {
  fileUrl?: string;
  uploading: boolean;
  error: string | null;
  onFileSelected: (file: File) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    e.target.value = '';
  };

  return (
    <div>
      {fileUrl ? (
        <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
          <FilePdfIcon size={20} className="text-green-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-800">
              {uploading ? 'Uploading…' : 'PDF uploaded'}
            </p>
            <p className="text-xs text-green-600 mt-0.5 truncate">Stored on CDN</p>
          </div>
          {!uploading && (
            <label className="cursor-pointer text-xs font-medium text-green-700 hover:text-green-900 underline underline-offset-2">
              Replace
              <input type="file" accept="application/pdf" onChange={handleChange} className="hidden" />
            </label>
          )}
        </div>
      ) : (
        <label className={`flex flex-col items-center gap-2 p-6 border-2 border-dashed rounded-lg transition-colors ${uploading ? 'border-indigo-300 bg-indigo-50 cursor-wait' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'}`}>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <FilePdfIcon size={20} className="text-gray-400" />
          </div>
          <div className="text-center">
            {uploading ? (
              <p className="text-sm font-medium text-indigo-600">Uploading…</p>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">Click to upload PDF</p>
                <p className="text-xs text-gray-400 mt-0.5">PDF documents only</p>
              </>
            )}
          </div>
          {!uploading && <input type="file" accept="application/pdf" onChange={handleChange} className="hidden" />}
        </label>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single page editor card
// ---------------------------------------------------------------------------
interface PageEditorProps {
  title: string;
  description: string;
  page: PageContent;
  pdfType: PdfUploadType;
  onChange: (updated: PageContent) => void;
}

function PageEditor({ title, description, page, pdfType, onChange }: PageEditorProps) {
  const [mode, setMode] = useState<'upload' | 'typed'>(page.source);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { accessToken } = useAuthInfo();

  const handleModeChange = (v: 'upload' | 'typed') => {
    setMode(v);
    onChange({ ...page, source: v });
  };

  const handlePdfUpload = async (file: File) => {
    if (!accessToken) { setUploadError('Not authenticated'); return; }
    setUploading(true);
    setUploadError(null);
    try {
      const { url } = await uploadPdf(file, accessToken, pdfType);
      onChange({ ...page, fileUrl: url, source: 'upload' });
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Section title={title} description={description}>
      <div className="space-y-4">
        <ModeToggle value={mode} onChange={handleModeChange} />

        {mode === 'upload' ? (
          <PdfUpload
            fileUrl={page.fileUrl}
            uploading={uploading}
            error={uploadError}
            onFileSelected={handlePdfUpload}
          />
        ) : (
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <ReactQuill
              value={page.content}
              onChange={(value) => onChange({ ...page, content: value })}
              theme="snow"
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  [{ header: [1, 2, 3, false] }],
                  [{ list: 'bullet' }, { list: 'ordered' }],
                ],
              }}
            />
          </div>
        )}

        {/* Public URL hint */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <CheckCircleIcon size={13} className="text-gray-300" />
          <span>
            Available at&nbsp;
            <span className="font-mono text-gray-500">
              /{title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--+/g, '-')}
            </span>
          </span>
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// PagesSection
// ---------------------------------------------------------------------------
export const PagesSection: React.FC = () => {
  const { t } = useTranslation();
  const { config, updatePages } = useSiteConfigStore();
  const { pages } = config;

  return (
    <div className="space-y-4">
      <PageEditor
        title={t('pages.privacyPolicy')}
        description="Linked in the site footer"
        page={pages.privacyPolicy}
        pdfType="privacy"
        onChange={(updated) => updatePages({ privacyPolicy: updated })}
      />
      <PageEditor
        title={t('pages.termsConditions')}
        description="Linked in the site footer"
        page={pages.termsConditions}
        pdfType="terms"
        onChange={(updated) => updatePages({ termsConditions: updated })}
      />
    </div>
  );
};
