import React from 'react';
import { HandPalmIcon, SealCheckIcon, SparkleIcon } from '@phosphor-icons/react';
import { TemplateText } from '../i18n';

interface WhyUsSectionProps {
  text: TemplateText['whyUs'];
}

const ITEMS = [
  { Icon: HandPalmIcon, titleKey: 'item1Title', descKey: 'item1Desc' },
  { Icon: SealCheckIcon, titleKey: 'item2Title', descKey: 'item2Desc' },
  { Icon: SparkleIcon,   titleKey: 'item3Title', descKey: 'item3Desc' },
] as const;

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ text }) => (
  <section className="px-6 py-[72px] bg-white border-t border-[var(--outline-variant)]">
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="why-us-grid">
        {ITEMS.map(({ Icon, titleKey, descKey }) => (
          <div key={titleKey} className="flex flex-col gap-4">
            <Icon size={28} weight="light" className="text-[var(--on-surface)]" />
            <div className="flex flex-col gap-2">
              <p className="font-display font-bold text-base leading-6 text-[var(--on-surface)] mt-0 mb-0">
                {text[titleKey]}
              </p>
              <p className="text-[var(--on-surface-variant)] text-sm font-normal leading-6 mt-0 mb-0">
                {text[descKey]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
