import React from 'react';
import { TemplateText } from '../i18n';

interface BottomCTAProps {
  ctaLink: string;
  buttonFillColor: string;
  buttonTextColor: string;
  sectionTextColor: string;
  text: TemplateText['bottomCta'];
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ ctaLink, buttonFillColor, buttonTextColor, sectionTextColor, text }) => (
  <section className="bottom-cta relative z-[1] -mb-0.5 bg-site-highlight">
    <div className="container flex flex-col items-center justify-center w-full max-w-[1280px] mx-auto py-20 px-6">
      <div className="flex flex-col items-center justify-center gap-12 w-full">
        <div className="hero-split bottom-cta flex flex-col items-center justify-center gap-12 w-full">

          <div className="header-content half-width emphasis-secondary flex flex-col items-center gap-2 w-1/2">
            <div className="text-lg font-normal leading-6 text-center" style={{ color: sectionTextColor }}>
              {text.subheading}
            </div>
            <h2 className="display-medium aligned-center emphasis font-display font-extrabold text-[45px] leading-[52px] tracking-display-md text-center mt-0 mb-0" style={{ color: sectionTextColor }}>
              {text.heading}
            </h2>
          </div>

          <a
            href={ctaLink}
            target="_blank"
            rel="noreferrer"
            className="secondary-button w-inline-block flex items-center gap-2 rounded-[32px] px-8 py-4 text-lg font-extrabold font-display no-underline transition-all hover:shadow-lg"
            style={{ backgroundColor: buttonFillColor, color: buttonTextColor }}
          >
            {text.cta}
          </a>

        </div>
      </div>
    </div>
  </section>
);
