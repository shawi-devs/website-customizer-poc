import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  TrashIcon,
  PencilSimpleIcon,
  ArrowSquareOutIcon,
  GlobeIcon,
  CaretLeftIcon,
  CaretRightIcon,
  WarningCircleIcon,
  SpinnerGapIcon,
} from '@phosphor-icons/react';
import { useBranchStore } from '../store/useBranchStore';
import { useBranches, ApiBranch } from '../hooks/useBranches';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function validateSubdomain(value: string, existing: string[]): string | null {
  if (!value) return 'Subdomain is required';
  if (!/^[a-z0-9-]+$/.test(value)) return 'Only lowercase letters, numbers, and hyphens';
  if (value.startsWith('-') || value.endsWith('-')) return 'Cannot start or end with a hyphen';
  if (existing.includes(value)) return 'Subdomain already in use';
  return null;
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------
function StatusBadge({ isPublished }: { isPublished: boolean }) {
  if (!isPublished) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
        Unpublished
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
      Live
    </span>
  );
}

// ---------------------------------------------------------------------------
// New Branch Form
// ---------------------------------------------------------------------------
interface NewBranchFormProps {
  existingSubdomains: string[];
  onCancel: () => void;
  onCreate: (name: string, subdomain: string) => void;
}

function NewBranchForm({ existingSubdomains, onCancel, onCreate }: NewBranchFormProps) {
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [touched, setTouched] = useState(false);

  const error = touched ? validateSubdomain(subdomain, existingSubdomains) : null;

  const handleNameChange = (v: string) => {
    setName(v);
    const slug = v
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSubdomain(slug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!name.trim()) return;
    const err = validateSubdomain(subdomain, existingSubdomains);
    if (err) return;
    onCreate(name.trim(), subdomain);
  };

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-4">
      <h3 className="text-sm font-semibold text-indigo-900 mb-4">New Branch</h3>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-xs font-medium text-gray-700 mb-1">Branch name</label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Miami Store"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
        <div className="flex-1 min-w-48">
          <label className="block text-xs font-medium text-gray-700 mb-1">Subdomain</label>
          <div className="flex items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 overflow-hidden bg-white">
            <input
              type="text"
              value={subdomain}
              onChange={(e) => { setTouched(true); setSubdomain(e.target.value.toLowerCase()); }}
              placeholder="miami-store"
              className={`flex-1 px-3 py-2 text-sm focus:outline-none bg-white ${error ? 'text-red-600' : ''}`}
            />
            <span className="px-3 py-2 text-sm text-gray-400 bg-gray-50 border-l border-gray-300 whitespace-nowrap">
              .shawi.app
            </span>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {!error && subdomain && (
            <p className="text-xs text-indigo-500 mt-1 flex items-center gap-1">
              <GlobeIcon size={12} />
              https://{subdomain}.shawi.app
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Branch Row
// ---------------------------------------------------------------------------
interface BranchRowProps {
  branch: ApiBranch;
  canDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function BranchRow({ branch, canDelete, onEdit, onDelete }: BranchRowProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const previewUrl = branch.subdomain ? `/preview/${branch.subdomain}` : null;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Name + URL */}
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-gray-900">{branch.name}</p>
        {previewUrl ? (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-500 hover:underline flex items-center gap-0.5 mt-0.5 w-fit"
          >
            <GlobeIcon size={11} />
            {branch.subdomain}.shawi.app
          </a>
        ) : (
          <span className="text-xs text-gray-400 mt-0.5 block">No subdomain yet</span>
        )}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge isPublished={branch.is_published} />
      </td>

      {/* Updated */}
      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
        {formatDate(branch.updated_at)}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-red-600 font-medium">Delete?</span>
            <button
              onClick={onDelete}
              className="px-2 py-1 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-2 py-1 text-xs font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              <PencilSimpleIcon size={13} />
              Edit
            </button>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors"
                title="Open preview"
              >
                <ArrowSquareOutIcon size={13} />
              </a>
            )}
            {canDelete && (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 rounded-md transition-colors"
                title="Delete branch"
              >
                <TrashIcon size={13} />
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// BranchesView
// ---------------------------------------------------------------------------
export const BranchesView: React.FC = () => {
  const navigate = useNavigate();
  const { createBranch, deleteBranch, switchBranch } = useBranchStore();
  const { data: branches = [], isLoading, error, refetch } = useBranches();
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const existingSubdomains = branches.flatMap((b) => (b.subdomain ? [b.subdomain] : []));
  const totalPages = Math.max(1, Math.ceil(branches.length / pageSize));
  const paginated = branches.slice((page - 1) * pageSize, page * pageSize);

  const handleCreate = (name: string, subdomain: string) => {
    createBranch(name, subdomain);
    setShowForm(false);
    navigate('/editor');
  };

  const handleEdit = (branchId: string) => {
    switchBranch(branchId);
    navigate('/editor');
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/src/assets/shawi-logo.png" alt="Shawi" className="h-10 object-contain" />
          <div className="h-6 w-px bg-gray-200" />
          <h1 className="text-lg font-semibold text-gray-900">Websites by Partner</h1>
        </div>
        <button
          onClick={() => { setShowForm(true); setPage(1); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <PlusIcon size={16} />
          New Branch
        </button>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-8 py-8">
        {/* New Branch form */}
        {showForm && (
          <NewBranchForm
            existingSubdomains={existingSubdomains}
            onCancel={() => setShowForm(false)}
            onCreate={handleCreate}
          />
        )}

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <WarningCircleIcon size={16} className="shrink-0" />
            <span>Failed to load branches: {(error as Error).message}</span>
            <button
              onClick={() => refetch()}
              className="ml-auto text-xs font-semibold underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center">
                    <SpinnerGapIcon size={20} className="animate-spin text-indigo-500 mx-auto" />
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-400">
                    No branches yet. Create one above.
                  </td>
                </tr>
              ) : (
                paginated.map((branch) => (
                  <BranchRow
                    key={branch.id}
                    branch={branch}
                    canDelete={branches.length > 1}
                    onEdit={() => handleEdit(branch.id)}
                    onDelete={() => deleteBranch(branch.id)}
                  />
                ))
              )}
            </tbody>
          </table>

          {/* Footer: page size + pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Rows per page:</span>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  onClick={() => handlePageSizeChange(size)}
                  className={`px-2 py-0.5 rounded font-medium transition-colors ${
                    pageSize === size
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>
                {branches.length === 0
                  ? '0 branches'
                  : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, branches.length)} of ${branches.length}`}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <CaretLeftIcon size={14} />
                </button>
                <span className="px-1 font-medium text-gray-700">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <CaretRightIcon size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
