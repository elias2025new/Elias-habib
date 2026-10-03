import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Maximize2, 
  Eye, 
  Sparkles,
  Server,
  Database,
  Smartphone,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 'habesha-movers',
    title: 'Habesha Movers',
    client: 'Habesha Movers Logistics',
    location: 'Addis Ababa, Ethiopia',
    category: 'Corporate Relocation & Multi-Step Quote Platform',
    year: '2025',
    status: 'Live in Production',
    summary: 'A full-scale enterprise moving and relocation web platform engineered for Ethiopia’s leading logistics provider. Features an interactive 3-step dynamic quote calculator, Amharic & English bilingual localization, automatic route estimation, and instant lead capture pipeline.',
    impactMetrics: [
      { label: 'Moves Processed', value: '300+' },
      { label: 'Safe Delivery Rate', value: '100%' },
      { label: 'Quote Engine Steps', value: '3-Step Flow' },
      { label: 'Avg Initial Load', value: '0.45s' }
    ],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Headless CMS', 'Formspree API'],
    stats: {
      lighthouse: { perf: 100, a11y: 100, bp: 100, seo: 100 },
      ttfb: '68ms',
      bundleSize: '78 kB',
      edgeRegions: 'Global Edge (Vercel Anycast)'
    },
    slides: [
      {
        tag: '3D Hardware Mockup',
        title: '3D Space-Black MacBook Pro View',
        caption: 'Desktop platform running on MacBook Pro with interactive quote calculator and dark aesthetic.',
        src: '/projects/habesha-movers-3d.jpg'
      },
      {
        tag: 'Live Screen Capture',
        title: 'Full Desktop Platform View',
        caption: 'High-conversion landing page with real-time multi-step moving quote form and localized Amharic language switch.',
        src: '/projects/habesha-movers-desktop.png'
      }
    ],
    architecture: {
      topology: [
        { layer: 'Client Tier', spec: 'React 18 SPA + Vite / Next.js Edge, Tailwind CSS design system, bilingual Amharic/EN engine' },
        { layer: 'CDN & Caching', spec: 'Global Edge Network with stale-while-revalidate asset caching and automated image optimization' },
        { layer: 'Logic & API', spec: 'Serverless Edge Functions, structured lead dispatching, and dynamic quote calculating logic' },
        { layer: 'Integrations', spec: 'Encrypted Formspree endpoints, Telegram notification bot for real-time dispatch alerts' }
      ],
      highlights: [
        'Built with zero layout shifts (CLS: 0.00) ensuring flawless quote calculator interaction.',
        'Supports high-density retina displays and mobile responsiveness from 320px to 4K ultra-wide.',
        'Fully typed schemas preventing calculation mismatches across cubic-meter relocation rates.'
      ]
    }
  },
  {
    id: 'dermo-menu',
    title: 'Dermo Lounge QR Menu',
    client: 'Dermo Restaurant & Lounge',
    location: 'Bole, Addis Ababa',
    category: 'Contactless Digital Dining & Cloud QR Catalog',
    year: '2024',
    status: 'Active Client Deployment',
    summary: 'A cloud-synchronized contactless dining PWA replacing static paper menus. Patrons scan custom table QR codes to access an instantaneous, photo-rich menu with category carousels, authentic Ethiopian cuisine (Kitfo, Tibs, Doro Wat), live ETB pricing, and instant staff catalog management.',
    impactMetrics: [
      { label: 'Paperless Menus', value: '100%' },
      { label: 'Re-print Costs', value: 'Zero ETB' },
      { label: 'Catalog Updates', value: 'Instant (<1s)' },
      { label: 'Mobile PWA Load', value: '0.38s' }
    ],
    tech: ['Nuxt / Vue 3', 'Supabase Realtime', 'PWA / Service Workers', 'Tailwind CSS', 'Cloudflare Workers'],
    stats: {
      lighthouse: { perf: 99, a11y: 100, bp: 100, seo: 98 },
      ttfb: '52ms',
      bundleSize: '54 kB',
      edgeRegions: 'Cloudflare Global Cache'
    },
    slides: [
      {
        tag: '3D Hardware Mockup',
        title: '3D Restaurant Table & Acrylic QR Stand',
        caption: 'iPhone 16 Pro on dining table displaying the Ethiopian cuisine digital menu beside branded QR tent stand.',
        src: '/projects/dermo-menu-3d.jpg'
      },
      {
        tag: 'Live Screen Capture',
        title: 'Mobile PWA Live Menu Interface',
        caption: 'High-resolution mobile capture showcasing category navigation, Kitfo, Tibs, and real-time ETB pricing.',
        src: '/projects/dermo-menu-mobile.png'
      },
      {
        tag: 'Commercial Deliverable',
        title: 'E&F Systems Systems Brochure',
        caption: 'Commercial client collateral demonstrating QR menu systems and live client mobile deployments.',
        src: '/projects/ef-brochure-showcase.png'
      }
    ],
    architecture: {
      topology: [
        { layer: 'Scan Entry', spec: 'Ultra-dense vector QR codes linked to edge-routed shortlinks with sub-domain resolution' },
        { layer: 'Frontend PWA', spec: 'Progressive Web App with aggressive IndexedDB service worker caching for offline dining resilience' },
        { layer: 'Catalog Engine', spec: 'Supabase Realtime PostgreSQL database publishing instant price changes without page reload' },
        { layer: 'Media Delivery', spec: 'Lossless WebP image delivery via Cloudflare CDN with smart client bandwidth throttling' }
      ],
      highlights: [
        'Instantaneous category switching using hardware-accelerated CSS horizontal scrollers.',
        'Zero-friction guest experience: No app store download or login wall required to place orders.',
        'Admin control panel allows kitchen managers to toggle 86\'d (out of stock) items in 2 clicks.'
      ]
    }
  },
  {
    id: 'seo-engine',
    title: 'Google SEO & Growth Engine',
    client: 'Habesha Movers / Commercial Clients',
    location: 'National & Regional Index',
    category: 'Search Console Optimization & Local Knowledge Graph',
    year: '2024',
    status: 'Verified Live Metric Proof',
    summary: 'A data-driven technical search architecture engineered to dominate commercial search intent for moving and professional services. Implements semantic Schema.org JSON-LD structured data, Core Web Vitals optimization, and Google Search Console performance tracking.',
    impactMetrics: [
      { label: 'Organic Impressions', value: '2.15k' },
      { label: 'Average Position', value: 'Top 5.9' },
      { label: 'Primary Keyword', value: '#1 Intent' },
      { label: 'Indexed Pages', value: '100% Green' }
    ],
    tech: ['Google Search Console', 'Schema.org JSON-LD', 'Next.js Metadata API', 'OpenGraph Protocol', 'Google Maps API'],
    stats: {
      lighthouse: { perf: 100, a11y: 100, bp: 100, seo: 100 },
      ttfb: '60ms',
      bundleSize: 'N/A (SSR Data)',
      edgeRegions: 'Google Global Crawl Cluster'
    },
    slides: [
      {
        tag: '3D Hardware Mockup',
        title: '3D Apple Studio Display & iPad Pro',
        caption: 'Photorealistic developer workstation displaying Google Search Console surging impressions curve and queries table.',
        src: '/projects/seo-engine-3d.jpg'
      },
      {
        tag: 'Live Metric Proof',
        title: 'Google Search Console Performance Proof',
        caption: 'Verified Search Console dashboard capture showing 2.15k impressions, 107 clicks, and 5.9 average position for "movers in addis ababa".',
        src: '/projects/seo-console-analytics.png'
      }
    ],
    architecture: {
      topology: [
        { layer: 'Semantic Data', spec: 'Deep Schema.org JSON-LD graph (LocalBusiness, MovingCompany, AggregateRating, PostalAddress)' },
        { layer: 'Server Rendering', spec: 'Pre-rendered static HTML with dynamic metadata headers optimized for Googlebot render budget' },
        { layer: 'Sitemap & Robots', spec: 'Automated XML sitemaps with daily priority tags and canonical URL enforcement' },
        { layer: 'Analytics Feed', spec: 'Google Search Console API telemetry monitoring search impressions, CTR, and crawl health' }
      ],
      highlights: [
        'Captured top-3 search rankings for competitive commercial queries in the Ethiopian capital region.',
        'Strict Core Web Vitals compliance: Largest Contentful Paint (LCP) under 1.1s worldwide.',
        'Knowledge panel synchronization with verified Google Business profile and review feeds.'
      ]
    }
  },
  {
    id: 'serenify-srm',
    title: 'Serenify SRM',
    client: 'Serenify Spa & Wellness',
    location: 'Boutique Wellness Enterprise',
    category: 'Enterprise Spa Reservation Management Engine',
    year: '2024',
    status: 'Proprietary System Architecture',
    summary: 'An end-to-end bespoke SPA booking and resource management engine replacing legacy desktop software. Engineered with a calendar-first reactive UI, real-time availability synchronization, therapist room allocation matrix, dynamic off-peak pricing, and Stripe payment processing.',
    impactMetrics: [
      { label: 'Therapist Utilization', value: '78%' },
      { label: 'Booking Conflicts', value: '0 Double-Books' },
      { label: 'Daily Revenue Sync', value: 'Realtime' },
      { label: 'Calendar Latency', value: '< 45ms' }
    ],
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis Mutex', 'Tailwind CSS', 'Stripe API'],
    stats: {
      lighthouse: { perf: 98, a11y: 100, bp: 98, seo: 95 },
      ttfb: '72ms',
      bundleSize: '82 kB',
      edgeRegions: 'Multi-Region PostgreSQL Replica'
    },
    slides: [
      {
        tag: '3D Hardware Mockup',
        title: '3D Space-Black MacBook & iPad Dual Dashboard',
        caption: 'Luxury dark obsidian workstation render displaying the calendar appointment matrix, therapist schedule, and financial analytics.',
        src: '/projects/serenify-srm-3d.jpg'
      }
    ],
    architecture: {
      topology: [
        { layer: 'Reactive UI', spec: 'Calendar-first matrix layout with drag-to-reschedule, therapist timeline lanes, and live slot locks' },
        { layer: 'Concurrency Tier', spec: 'Redis distributed locks (Redlock) preventing simultaneous slot booking collisions during checkout' },
        { layer: 'Storage Engine', spec: 'Relational PostgreSQL with composite indexes across (appointment_date, therapist_id, room_status)' },
        { layer: 'Payments & SMS', spec: 'Idempotent Stripe Webhooks & automated SMS reminder triggers via Twilio integration' }
      ],
      highlights: [
        'Sub-45ms database query response time even across multi-week appointment views.',
        'Strict role-based access control (Admin, Receptionist, Therapist, Finance Auditor).',
        'Automatic timezone normalization and daylight saving adaptation for international clientele.'
      ]
    }
  },
  {
    id: 'telegram-miniapp',
    title: 'Telegram Mini Apps Protocol',
    client: 'Independent Framework Ecosystem',
    location: 'Decentralized / Worldwide',
    category: 'Messenger Native WebApp Architecture & Web3 Checkout',
    year: '2023 — 2024',
    status: 'Engineered Protocol',
    summary: 'A high-velocity micro-application architecture designed to execute natively inside Telegram. Bypasses app store gatekeeping and download barriers, providing instantaneous e-commerce, digital asset purchasing, and utility workflows to 900M+ native messenger users.',
    impactMetrics: [
      { label: 'Store Friction', value: 'Zero Install' },
      { label: 'Launch Latency', value: '< 0.8s' },
      { label: 'Payment Channels', value: 'TON & Card' },
      { label: 'Haptic Feedback', value: 'Native API' }
    ],
    tech: ['React 18', 'Telegram WebApp API', 'tRPC', 'TON Connect SDK', 'Tailwind CSS'],
    stats: {
      lighthouse: { perf: 100, a11y: 98, bp: 100, seo: 95 },
      ttfb: '48ms',
      bundleSize: '44 kB Micro-bundle',
      edgeRegions: 'Global Edge Anycast'
    },
    slides: [
      {
        tag: '3D Hardware Mockup',
        title: '3D Dark Titanium iPhone 16 Pro View',
        caption: 'Sleek render of the Telegram Mini App running inside the native messenger client with inline checkout and TON integration.',
        src: '/projects/telegram-miniapp-3d.jpg'
      }
    ],
    architecture: {
      topology: [
        { layer: 'Messenger Bridge', spec: 'Telegram WebApp JavaScript Bridge synchronizing theme params, back buttons, and native haptic clicks' },
        { layer: 'App Core', spec: 'Ultra-lightweight React micro-bundle with zero third-party UI dependencies for immediate launch' },
        { layer: 'RPC Layer', spec: 'Type-safe tRPC client exchanging verified cryptographically signed initData payloads with backend' },
        { layer: 'Payment Pipeline', spec: 'TON Connect 2.0 wallet signing + Telegram Payments Bot API for seamless fiat & token settlement' }
      ],
      highlights: [
        'Instant biometric and cryptographic user authentication using Telegram HMAC-SHA256 signatures.',
        'Adaptive UI matching the client user\'s native Telegram theme (Dark, Light, Custom accents).',
        'Bypasses 30% App Store fees while granting direct viral sharing into Telegram chats and channels.'
      ]
    }
  }
];

