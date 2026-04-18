import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { TemplateText } from '../i18n';
import { SiteConfig } from '../../types';

interface TestimonialsSectionProps {
  testimonials: SiteConfig['content']['testimonials'];
  text: TemplateText['testimonials'];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= rating ? '#f59e0b' : 'none'} stroke={star <= rating ? '#f59e0b' : '#d1d5db'} strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<{ item: SiteConfig['content']['testimonials'][number] }> = ({ item }) => (
  <div className="testimonial-card bg-[#f7f8fa] rounded-2xl p-4 flex flex-col gap-3">
    <StarRating rating={item.rating} />
    <p className="text-[var(--on-surface)] text-xs leading-5 font-normal mt-0 mb-0 flex-1">
      {item.text}
    </p>
    <p className="text-[var(--on-surface)] text-xs font-semibold mt-0 mb-0">{item.name}</p>
  </div>
);

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, text }) => {
  const items = (testimonials ?? []).filter((t) => t.name.trim() && t.text.trim()).slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);

  if (items.length === 0) return null;

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);
    trackRef.current?.scrollTo({ left: trackRef.current.offsetWidth * clamped, behavior: 'smooth' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const delta = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) goTo(activeIndex + (delta > 0 ? 1 : -1));
    startXRef.current = null;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const id = setInterval(() => {
      const next = (activeIndexRef.current + 1) % items.length;
      activeIndexRef.current = next;
      setActiveIndex(next);
      trackRef.current?.scrollTo({ left: trackRef.current.offsetWidth * next, behavior: 'smooth' });
    }, 4000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="testimonials-section px-6 py-[80px] bg-white">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="testimonials-layout">

          {/* ── Left: stat headline + link ── */}
          <div className="testimonials-left">
            <h2 className="font-display font-extrabold text-[40px] leading-[48px] text-[var(--on-surface)] mt-0 mb-6">
              {text.heading}
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--on-surface)] no-underline hover:opacity-70 transition-opacity"
            >
              {text.linkText}
              <ArrowRightIcon size={16} weight="bold" />
            </a>
          </div>

          {/* ── Desktop grid ── */}
          <div className="testimonials-grid">
            {items.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>

          {/* ── Mobile carousel ── */}
          <div className="testimonials-carousel">
            <div
              ref={trackRef}
              className="testimonials-carousel-track"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {items.map((item, i) => (
                <div key={i} className="testimonials-carousel-slide">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className="transition-all focus:outline-none"
                  style={{
                    width: i === activeIndex ? 20 : 8,
                    height: 8,
                    borderRadius: 9999,
                    background: i === activeIndex ? 'var(--on-surface)' : '#d1d5db',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
