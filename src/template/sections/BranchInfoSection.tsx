import React from 'react';
import { CheckCircleIcon } from '@phosphor-icons/react';
import { TemplateText } from '../i18n';

interface BranchInfoSectionProps {
  imageUrl: string;
  mapLink: string;
  ctaLink: string;
  accentColor: string;
  textColor: string;
  borderRadius: string;
  text: TemplateText['branchInfo'];
}

const FEATURES = ['feature1', 'feature2', 'feature3', 'feature4'] as const;

export const BranchInfoSection: React.FC<BranchInfoSectionProps> = ({
  imageUrl,
  mapLink,
  ctaLink,
  accentColor,
  textColor,
  borderRadius,
  text,
}) => (
  <section className="branch-info-section" style={{ backgroundColor: accentColor }}>
    <div className="flex w-full max-w-[1280px] mx-auto px-6 py-[96px] branch-info-layout">
      {/* ── Image: flush left, full height, 1/3 width ── */}
      <div className="branch-info-image">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Branch"
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="1" opacity="0.4">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* ── Text content ── */}
      <div className="branch-info-text">
        <h2
          className="font-display font-extrabold text-[36px] leading-[44px] mt-0 mb-6"
          style={{ color: textColor }}
        >
          {text.heading}
        </h2>

        <div className="flex flex-col gap-3 mb-8">
          {FEATURES.map((key) => (
            <div key={key} className="flex items-center gap-2.5">
              <CheckCircleIcon size={24} weight="light" style={{ color: textColor, flexShrink: 0 }} />
              <span className="text-lg font-bold leading-5" style={{ color: textColor }}>
                {text[key]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {mapLink && (
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold no-underline transition-opacity hover:opacity-80"
              style={{ backgroundColor: textColor, color: accentColor, borderRadius }}
            >
              {text.cta}
            </a>
          )}
          <a
            href={ctaLink}
            className="inline-flex items-center px-6 py-2.5 text-sm font-semibold no-underline transition-opacity hover:opacity-80"
            style={{ border: `2px solid ${textColor}`, color: textColor, borderRadius, backgroundColor: 'transparent' }}
          >
            {text.ctaSecondary}
          </a>
        </div>
      </div>

    </div>

  </section>
);
