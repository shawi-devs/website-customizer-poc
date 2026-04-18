import React from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react';
import scheduleAndPrepare from '../../assets/site-template/schedule-and-prepare.avif';
import careIcon from '../../assets/site-template/care.avif';
import laundryIcon from '../../assets/site-template/laundry.avif';
import dryCleanIcon from '../../assets/site-template/dry-clean.avif';
import { TemplateText } from '../i18n';

interface ValuePropsProps {
  ctaLink: string;
  primaryContrast: string;
  secondaryContrast: string;
  text: { howItWorks: TemplateText['howItWorks']; pricing: TemplateText['pricing'] };
}

export const ValueProps: React.FC<ValuePropsProps> = ({ ctaLink, primaryContrast, secondaryContrast, text }) => (
  <section className="value-props flex px-6">
    <div className="blocks flex flex-col items-center justify-center gap-20 w-full pt-[124px] pb-[124px]">

      {/* ── How it works ── */}
      <div className="container-background flex flex-col gap-12 w-full max-w-[1280px] bg-site-primary rounded-xl p-16">

        <div className="service-header flex gap-10 flex-col items-start w-full">
          <div className="text-block flex flex-col gap-6 items-start">
            <h2 className="display-medium inverted width-70 font-display font-extrabold text-[45px] leading-[52px] tracking-display-md w-[70%] mt-0 mb-0" style={{ color: primaryContrast }}>
              {text.howItWorks.heading}
            </h2>
            <div className="button-container flex gap-6">
              <a href="#" className="flex items-center gap-1 font-display font-extrabold text-base leading-6 px-3 py-2 no-underline hover:opacity-70 transition-opacity rounded-[30px]" style={{ color: primaryContrast }}>
                <span>{text.howItWorks.linkText}</span>
                <div className="w-embed">
                  <ArrowRightIcon size={18} color={primaryContrast} />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="cards-container flex items-stretch gap-2 justify-between">
          <div className="card flex flex-col gap-1 bg-white/95 rounded-xl p-6 w-full">
            <div className="heading-content-horizontal flex justify-between items-center">
              <h3 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.howItWorks.step1Title}</h3>
              <img src={scheduleAndPrepare} loading="lazy" alt="" className="w-10 h-10" />
            </div>
            <p className="text-[var(--on-surface-variant)] text-base font-normal leading-6 mt-0 mb-0">{text.howItWorks.step1Desc}</p>
          </div>

          <div className="card flex flex-col gap-1 bg-white/95 rounded-xl p-6 w-full">
            <div className="heading-content-horizontal flex justify-between items-center">
              <h3 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.howItWorks.step2Title}</h3>
              <img src={careIcon} loading="lazy" alt="" className="w-10 h-10" />
            </div>
            <p className="text-[var(--on-surface-variant)] text-base font-normal leading-6 mt-0 mb-0">{text.howItWorks.step2Desc}</p>
          </div>

          <div className="card flex flex-col gap-1 bg-white/95 rounded-xl p-6 w-full">
            <div className="heading-content-horizontal flex justify-between items-center">
              <h3 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.howItWorks.step3Title}</h3>
              <img src={careIcon} loading="lazy" alt="" className="w-10 h-10" />
            </div>
            <p className="text-[var(--on-surface-variant)] text-base font-normal leading-6 mt-0 mb-0">{text.howItWorks.step3Desc}</p>
          </div>
        </div>
      </div>

      {/* ── Services & Pricing ── */}
      <div className="container-green flex gap-16 justify-around items-center max-w-[1280px] bg-site-primary rounded-xl px-20 py-[124px]">

        <div className="cards-container inverted flex flex-col gap-4 w-[80%] px-10">
          <div className="card big flex flex-row items-center gap-4 bg-white/95 rounded-xl p-8 w-full">
            <img src={laundryIcon} loading="lazy" alt="" className="w-20" />
            <div className="flex flex-col gap-1 items-start justify-center w-full">
              <h3 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.pricing.service1Name}</h3>
              <p className="text-[var(--on-surface-variant)] text-base font-normal leading-6 mt-0 mb-0">{text.pricing.service1Price}</p>
            </div>
          </div>

          <div className="card big flex flex-row items-center gap-4 bg-white/95 rounded-xl p-8 w-full">
            <img src={dryCleanIcon} loading="lazy" alt="" className="w-20" />
            <div className="flex flex-col gap-1 items-start justify-center w-full">
              <h3 className="font-display font-extrabold text-base leading-6 tracking-title text-[var(--on-surface)] mt-0 mb-0">{text.pricing.service2Name}</h3>
              <p className="text-[var(--on-surface-variant)] text-base font-normal leading-6 mt-0 mb-0">{text.pricing.service2Price}</p>
            </div>
          </div>
        </div>

        <div className="service-header flex flex-col gap-10 items-start">
          <div className="text-block flex flex-col gap-6 items-start">
            <h2 className="display-medium font-display font-extrabold text-[45px] leading-[52px] tracking-display-md mt-0 mb-0" style={{ color: primaryContrast }}>
              {text.pricing.heading}
            </h2>
            <p className="text-lg font-normal leading-6 mt-0 mb-0" style={{ color: primaryContrast }}>
              {text.pricing.body}
            </p>
            <div className="button-container flex gap-6">
              <a
                href={ctaLink}
                className="secondary-button w-inline-block flex items-center gap-2 bg-site-secondary rounded-[32px] px-8 py-4 text-lg font-extrabold font-display no-underline transition-all hover:shadow-lg"
                style={{ color: secondaryContrast }}
              >
                <span className="font-display font-extrabold text-base leading-6">{text.pricing.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
);
