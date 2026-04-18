import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon } from '@phosphor-icons/react';
import { useSiteConfigStore } from '../../store/useSiteConfigStore';
import { Section } from '../common/index';
import { Language } from '../../types';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English',    flag: '🇺🇸' },
  { code: 'es', label: 'Español',    flag: '🇲🇽' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
];

export const SettingsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { config, updateSettings } = useSiteConfigStore();
  const { settings } = config;

  const setPrimary = (lang: Language) => {
    i18n.changeLanguage(lang);
    // Ensure it's in the enabled list too
    const languages = settings.languages.includes(lang)
      ? settings.languages
      : [...settings.languages, lang];
    updateSettings({ primaryLanguage: lang, languages });
  };

  const toggleEnabled = (lang: Language) => {
    // Cannot remove the primary language
    if (lang === settings.primaryLanguage) return;
    const languages = settings.languages.includes(lang)
      ? settings.languages.filter((l) => l !== lang)
      : [...settings.languages, lang];
    if (languages.length === 0) return;
    updateSettings({ languages });
  };

  return (
    <div className="space-y-4">

      {/* ── Primary language ── */}
      <Section
        title={t('settings.language')}
        description="Default language shown to visitors"
      >
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang) => {
            const isPrimary = settings.primaryLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setPrimary(lang.code)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm transition-all ${
                  isPrimary
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.label}</span>
                {isPrimary && <CheckIcon size={14} weight="bold" className="text-indigo-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      </Section>

      {/* ── Available languages ── */}
      <Section
        title={t('settings.selectLanguages')}
        description="Languages available via the footer selector"
      >
        <div className="space-y-1">
          {LANGUAGES.map((lang) => {
            const isEnabled = settings.languages.includes(lang.code);
            const isPrimary = settings.primaryLanguage === lang.code;

            return (
              <div
                key={lang.code}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                  isEnabled ? 'border-gray-200 bg-white' : 'border-transparent bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="text-sm text-gray-800">{lang.label}</span>
                  {isPrimary && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                      Primary
                    </span>
                  )}
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={isEnabled}
                  disabled={isPrimary}
                  onClick={() => toggleEnabled(lang.code)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed ${
                    isEnabled ? 'bg-indigo-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                      isEnabled ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          The primary language cannot be disabled.
        </p>
      </Section>

    </div>
  );
};
