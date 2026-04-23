import React, { useRef, useState, useEffect } from 'react';
import { useAuthInfo } from '@propelauth/react';
import { uploadImage, ImageUploadType } from '../../lib/api';

// ---------------------------------------------------------------------------
// FormInput
// ---------------------------------------------------------------------------
interface FormInputProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'textarea' | 'url' | 'number';
  placeholder?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  description,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-0.5">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
    <div className={description ? '' : 'mt-2'}>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none ${
            error ? 'border-red-400' : 'border-gray-300'
          }`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow ${
            error ? 'border-red-400' : 'border-gray-300'
          }`}
        />
      )}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// ---------------------------------------------------------------------------
// ColorPicker — swatch + label + hex input in a single row
// ---------------------------------------------------------------------------
interface ColorPickerProps {
  label: string;
  description?: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, description, value, onChange }) => {
  const [hexInput, setHexInput] = React.useState(value);
  const colorInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => { setHexInput(value); }, [value]);

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    if (/^#[0-9A-F]{6}$/i.test(hex)) onChange(hex);
  };

  return (
    <div className="flex items-center gap-3 py-3">
      {/* Hidden native color input */}
      <input
        ref={colorInputRef}
        type="color"
        value={value}
        onChange={(e) => { onChange(e.target.value); setHexInput(e.target.value); }}
        className="sr-only"
      />
      {/* Swatch button */}
      <button
        type="button"
        onClick={() => colorInputRef.current?.click()}
        className="w-9 h-9 rounded-lg border border-black/10 shadow-sm flex-shrink-0 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        style={{ backgroundColor: value }}
        aria-label={`Pick ${label} color`}
      />
      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      {/* Hex input */}
      <input
        type="text"
        value={hexInput}
        onChange={(e) => handleHexChange(e.target.value)}
        placeholder="#000000"
        maxLength={7}
        className="w-24 px-2 py-1.5 text-xs font-mono border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-center"
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// ButtonShapeSelector — visual card grid replacing RadioGroup for shapes
// ---------------------------------------------------------------------------
interface ButtonShapeSelectorProps {
  label: string;
  selected: string;
  onChange: (value: string) => void;
}

const SHAPES = [
  { value: 'pill',    label: 'Pill',    radius: '9999px' },
  { value: 'rounded', label: 'Rounded', radius: '8px'    },
  { value: 'square',  label: 'Square',  radius: '3px'    },
];

export const ButtonShapeSelector: React.FC<ButtonShapeSelectorProps> = ({ label, selected, onChange }) => (
  <div>
    <p className="text-sm font-medium text-gray-800 mb-3">{label}</p>
    <div className="grid grid-cols-3 gap-2">
      {SHAPES.map((shape) => {
        const active = selected === shape.value;
        return (
          <button
            key={shape.value}
            type="button"
            onClick={() => onChange(shape.value)}
            className={`flex flex-col items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-xs font-medium ${
              active
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div
              className={`w-full h-7 flex items-center justify-center text-xs font-bold transition-colors ${
                active ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
              style={{ borderRadius: shape.radius }}
            >
              Aa
            </div>
            {shape.label}
          </button>
        );
      })}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// RadioGroup — kept for other sections (e.g. PagesSection)
// ---------------------------------------------------------------------------
interface RadioGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, options, selected, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-3">{label}</label>
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// ImageUpload — drop zone with preview & replace/remove actions
// ---------------------------------------------------------------------------
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

interface ImageUploadProps {
  label: string;
  description?: string;
  value: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  hint?: string;
  uploadType?: ImageUploadType;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  description,
  value,
  onUpload,
  onRemove,
  hint,
  uploadType,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const { accessToken } = useAuthInfo();

  const handleFile = async (file: File) => {
    if (!accessToken) { setUploadError('Not authenticated'); return; }
    setUploading(true);
    setUploadError(null);
    try {
      const { url } = await uploadImage(file, accessToken, uploadType);
      onUpload(url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-0.5">{label}</label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <div className={description ? '' : 'mt-2'}>
        {value ? (
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50">
            <img
              src={value}
              alt="preview"
              className="h-12 w-auto max-w-[80px] rounded-lg object-contain flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-600">Uploaded</p>
              {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="text-xs px-3 py-1.5 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors font-medium disabled:opacity-50"
              >
                {uploading ? 'Uploading…' : 'Replace'}
              </button>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  disabled={uploading}
                  className="text-xs px-3 py-1.5 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              uploading
                ? 'border-indigo-300 bg-indigo-50 cursor-wait'
                : dragging
                ? 'border-indigo-400 bg-indigo-50 cursor-pointer'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <UploadIcon />
              </div>
              {uploading ? (
                <p className="text-sm font-medium text-indigo-600">Uploading…</p>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-700">Click to upload</p>
                  <p className="text-xs text-gray-400">or drag and drop</p>
                </>
              )}
              {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
            </div>
          </div>
        )}
        {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
        className="hidden"
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Section — card wrapper with header title + optional description
// ---------------------------------------------------------------------------
interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, description, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="px-5 py-4 border-b border-gray-100">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

// ---------------------------------------------------------------------------
// FontPicker — searchable Google Fonts selector with live preview
// ---------------------------------------------------------------------------

export const HEADING_FONTS = [
  'Inter', 'Bricolage Grotesque', 'Playfair Display', 'Fraunces', 'DM Serif Display',
  'Cormorant Garamond', 'Lora', 'Merriweather', 'Syne', 'Space Grotesk',
  'Outfit', 'Plus Jakarta Sans', 'Raleway', 'Montserrat', 'Oswald', 'Bebas Neue',
];

export const BODY_FONTS = [
  'Inter', 'DM Sans', 'Plus Jakarta Sans', 'Nunito', 'Lato',
  'Open Sans', 'Poppins', 'Rubik', 'Work Sans', 'IBM Plex Sans',
  'Source Sans 3', 'Noto Sans', 'Manrope', 'Figtree',
];

/** Injects a Google Fonts stylesheet for all preview fonts (called once per list). */
function useGoogleFontsPreview(fonts: string[]) {
  useEffect(() => {
    const id = `gf-preview-${fonts[0]}`;
    if (document.getElementById(id)) return;
    const families = fonts.map((f) => `family=${f.replace(/ /g, '+')}:wght@400;700`).join('&');
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    document.head.appendChild(link);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

interface FontPickerProps {
  label: string;
  description?: string;
  value: string;
  onChange: (font: string) => void;
  fonts: string[];
}

export const FontPicker: React.FC<FontPickerProps> = ({ label, description, value, onChange, fonts }) => {
  useGoogleFontsPreview(fonts);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = fonts.filter((f) => f.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={containerRef} className="relative">
      <p className="text-sm font-medium text-gray-800 mb-0.5">{label}</p>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <div className={description ? '' : 'mt-2'}>
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => { setOpen((v) => !v); setSearch(''); }}
          className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          <span className="text-sm text-gray-800" style={{ fontFamily: `'${value}', sans-serif` }}>
            {value}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fonts…"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Font list */}
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-400 text-center">No fonts found</li>
              )}
              {filtered.map((font) => {
                const active = font === value;
                return (
                  <li key={font}>
                    <button
                      type="button"
                      onClick={() => { onChange(font); setOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${active ? 'bg-indigo-50' : ''}`}
                    >
                      <span
                        className="text-sm"
                        style={{ fontFamily: `'${font}', sans-serif`, color: active ? '#4f46e5' : '#111827' }}
                      >
                        {font}
                      </span>
                      {active && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
