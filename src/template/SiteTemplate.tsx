import React, { useState } from 'react';
import { SiteConfig, Language } from '../types';
import './SiteTemplate.css';
import { Navbar } from './sections/Navbar';
import { HeroSection } from './sections/HeroSection';
import { ValueProps } from './sections/ValueProps';
import { BottomCTA } from './sections/BottomCTA';
import { SiteFooter } from './sections/SiteFooter';
import { translations } from './i18n';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { WhyUsSection } from './sections/WhyUsSection';
import { FAQSection } from './sections/FAQSection';
import { BranchInfoSection } from './sections/BranchInfoSection';

/** Returns the relative luminance (0–1) of a hex color string. */
function hexLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

interface SiteTemplateProps {
  config: SiteConfig;
  /** Hint from the editor preview toggle — forces desktop or mobile nav layout */
  viewMode?: 'desktop' | 'mobile';
}

const SiteTemplate: React.FC<SiteTemplateProps> = ({ config, viewMode }) => {
  const { branding, content, settings, social } = config;
  const ctaLink = content.ctaLink || '#';
  const year = new Date().getFullYear();

  // Language state — initialized from settings, changed by visitor via footer selector
  const [currentLang, setCurrentLang] = useState<Language>(settings.primaryLanguage || 'es');
  const t = translations[currentLang] ?? translations['es'];

  const headingFont = branding.headingFont || 'Bricolage Grotesque';
  const bodyFont = branding.bodyFont || 'Inter';

  const googleFontsUrl =
    `https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, '+')}:wght@400;600;700;800;900` +
    `&family=${bodyFont.replace(/ /g, '+')}:wght@400;500;600&display=swap`;

  const ctaButtonFill = hexLuminance(branding.secondaryColor) < 0.35 ? '#ffffff' : branding.accentColor;

  const borderRadius =
    branding.buttonShape === 'pill'   ? '9999px' :
    branding.buttonShape === 'square' ? '4px'    :
                                        '12px';

  const overrideStyles = `
    :root {
      --background-secondary: ${branding.accentColor};
      --secondary-90: ${branding.secondaryColor};
      --primary: ${branding.highlightColor};
      --dark-primary: ${branding.highlightColor};
    }
    .body * {
      font-family: '${bodyFont}', sans-serif !important;
    }
    .body h1, .body h2, .body h3, .body h4, .body h5, .body h6,
    .body .font-display, .body [class*="font-display"] {
      font-family: '${headingFont}', sans-serif !important;
    }
    .container-green {
      background-color: ${branding.accentColor} !important;
    }
    .bottom-cta {
      background-color: ${branding.secondaryColor} !important;
    }
    .primary-button,
    .primary-button.small,
    .primary-button.icon,
    .primary-button.header-button {
      border-radius: ${borderRadius} !important;
    }
    .secondary-button,
    .button-secondary-outline,
    .details-button {
      border-radius: ${borderRadius} !important;
    }
    ${viewMode === 'desktop' ? `
      .w-nav-button { display: none !important; }
      .nav-menu-wrapper.w-nav-menu { display: flex !important; }
      .right-content { display: flex !important; }
      .nav-menu-hidden.w-nav-menu { display: flex !important; }
      .actions-block-mobile { display: none !important; }
    ` : viewMode === 'mobile' ? `
      .w-nav-button { display: block !important; }
      .nav-menu-wrapper.w-nav-menu { display: none !important; }
      .right-content { display: none !important; }
      .actions-block-mobile { display: flex !important; }
    ` : ''}
    .navbar-logo-left-container { position: relative !important; }
    .nav-menu-wrapper.nav-open {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 16px 24px 24px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      z-index: 500;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .nav-menu-wrapper.nav-open .nav-menu-two {
      flex-direction: column;
      gap: 0;
      width: 100%;
      padding: 0;
      margin: 0;
    }
    .nav-menu-wrapper.nav-open .list-item.bottom-margin-24px {
      flex-direction: column;
      gap: 0;
      margin-bottom: 0;
    }
    .nav-menu-wrapper.nav-open a {
      display: block;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      font-size: 15px;
    }
  `;

  return (
    <>
      <link rel="stylesheet" href={googleFontsUrl} />
      <style dangerouslySetInnerHTML={{ __html: overrideStyles }} />
      <div className="body">
        <div className="site-container">
          <Navbar
            logo={branding.logo}
            ctaLink={ctaLink}
            text={t.nav}
          />
          <HeroSection
            heroImage={branding.heroImage}
            ctaLink={ctaLink}
            text={{
              ...t.hero,
              headline: content.headline || t.hero.headline,
              city: content.heroCity || t.hero.city,
            }}
          />
          <ValueProps
            ctaLink={ctaLink}
            primaryContrast={hexLuminance(branding.accentColor) < 0.35 ? '#ffffff' : '#000000'}
            secondaryContrast={hexLuminance(branding.secondaryColor) < 0.35 ? '#ffffff' : '#000000'}
            text={{ howItWorks: t.howItWorks, pricing: t.pricing }}
          />
          <TestimonialsSection
            testimonials={content.testimonials}
            text={t.testimonials}
          />
          <HowItWorksSection
            ctaLink={ctaLink}
            highlightColor={branding.highlightColor}
            text={t.featureBlocks}
          />
          <WhyUsSection text={t.whyUs} />
          <FAQSection
            ctaLink={content.faqCtaLink || ctaLink}
            accentColor={branding.accentColor}
            borderRadius={borderRadius}
            items={content.faqItems}
            text={t.faq}
          />
          {(content.branchImageUrl || content.branchMapLink) && (
            <BranchInfoSection
              imageUrl={content.branchImageUrl}
              mapLink={content.branchMapLink}
              ctaLink={ctaLink}
              accentColor={branding.accentColor}
              textColor={hexLuminance(branding.accentColor) < 0.35 ? '#ffffff' : '#000000'}
              borderRadius={borderRadius}
              text={t.branchInfo}
            />
          )}
          <BottomCTA
            ctaLink={ctaLink}
            buttonFillColor={ctaButtonFill}
            buttonTextColor={hexLuminance(ctaButtonFill) < 0.35 ? '#ffffff' : '#000000'}
            sectionTextColor={hexLuminance(branding.secondaryColor) < 0.35 ? '#ffffff' : '#000000'}
            text={t.bottomCta}
          />
          <SiteFooter
            logo={branding.logo}
            companyName={branding.companyName}
            year={year}
            ctaLink={ctaLink}
            social={social ?? { facebook: '', instagram: '', linkedin: '', youtube: '', tiktok: '', twitter: '' }}
            languages={settings.languages}
            currentLang={currentLang}
            onLangChange={setCurrentLang}
            text={t.footer}
          />
        </div>
      </div>
    </>
  );
};

export default SiteTemplate;
