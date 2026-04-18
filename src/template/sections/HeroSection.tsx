import React from 'react';
import { ArrowRightIcon, GoogleLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react';
import { TemplateText } from '../i18n';

const StarsRating: React.FC = () => (
  <svg width="104" height="20" viewBox="0 0 104 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.99984 14.8083L15.1498 17.9166L13.7832 12.0583L18.3332 8.11665L12.3415 7.60831L9.99984 2.08331L7.65817 7.60831L1.6665 8.11665L6.2165 12.0583L4.84984 17.9166L9.99984 14.8083Z" fill="currentColor"/>
    <path d="M30.9998 14.8083L36.1498 17.9166L34.7832 12.0583L39.3332 8.11665L33.3415 7.60831L30.9998 2.08331L28.6582 7.60831L22.6665 8.11665L27.2165 12.0583L25.8498 17.9166L30.9998 14.8083Z" fill="currentColor"/>
    <path d="M51.9998 14.8083L57.1498 17.9166L55.7832 12.0583L60.3332 8.11665L54.3415 7.60831L51.9998 2.08331L49.6582 7.60831L43.6665 8.11665L48.2165 12.0583L46.8498 17.9166L51.9998 14.8083Z" fill="currentColor"/>
    <path d="M72.9998 14.8083L78.1498 17.9166L76.7832 12.0583L81.3332 8.11665L75.3415 7.60831L72.9998 2.08331L70.6582 7.60831L64.6665 8.11665L69.2165 12.0583L67.8498 17.9166L72.9998 14.8083Z" fill="currentColor"/>
    <path d="M102.333 8.11665L96.3415 7.59998L93.9998 2.08331L91.6582 7.60831L85.6665 8.11665L90.2165 12.0583L88.8498 17.9166L93.9998 14.8083L99.1498 17.9166L97.7915 12.0583L102.333 8.11665ZM93.9998 13.25L90.8665 15.1416L91.6998 11.575L88.9332 9.17498L92.5832 8.85831L93.9998 5.49998L95.4248 8.86665L99.0748 9.18331L96.3082 11.5833L97.1415 15.15L93.9998 13.25Z" fill="currentColor"/>
    <path d="M93.9998 14.8083V13.5V12.5V9.5V2.08331L91.6582 7.60831L85.6665 8.11665L90.2165 12.0583L88.8498 17.9166L93.9998 14.8083Z" fill="currentColor"/>
  </svg>
);

interface HeroSectionProps {
  heroImage: { url: string; alt: string };
  ctaLink: string;
  text: TemplateText['hero'];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, ctaLink, text }) => (
  <div className="hero-section flex flex-col justify-center items-center py-[124px] px-6 overflow-hidden">
    <div className="container horizontal flex flex-row items-center justify-center gap-12 w-full max-w-[1280px] mx-auto">

      <div className="hero-wrapper vertical width-80 flex flex-col gap-12 justify-between items-start w-full min-w-0">

        <div className="top-content flex flex-col gap-4 items-start">
          <h1 className="display-large header font-display font-black text-[56px] leading-[64px] tracking-display text-[var(--on-surface)] mt-0 mb-0">
            {text.headline}{' '}
            <span className="text-site-highlight">{text.city}</span>
          </h1>

          <div className="testimonial-header flex items-center gap-2">
            <div className="social-icons-stars flex items-center gap-2">
              <GoogleLogoIcon size={24} weight="bold" />
              <WhatsappLogoIcon size={24} color="#25D366" weight="fill" />
              <div className="stars-container w-embed block" style={{ color: 'var(--primary)' }}>
                <StarsRating />
              </div>
            </div>
            <div className="text-[var(--on-surface-variant)] text-sm font-medium leading-5">
              {text.reviews}
            </div>
          </div>
        </div>

        <div className="bottom-content vertical flex flex-col gap-4 items-start justify-between w-full">
          <div className="button-container flex gap-6">
            <a
              href={ctaLink}
              className="details-button w-inline-block flex items-center gap-4 border border-[var(--outline-variant)] bg-[var(--background-primary)] rounded-[12px_48px_48px_12px] px-2 pl-4 transition-all shadow-[0_6px_16px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_8px_rgba(0,0,0,0.08)] no-underline"
            >
              <div className="py-2">
                <div className="text-[var(--on-surface-variant)] text-xs font-normal">{text.faster}</div>
                <div className="text-[var(--on-surface)] text-base font-bold tracking-[0.3px]">{text.nextSlot}</div>
              </div>
              <div className="w-px h-[60px] bg-[var(--outline-variant)] flex self-stretch" />
              <div className="py-2">
                <div className="text-[var(--on-surface-variant)] text-xs font-normal">{text.later}</div>
                <div className="text-[var(--on-surface)] text-base font-bold tracking-[0.3px]">{text.laterSlot}</div>
              </div>
              <div className="primary-button icon flex items-center justify-center bg-site-primary p-3.5 rounded-[32px]">
                <div className="button-icon w-embed w-6 h-6">
                  <ArrowRightIcon size={24} color="white" weight="bold" />
                </div>
              </div>
            </a>
          </div>
          <a href={ctaLink} className="text-[var(--primary)] font-medium underline no-underline hover:underline">
            {text.allSchedules}
          </a>
        </div>
      </div>

      <img src={heroImage.url} alt={heroImage.alt} loading="lazy" className="hero-img w-[40%] h-auto" />
    </div>
  </div>
);
