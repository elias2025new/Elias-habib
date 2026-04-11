import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

// SVG Icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 4.5L2.5 10.5l6 2L20 6l-9 8.5V20l3.5-3.5 4 3L21.5 4.5z"/>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

// Pages where social links are NEVER shown
const ALWAYS_HIDDEN_PATHS = ['/say-hello'];

// On the home page, only show when these section IDs are in view
const WATCHED_SECTIONS = ['expertise', 'process'];

const socials = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/elias.habib',
    icon: <InstagramIcon />,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/eliashabib',
    icon: <TelegramIcon />,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/elias2025new',
    icon: <GithubIcon />,
  },
];

export default function SocialLinks() {
  const location = useLocation();
  const containerRef = useRef(null);
  const isHomePage = location.pathname === '/';
  const isAlwaysHidden = ALWAYS_HIDDEN_PATHS.includes(location.pathname);

  // For non-home pages that aren't hidden: always visible
  // For home page: controlled by IntersectionObserver
  const [sectionVisible, setSectionVisible] = useState(false);

  // Determine if icons should show
  const shouldShow = !isAlwaysHidden && (isHomePage ? sectionVisible : true);

  // IntersectionObserver — only active on home page
  useEffect(() => {
    if (!isHomePage) return;

    const visibleSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });
        setSectionVisible(visibleSections.size > 0);
      },
      { threshold: 0.15 } // visible when 15% of section enters viewport
    );

    const targets = WATCHED_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isHomePage, location.pathname]);

  // GSAP animate in/out based on shouldShow
  useEffect(() => {
    if (!containerRef.current) return;

    if (shouldShow) {
      gsap.to(containerRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        pointerEvents: 'auto',
      });
      gsap.fromTo(
        containerRef.current.querySelectorAll('.social-link-item'),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out' }
      );
    } else {
      gsap.to(containerRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        pointerEvents: 'none',
      });
    }
  }, [shouldShow]);

  // Never render on always-hidden pages
  if (isAlwaysHidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
      style={{ opacity: 0, transform: 'translateX(60px)', pointerEvents: 'none' }}
    >
      {/* Vertical line top */}
      <div className="w-px h-12 bg-gradient-to-b from-transparent to-ivory/20 rounded-full" />

      {socials.map(({ id, label, href, icon }) => (
        <a
          key={id}
          id={`social-${id}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="social-link-item group relative flex items-center justify-center w-10 h-10 rounded-full border border-ivory/10 bg-obsidian/60 backdrop-blur-sm text-ivory/50 hover:text-champagne hover:border-champagne/40 hover:bg-champagne/5 transition-colors duration-300"
          style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s, border-color 0.3s, background 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08) translateX(-3px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateX(0)'; }}
        >
          {icon}

          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-obsidian/90 border border-ivory/10 text-ivory/80 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
            {label}
          </span>
        </a>
      ))}

      {/* Vertical line bottom */}
      <div className="w-px h-12 bg-gradient-to-t from-transparent to-ivory/20 rounded-full" />
    </div>
  );
}
