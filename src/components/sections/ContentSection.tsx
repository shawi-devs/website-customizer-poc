import React, { useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { useSiteConfigStore } from '../../store/useSiteConfigStore';
import { FormInput, ImageUpload } from '../common/index';

const STAR_RATINGS = [1, 2, 3, 4, 5];

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <CaretDownIcon
          size={16}
          className={`text-gray-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-white border-t border-gray-100 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export const ContentSection: React.FC = () => {
  const { config, updateContent } = useSiteConfigStore();
  const { content } = config;

  const updateTestimonial = (index: number, field: string, value: string | number) => {
    const updated = (content.testimonials ?? []).map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateContent({ testimonials: updated });
  };

  return (
    <div className="space-y-3">

      {/* ── Hero ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Hero</h2>
          <p className="text-xs text-gray-500 mt-0.5">Main heading shown at the top of the page</p>
        </div>
        <div className="px-5 py-4 space-y-4">
          <FormInput
            label="Heading"
            value={content.headline}
            onChange={(value) => updateContent({ headline: value })}
            placeholder="e.g. Laundry with 24h delivery in"
          />
          <FormInput
            label="Highlighted span"
            description="Displayed after the heading in the accent color"
            value={content.heroCity}
            onChange={(value) => updateContent({ heroCity: value })}
            placeholder="e.g. CDMX"
          />
        </div>
      </div>

      {/* ── CTA Link ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">CTA Link</h2>
          <p className="text-xs text-gray-500 mt-0.5">Destination URL for all call-to-action buttons</p>
        </div>
        <div className="px-5 py-4">
          <FormInput
            label="URL"
            value={content.ctaLink}
            onChange={(value) => updateContent({ ctaLink: value })}
            type="url"
            placeholder="https://…"
          />
        </div>
      </div>

      {/* ── Testimonials (collapsible) ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Testimonials</h2>
          <p className="text-xs text-gray-500 mt-0.5">Up to 6 reviews shown in the testimonials section</p>
        </div>
        <div className="px-5 py-4 space-y-3">
          {(content.testimonials ?? []).slice(0, 6).map((item, index) => (
            <CollapsibleSection key={index} title={item.name.trim() ? item.name : `Review ${index + 1}`}>

              {/* Star rating */}
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">Rating</p>
                <div className="flex gap-1.5">
                  {STAR_RATINGS.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => updateTestimonial(index, 'rating', star)}
                      className="focus:outline-none"
                      aria-label={`${star} star`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill={star <= item.rating ? '#f59e0b' : 'none'}
                        stroke={star <= item.rating ? '#f59e0b' : '#d1d5db'}
                        strokeWidth="1.5"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <FormInput
                label="Reviewer name"
                value={item.name}
                onChange={(value) => updateTestimonial(index, 'name', value)}
                placeholder="e.g. María G."
              />

              <FormInput
                label="Location"
                value={item.location}
                onChange={(value) => updateTestimonial(index, 'location', value)}
                placeholder="e.g. Ciudad de México"
              />

              <FormInput
                label="Review text"
                value={item.text}
                onChange={(value) => updateTestimonial(index, 'text', value)}
                type="textarea"
                placeholder="Write the review content…"
              />
            </CollapsibleSection>
          ))}
        </div>
      </div>

      {/* ── FAQs ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">FAQs</h2>
          <p className="text-xs text-gray-500 mt-0.5">Up to 5 questions shown in the FAQ section</p>
        </div>
        <div className="px-5 py-4 space-y-4">
          <FormInput
            label="WhatsApp link"
            description="URL for the Ask a question button"
            value={content.faqCtaLink ?? ''}
            onChange={(value) => updateContent({ faqCtaLink: value })}
            type="url"
            placeholder="https://wa.me/521234567890"
          />

          <div className="space-y-3 pt-2">
            {(content.faqItems ?? []).slice(0, 5).map((item, index) => (
              <CollapsibleSection
                key={index}
                title={item.question.trim() ? item.question : `Question ${index + 1}`}
              >
                <FormInput
                  label="Question"
                  value={item.question}
                  onChange={(value) => {
                    const updated = (content.faqItems ?? []).map((f, i) =>
                      i === index ? { ...f, question: value } : f
                    );
                    updateContent({ faqItems: updated });
                  }}
                  placeholder="e.g. ¿Hay un valor mínimo de pedido?"
                />
                <FormInput
                  label="Answer"
                  value={item.answer}
                  onChange={(value) => {
                    const updated = (content.faqItems ?? []).map((f, i) =>
                      i === index ? { ...f, answer: value } : f
                    );
                    updateContent({ faqItems: updated });
                  }}
                  type="textarea"
                  placeholder="Write the answer…"
                />
              </CollapsibleSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── Branch Info ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Branch Info</h2>
          <p className="text-xs text-gray-500 mt-0.5">Section appears only when an image or map link is set</p>
        </div>
        <div className="px-5 py-4 space-y-5">
          <ImageUpload
            label="Branch photo"
            description="Displayed as a circle — square or portrait images work best"
            value={content.branchImageUrl ?? ''}
            onUpload={(url) => updateContent({ branchImageUrl: url })}
            onRemove={() => updateContent({ branchImageUrl: '' })}
          />
          <FormInput
            label="Google Maps link"
            description="URL for the directions button"
            value={content.branchMapLink ?? ''}
            onChange={(value) => updateContent({ branchMapLink: value })}
            type="url"
            placeholder="https://maps.google.com/…"
          />
        </div>
      </div>

    </div>
  );
};
