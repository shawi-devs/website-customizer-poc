import React, { useState, useRef, useEffect } from 'react';
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  YoutubeLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
  TranslateIcon,
  CaretDownIcon,
} from '@phosphor-icons/react';
import { Language, SiteConfig } from '../../types';
import { TemplateText, LANGUAGE_NAMES } from '../i18n';

interface SiteFooterProps {
  logo: { url: string; alt: string };
  companyName: string;
  year: number;
  ctaLink: string;
  social: SiteConfig['social'];
  languages: Language[];
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  text: TemplateText['footer'];
}

const FooterLink: React.FC<{ href?: string; children: React.ReactNode }> = ({ href = '#', children }) => (
  <a href={href} className="text-[var(--on-surface-variant)] text-lg font-normal leading-6 no-underline hover:text-[var(--on-surface)] transition-colors">
    {children}
  </a>
);

const SOCIAL_ICONS = [
  { key: 'facebook',  Icon: FacebookLogoIcon  },
  { key: 'instagram', Icon: InstagramLogoIcon  },
  { key: 'linkedin',  Icon: LinkedinLogoIcon   },
  { key: 'youtube',   Icon: YoutubeLogoIcon    },
  { key: 'tiktok',    Icon: TiktokLogoIcon     },
  { key: 'twitter',   Icon: XLogoIcon          },
] as const;

export const SiteFooter: React.FC<SiteFooterProps> = ({
  logo, companyName, year, ctaLink, social, languages, currentLang, onLangChange, text,
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeSocial = SOCIAL_ICONS.filter(({ key }) => !!social[key]);
  const multiLang = languages.length > 1;

  return (
    <section className="footer relative z-[6] bg-white border-b border-[#e4ebf3] flex items-center -mt-0.5 py-[120px] px-[30px]">
      <div className="container-2 w-full max-w-[1140px] mx-auto">
        <div className="footer-wrapper flex flex-col items-center justify-center max-w-full mx-auto">

          {/* ── Link columns ── */}
          <div className="footer-content flex gap-[70px] w-full mb-12">
            <div className="footer-block flex flex-row gap-6 w-full items-start justify-start">

              <div className="links-block flex flex-col gap-4 w-full items-start">
                <h6 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.explore}</h6>
                <FooterLink>{text.exploreLinks[0]}</FooterLink>
                <FooterLink href={ctaLink}>{text.exploreLinks[1]}</FooterLink>
                <FooterLink>{text.exploreLinks[2]}</FooterLink>
                <FooterLink>{text.exploreLinks[3]}</FooterLink>
              </div>

              <div className="links-block flex flex-col gap-4 w-full items-start">
                <h6 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.solutions}</h6>
                <FooterLink>{text.solutionLinks[0]}</FooterLink>
                <FooterLink>{text.solutionLinks[1]}</FooterLink>
                <FooterLink>{text.solutionLinks[2]}</FooterLink>
                <FooterLink>{text.solutionLinks[3]}</FooterLink>
              </div>

              <div className="links-block flex flex-col gap-4 w-full items-start">
                <h6 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.about}</h6>
                <FooterLink>{text.contact}</FooterLink>
              </div>

            </div>
          </div>

          {/* ── Bottom bar: logo | social | language ── */}
          <div className="logo-social-block flex items-center justify-between w-full gap-6">

            {/* Logo */}
            <a href="#" className="no-underline w-inline-block flex-shrink-0">
              <img src={logo.url} alt={logo.alt} loading="lazy" className="h-9 mb-0" />
            </a>

            {/* Social icons */}
            {activeSocial.length > 0 && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-[var(--on-surface-variant)] font-medium">{text.followUs}</span>
                <div className="flex items-center gap-4">
                  {activeSocial.map(({ key, Icon }) => (
                    <a
                      key={key}
                      href={social[key]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors no-underline"
                      aria-label={key}
                    >
                      <Icon size={22} weight="regular" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Language selector */}
            {multiLang ? (
              <div ref={langRef} className="relative flex-shrink-0">
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="flex items-center gap-2 px-4 py-2 border border-[var(--outline-variant)] rounded-full text-sm font-medium text-[var(--on-surface)] hover:bg-gray-50 transition-colors"
                >
                  <TranslateIcon size={16} />
                  <span>{LANGUAGE_NAMES[currentLang]}</span>
                  <CaretDownIcon size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                {langOpen && (
                  <div className="absolute bottom-full mb-2 right-0 bg-white border border-[var(--outline-variant)] rounded-xl shadow-lg overflow-hidden min-w-[140px]">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { onLangChange(lang); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${lang === currentLang ? 'font-semibold text-[var(--primary)]' : 'text-[var(--on-surface)]'}`}
                      >
                        {LANGUAGE_NAMES[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Spacer to keep logo left-aligned when no language selector */
              <div className="flex-shrink-0" />
            )}

          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-[var(--outline-variant)] w-full mb-6 mt-6" />

          {/* ── Copyright row ── */}
          <div className="flex justify-between items-center w-full mt-4">
            <p className="text-[var(--on-surface-variant)] font-medium text-sm mb-0">
              © {year} {companyName}
            </p>
            <div className="footer-links-container flex justify-end gap-6">
              <a href="#" className="text-[var(--on-surface-variant)] font-medium text-sm no-underline hover:underline">{text.privacy}</a>
              <a href="#" className="text-[var(--on-surface-variant)] font-medium text-sm no-underline hover:underline">{text.terms}</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