// Carousel Component
function ProjectCarousel({ slides, projectTitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const activeSlide = slides[currentIndex];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Visual Frame */}
      <div className="relative group overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#14141D] border border-champagne/20 shadow-2xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-champagne/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

        {/* Slide Image with Crossfade */}
        <img 
          key={activeSlide.src}
          src={activeSlide.src} 
          alt={`${projectTitle} - ${activeSlide.title}`}
          className="w-full h-full object-cover object-center transform transition-all duration-700 group-hover:scale-[1.02]"
        />

        {/* Top Tag Pill */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-champagne/30 text-champagne font-mono text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            {activeSlide.tag}
          </span>
          <span className="px-2.5 py-1.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-ivory/10 text-ivory/60 font-mono text-[10px] sm:text-xs">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Navigation Arrows (if multiple slides) */}
        {slides.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 sm:inset-x-4 flex items-center justify-between z-20 pointer-events-none">
            <button 
              onClick={prevSlide}
              aria-label="Previous proof slide"
              className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-obsidian/80 hover:bg-champagne hover:text-obsidian text-champagne border border-champagne/30 backdrop-blur-md transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0 shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next proof slide"
              className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-obsidian/80 hover:bg-champagne hover:text-obsidian text-champagne border border-champagne/30 backdrop-blur-md transition-all duration-300 transform translate-x-1 group-hover:translate-x-0 shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Bottom Slide Caption Bar */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <h4 className="text-sm sm:text-base font-sans font-bold text-ivory tracking-tight">
              {activeSlide.title}
            </h4>
            <p className="text-xs text-ivory/70 max-w-lg line-clamp-1 sm:line-clamp-2">
              {activeSlide.caption}
            </p>
          </div>

          {/* Dots Indicator */}
          {slides.length > 1 && (
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-6 bg-champagne' 
                      : 'w-2 bg-ivory/30 hover:bg-ivory/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Expandable Architecture Drawer Component
function ArchitectureDrawer({ project, isExpanded, onToggle }) {
  const drawerRef = useRef(null);

  return (
    <div className="w-full mt-6">
      {/* Trigger Button */}
      <button 
        onClick={onToggle}
        className="w-full py-4 px-6 rounded-2xl bg-[#14141D] hover:bg-[#1A1A26] border border-champagne/20 hover:border-champagne/50 transition-all duration-300 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-champagne group-hover:rotate-12 transition-transform" />
          <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-ivory">
            {isExpanded ? 'Collapse Architecture Specs' : 'Expand Architectural Blueprint & Specs'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-champagne hidden sm:inline-block">
            {isExpanded ? 'CLOSE SPECS' : 'VIEW TOPOLOGY'}
          </span>
          <div className={`p-1.5 rounded-full bg-champagne/10 text-champagne transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
            <ArrowRight size={14} className="rotate-90" />
          </div>
        </div>
      </button>

      {/* Expanded Blueprint Drawer */}
      {isExpanded && (
        <div 
          ref={drawerRef}
          className="mt-4 p-6 sm:p-8 rounded-[2rem] bg-[#0E0E15] border border-champagne/30 shadow-2xl flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-400"
        >
          {/* Header & Badges */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-ivory/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                  Verified Technical Audit
                </span>
              </div>
              <h4 className="text-xl font-sans font-bold text-ivory">
                {project.title} — System Topology & Engineering Specifications
              </h4>
            </div>

            {/* Lighthouse Scores */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-obsidian border border-emerald-500/30">
              <div className="flex flex-col items-center px-2 py-1">
                <span className="text-xs font-mono text-emerald-400 font-bold">{project.stats.lighthouse.perf}</span>
                <span className="text-[9px] font-mono text-ivory/40 uppercase">Perf</span>
              </div>
              <div className="w-px h-6 bg-ivory/10" />
              <div className="flex flex-col items-center px-2 py-1">
                <span className="text-xs font-mono text-emerald-400 font-bold">{project.stats.lighthouse.a11y}</span>
                <span className="text-[9px] font-mono text-ivory/40 uppercase">A11y</span>
              </div>
              <div className="w-px h-6 bg-ivory/10" />
              <div className="flex flex-col items-center px-2 py-1">
                <span className="text-xs font-mono text-emerald-400 font-bold">{project.stats.lighthouse.bp}</span>
                <span className="text-[9px] font-mono text-ivory/40 uppercase">Best P</span>
              </div>
              <div className="w-px h-6 bg-ivory/10" />
              <div className="flex flex-col items-center px-2 py-1">
                <span className="text-xs font-mono text-emerald-400 font-bold">{project.stats.lighthouse.seo}</span>
                <span className="text-[9px] font-mono text-ivory/40 uppercase">SEO</span>
              </div>
            </div>
          </div>

          {/* Topology Spec Flow */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-champagne mb-4 flex items-center gap-2">
              <Layers size={14} /> Multi-Tier Architecture Topology
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.architecture.topology.map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-obsidian/70 border border-slate/40 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-champagne uppercase tracking-wider font-semibold">
                      0{i + 1} / {t.layer}
                    </span>
                    <Activity size={12} className="text-ivory/30" />
                  </div>
                  <p className="text-xs text-ivory/80 leading-relaxed font-sans">
                    {t.spec}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Benchmarks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-obsidian/60 border border-ivory/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
                <Zap size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-ivory/40 uppercase tracking-widest block">Time to First Byte</span>
                <span className="text-base font-mono font-bold text-ivory">{project.stats.ttfb}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian/60 border border-ivory/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
                <Server size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-ivory/40 uppercase tracking-widest block">Payload Footprint</span>
                <span className="text-base font-mono font-bold text-ivory">{project.stats.bundleSize}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian/60 border border-ivory/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
                <Globe size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-ivory/40 uppercase tracking-widest block">Distribution Network</span>
                <span className="text-xs font-mono font-bold text-ivory line-clamp-1">{project.stats.edgeRegions}</span>
              </div>
            </div>
          </div>

          {/* Engineering Highlights */}
          <div className="p-5 rounded-2xl bg-obsidian/50 border border-ivory/10">
            <h5 className="font-mono text-xs uppercase tracking-widest text-champagne mb-3 flex items-center gap-2">
              <CheckCircle2 size={14} /> Production Highlights & Quality Guarantees
            </h5>
            <ul className="flex flex-col gap-2">
              {project.architecture.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ivory/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-1.5 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const containerRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.fromTo('.work-header-text', 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.12 }
      );
      gsap.fromTo('.work-header-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power3.inOut', delay: 0.25 }
      );

      // Project cards entrance
      const projectRows = gsap.utils.toArray('.project-card-wrapper');
      
      projectRows.forEach((card) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full min-h-screen bg-obsidian text-ivory pt-32 sm:pt-48 overflow-hidden">
      
      {/* Background Noise Filter */}
      <svg className="fixed top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none z-0">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Decorative Large Background Typography */}
      <div className="fixed bottom-12 left-12 opacity-5 pointer-events-none select-none hidden lg:block z-0">
        <h1 className="text-[12vw] font-drama whitespace-nowrap leading-none text-ivory">Elias Habib</h1>
      </div>

      {/* Hero Header Section */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-16 md:mb-28 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          <div>
            <div className="overflow-hidden">
              <span className="work-header-text inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-champagne mb-4">
                <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
                Verified Commercial Portfolio & Proof Suite
              </span>
            </div>
            <div className="overflow-hidden">
              <h1 className="work-header-text text-5xl md:text-8xl lg:text-[6.5rem] font-sans font-black tracking-tighter uppercase leading-[0.9]">
                Selected
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="work-header-text text-5xl md:text-8xl lg:text-[6.5rem] font-sans font-black tracking-tighter uppercase leading-[0.9] text-champagne">
                Works <span className="text-xl md:text-3xl tracking-normal text-ivory/40 lowercase font-serif italic">2023—2025</span>
              </h1>
            </div>
          </div>

          <div className="overflow-hidden max-w-lg pb-2">
            <p className="work-header-text text-base sm:text-lg text-ivory/70 font-sans leading-relaxed">
              Every system presented below is grounded in verified production proof: real client deliverables, live metrics, 3D device captures, and audited architectural topologies.
            </p>
          </div>
        </div>
        
        <div className="work-header-line h-px w-full bg-gradient-to-r from-champagne/50 via-champagne/20 to-transparent origin-left" />
      </section>

      {/* Project Cards Section */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto pb-32 relative z-10 flex flex-col gap-24 md:gap-36">
        {projectsData.map((project, index) => {
          const isEven = index % 2 === 0;
          const isExpanded = expandedId === project.id;

          return (
            <div 
              key={project.id}
              className="project-card-wrapper flex flex-col p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] bg-[#111119]/80 border border-ivory/10 shadow-2xl backdrop-blur-xl relative"
            >
              {/* Top Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-ivory/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-champagne/30 bg-champagne/10 flex items-center justify-center text-champagne font-mono text-sm font-bold">
                    0{index + 1}
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-champagne font-semibold block">
                      {project.client}
                    </span>
                    <span className="text-xs text-ivory/40 font-mono">
                      {project.location} • {project.year}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Main Content Layout (Carousel + Details) */}
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>
                
                {/* Carousel Block */}
                <div className="w-full lg:w-[55%]">
                  <ProjectCarousel slides={project.slides} projectTitle={project.title} />
                </div>

                {/* Content Block */}
                <div className="w-full lg:w-[45%] flex flex-col items-start">
                  <span className="font-mono text-champagne text-xs uppercase tracking-[0.2em] mb-2">
                    {project.category}
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight mb-4 uppercase text-ivory">
                    {project.title}
                  </h2>

                  <p className="text-ivory/70 leading-relaxed mb-8 text-sm sm:text-base font-sans">
                    {project.summary}
                  </p>

                  {/* Quantitative Impact Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
                    {project.impactMetrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-obsidian/70 border border-champagne/20 flex flex-col justify-center">
                        <span className="font-mono text-lg sm:text-xl font-bold text-champagne tracking-tight">
                          {metric.value}
                        </span>
                        <span className="text-[10px] font-mono text-ivory/50 uppercase tracking-tight line-clamp-1">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3.5 py-1.5 rounded-full bg-obsidian/50 border border-ivory/10 text-xs font-mono text-ivory/60">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link to Say Hello / Consultation */}
                  <Link 
                    to="/say-hello"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-champagne/10 hover:bg-champagne text-champagne hover:text-obsidian border border-champagne/30 font-semibold text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    <span>Discuss Similar Architecture</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Expandable Architectural Spec Sheet */}
              <ArchitectureDrawer 
                project={project} 
                isExpanded={isExpanded} 
                onToggle={() => toggleExpand(project.id)} 
              />
            </div>
          );
        })}
      </section>

      {/* Proof Summary Callout Banner */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-24 relative z-10">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#151522] via-obsidian to-[#11111A] border border-champagne/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-champagne font-semibold block mb-2">
              Engineering Guarantee
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ivory mb-3">
              Production-Grade Reliability. Zero Generic Templates.
            </h3>
            <p className="text-sm text-ivory/70 leading-relaxed font-sans">
              From corporate multi-tenant web platforms to real-time high-throughput booking engines, every codebase is architected with strict type safety, edge caching, and cinematic aesthetics.
            </p>
          </div>

          <Link 
            to="/say-hello"
            className="flex-shrink-0 px-8 py-4 rounded-full bg-champagne text-obsidian font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            Start Your Build
          </Link>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 border-t border-ivory/10 bg-transparent py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
         <h2 className="text-3xl md:text-5xl font-sans font-black uppercase text-ivory mb-6 tracking-tight">
           Got a project in mind?
         </h2>
         <p className="text-ivory/60 font-serif italic mb-10 max-w-xl text-lg">
           Let's architect something cinematic, legitimate, and undeniable together.
         </p>
         <Link 
           to="/say-hello" 
           className="inline-flex items-center justify-center px-10 h-14 rounded-full bg-champagne text-obsidian font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-300"
         >
           Start a Conversation
         </Link>
      </section>

      <Footer />
    </main>
  );
}
