import React from 'react';
import shawiLogo from '../../assets/shawi-logo.png';
import valueProp1 from '../../assets/site-template/vp-1.png';
import valueProp2 from '../../assets/site-template/vp-2.png';

import {
  CalendarBlankIcon,
  ClockCountdownIcon,
  BellRingingIcon,
  CarSimpleIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react';
import { TemplateText } from '../i18n';

interface HowItWorksSectionProps {
  ctaLink: string;
  highlightColor: string;
  text: TemplateText['featureBlocks'];
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

const FeatureBullet: React.FC<{ icon: React.ReactNode; label: string; highlightColor: string }> = ({ icon, label, highlightColor }) => (
  <div className="flex items-center gap-3">
    <div
      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
      style={{ backgroundColor: hexToRgba(highlightColor, 0.2) }}
    >
      <span style={{ color: highlightColor }}>{icon}</span>
    </div>
    <span className="text-[var(--on-surface)] text-sm font-medium leading-5">{label}</span>
  </div>
);

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ ctaLink, highlightColor, text }) => (
  <section className="px-6 py-[96px] bg-white">
    <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-[96px]">

      {/* ── Block 1: text left, image right ── */}
      <div className="hiw-block">
        <div className="hiw-text">
          <h2 className="font-display font-extrabold text-[36px] leading-[44px] text-[var(--on-surface)] mt-0 mb-3">
            {text.block1Heading}
          </h2>

          <div className="flex items-center gap-1.5 mb-8 text-xs font-medium text-[var(--on-surface-variant)]">
            <span className="text-sm">Powered by</span>
            <img src={shawiLogo} alt="Shawi" className="h-8 object-contain" />
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <FeatureBullet highlightColor={highlightColor} icon={<CalendarBlankIcon size={18} weight="bold" />} label={text.block1Feature1} />
            <FeatureBullet highlightColor={highlightColor} icon={<ClockCountdownIcon size={18} weight="bold" />} label={text.block1Feature2} />
          </div>
          <a
            href={ctaLink}
            className="primary-button small inline-flex items-center gap-2 bg-site-primary text-white font-display font-extrabold text-sm px-6 py-3 no-underline transition-all hover:shadow-md"
            style={{ borderRadius: 'var(--default-radius, 12px)' }}
          >
            {text.block1Cta}
          </a>
        </div>

        <div className="hiw-image">
          <img
            src={valueProp1}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* ── Block 2: image left, text right ── */}
      <div className="hiw-block hiw-block-reverse">
        <div className="hiw-image">
          <img
            src={valueProp2}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="hiw-text">
          <h2 className="font-display font-extrabold text-[36px] leading-[44px] text-[var(--on-surface)] mt-0 mb-8">
            {text.block2Heading}
          </h2>
          <div className="flex flex-col gap-4">
            <FeatureBullet highlightColor={highlightColor} icon={<BellRingingIcon size={18} weight="bold" />} label={text.block2Feature1} />
            <FeatureBullet highlightColor={highlightColor} icon={<CarSimpleIcon size={18} weight="bold" />} label={text.block2Feature2} />
            <FeatureBullet highlightColor={highlightColor} icon={<PencilSimpleIcon size={18} weight="bold" />} label={text.block2Feature3} />
          </div>
        </div>
      </div>

    </div>
  </section>
);
