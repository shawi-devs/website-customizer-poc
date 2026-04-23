import React from 'react';
import { useSiteConfigStore } from '../../store/useSiteConfigStore';
import {
  FormInput,
  ColorPicker,
  ButtonShapeSelector,
  ImageUpload,
  Section,
  FontPicker,
  HEADING_FONTS,
  BODY_FONTS,
} from '../common/index';
import { ButtonShape } from '../../types';

export const BrandingSection: React.FC = () => {
  const { config, updateBranding } = useSiteConfigStore();
  const { branding } = config;

  return (
    <div className="space-y-4">

      {/* ── Identity ── */}
      <Section title="Identity" description="How your brand appears to visitors">
        <div className="space-y-5">
          <FormInput
            label="Company name"
            value={branding.companyName}
            onChange={(value) => updateBranding({ companyName: value })}
          />
          <ImageUpload
            label="Logo"
            description="Shown in the navigation bar and footer"
            value={branding.logo.url}
            onUpload={(url) => updateBranding({ logo: { ...branding.logo, url } })}
            hint="SVG or PNG with transparent background"
            uploadType="logo"
          />
        </div>
      </Section>

      {/* ── Colors ── */}
      <Section title="Colors" description="Define your brand color palette">
        <div className="divide-y divide-gray-100">
          <ColorPicker
            label="Primary"
            description="Buttons, links, How it works & Services sections"
            value={branding.accentColor}
            onChange={(color) => updateBranding({ accentColor: color })}
          />
          <ColorPicker
            label="Secondary"
            description="CTA section background"
            value={branding.secondaryColor}
            onChange={(color) => updateBranding({ secondaryColor: color })}
          />
          <ColorPicker
            label="Highlight"
            description="Stars, accent text, and rating icons"
            value={branding.highlightColor}
            onChange={(color) => updateBranding({ highlightColor: color })}
          />
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography" description="Choose fonts for headings and body text">
        <div className="space-y-4">
          <FontPicker
            label="Heading font"
            description="Used for titles and section headers"
            value={branding.headingFont || 'Bricolage Grotesque'}
            onChange={(font) => updateBranding({ headingFont: font })}
            fonts={HEADING_FONTS}
          />
          <FontPicker
            label="Body font"
            description="Used for paragraphs and UI text"
            value={branding.bodyFont || 'Inter'}
            onChange={(font) => updateBranding({ bodyFont: font })}
            fonts={BODY_FONTS}
          />
        </div>
      </Section>

      {/* ── Style ── */}
      <Section title="Style" description="Visual style of interactive elements">
        <div className="space-y-5">
          <ButtonShapeSelector
            label="Button shape"
            selected={branding.buttonShape}
            onChange={(value) => updateBranding({ buttonShape: value as ButtonShape })}
          />
          <div className="border-t border-gray-100 pt-5">
            <ImageUpload
              label="Hero image"
              description="Main visual displayed on the homepage"
              value={branding.heroImage.url}
              onUpload={(url) => updateBranding({ heroImage: { ...branding.heroImage, url } })}
              hint="Recommended 800×600px · PNG or JPG"
              uploadType="hero"
            />
          </div>
        </div>
      </Section>

    </div>
  );
};
