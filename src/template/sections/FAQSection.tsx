import React, { useState } from 'react';
import { WhatsappLogoIcon, CaretDownIcon } from '@phosphor-icons/react';
import { TemplateText } from '../i18n';
import { SiteConfig } from '../../types';

interface FAQSectionProps {
  ctaLink: string;
  accentColor: string;
  borderRadius: string;
  items: SiteConfig['content']['faqItems'];
  text: TemplateText['faq'];
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ ctaLink, accentColor, borderRadius, items, text }) => {
  const [open, setOpen] = useState<number | null>(null);
  const visible = (items ?? []).filter((item) => item.question.trim());

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  if (visible.length === 0) return null;

  return (
    <section style={{ backgroundColor: hexToRgba(accentColor, 0.1) }}>
      <div className="w-full max-w-[1280px] mx-auto px-6 py-[96px]">
        <div className="faq-layout">

          {/* ── Left: heading + CTA ── */}
          <div className="faq-left">
            <h2 className="font-display font-extrabold text-[40px] leading-[48px] text-[var(--on-surface)] mt-0 mb-8">
              {text.heading}
            </h2>
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2.5 bg-[var(--on-surface)] text-white font-display font-bold text-sm px-6 py-3.5 no-underline hover:opacity-80 transition-opacity"
              style={{ borderRadius }}
            >
              <WhatsappLogoIcon size={20} weight="fill" color="#25D366" />
              {text.cta}
            </a>
          </div>

          {/* ── Right: accordion ── */}
          <div className="faq-right">
            {visible.map((item, i) => (
              <div key={i} className="border-b border-[var(--outline-variant)]">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full bg-transparent flex items-center justify-between gap-4 py-5 text-left focus:outline-none"
                >
                  <span className="font-display font-semibold text-base text-[var(--on-surface)] leading-6">
                    {item.question}
                  </span>
                  <CaretDownIcon
                    size={18}
                    weight="bold"
                    className={`flex-shrink-0 text-[var(--on-surface-variant)] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <p className="text-[var(--on-surface-variant)] text-sm font-normal leading-6 mt-0 mb-5">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
