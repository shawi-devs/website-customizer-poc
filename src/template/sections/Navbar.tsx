import React, { useState } from 'react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { TemplateText } from '../i18n';

interface NavbarProps {
  logo: { url: string; alt: string };
  ctaLink: string;
  text: TemplateText['nav'];
}

export const Navbar: React.FC<NavbarProps> = ({ logo, ctaLink, text }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      role="banner"
      data-animation="default"
      data-collapse="medium"
      className="navbar-logo-left-container w-nav sticky top-0 z-[80] flex items-center w-full px-5 py-3 bg-transparent"
    >
      <div className="container navbar flex items-stretch w-full max-w-[1280px] mx-auto">
        <div className="navbar-wrapper flex justify-between items-center w-full">

          {/* ── Left: hamburger + logo + main nav ── */}
          <div className="left-content flex items-center gap-6 w-full">

            <button
              className={`menu-button w-nav-button${menuOpen ? ' w--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <XIcon size={22} weight="bold" /> : <ListIcon size={22} weight="bold" />}
            </button>

            <a href="#" className="no-underline">
              <img src={logo.url} alt={logo.alt} loading="lazy" className="h-10 max-w-none" />
            </a>

            <nav
              role="navigation"
              className={`nav-menu-wrapper w-nav-menu flex justify-end${menuOpen ? ' nav-open' : ''}`}
            >
              <ul className="nav-menu-two w-list-unstyled flex items-center gap-1 mb-0">
                <li className="list-item bottom-margin-24px flex items-center gap-1 my-auto">
                  <a href="#" className="text-[var(--on-surface-variant)] text-sm px-2.5 py-1.5 no-underline hover:text-black/75 tracking-[0.25px]">{text.howItWorks}</a>
                  <a href={ctaLink} className="text-[var(--on-surface-variant)] text-sm px-2.5 py-1.5 no-underline hover:text-black/75 tracking-[0.25px]">{text.pricing}</a>
                  <a href="#" className="text-[var(--on-surface-variant)] text-sm px-2.5 py-1.5 no-underline hover:text-black/75 tracking-[0.25px]">{text.about}</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* ── Right: desktop CTA ── */}
          <div className="right-content flex justify-end items-center gap-4 w-1/2">
            <nav role="navigation" className="nav-menu-hidden w-nav-menu flex items-center">
              <ul className="list w-list-unstyled mb-0">
                <li className="flex gap-4 items-center">
                  <a
                    href={ctaLink}
                    className="primary-button small flex items-center gap-1.5 bg-site-primary text-white rounded-[32px] px-4 py-2.5 text-sm font-extrabold font-display no-underline transition-all hover:shadow-md"
                  >
                    {text.cta}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* ── Mobile sticky CTA ── */}
          <div className="actions-block-mobile hidden">
            <a
              href={ctaLink}
              className="primary-button small flex items-center gap-1.5 bg-site-primary text-white rounded-[32px] px-4 py-2.5 text-sm font-extrabold font-display no-underline"
            >
              {text.cta}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
