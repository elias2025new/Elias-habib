import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Enterprise Hub',
    subtitle: 'Website for 8+ companies',
    description: 'A multi-tenant corporate architecture supporting over 8 distinct company profiles under a unified design system. Built with performance and scalability in mind, it handles varied content models while maintaining strict type-safety and lightning-fast edge delivery.',
    tech: ['React', 'Next.js', 'Tailwind', 'Sanity CMS'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    year: '2025'
  },
  {
    title: 'Serenify SRM',
    subtitle: 'Spa reservation system',
    description: 'An end-to-end bespoke SPA booking engine. It replaces legacy software with a beautiful, calendar-first reactive UI. Features include real-time availability sync, dynamic pricing rules, staff scheduling, and seamless Stripe integration.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
    year: '2024'
  },
  {
    title: 'Scan & Dine',
    subtitle: 'Digital menu (QR codes)',
    description: 'A high-conversion contactless dining experience. Allows restaurants to instantly deploy beautiful digital menus linked to QR patches. Built with offline availability (PWA) and sophisticated order-routing to kitchen displays.',
    tech: ['Vue/Nuxt', 'Supabase', 'PWA', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
    year: '2024'
  },
  {
    title: 'Mini Apps Protocol',
    subtitle: 'Telegram Mini Apps',
    description: 'A robust framework for building and deploying Telegram Mini Apps. Bypasses the App Store completely, bringing rich e-commerce, gaming, and utility interfaces directly into the messenger client for millions of users natively.',
    tech: ['React', 'Telegram Webapp API', 'tRPC'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    year: '2023'
  }
];

export default function Work() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.fromTo('.work-header-text', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
      );
      gsap.fromTo('.work-header-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut', delay: 0.3 }
      );

      // Project scrolling reveals
      const projectRows = gsap.utils.toArray('.project-row');
      
      projectRows.forEach((row) => {
        const image = row.querySelector('.project-image-wrap');
        const content = row.querySelector('.project-content');
        
        // Setup complex entering timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(image, 
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
        )
        .fromTo(content,
          { x: row.classList.contains('flex-row-reverse') ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

        // Sub-elements stagger reveal
        tl.fromTo(row.querySelectorAll('.project-stagger'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.4'
        );

        // Inner image parallax
        gsap.to(row.querySelector('img'), {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // Magnetic hover on button
        const btn = row.querySelector('.magnetic-btn');
        if(btn) {
          btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power3.out' });
            gsap.to(btn.querySelector('.btn-bg'), { yPercent: -100, duration: 0.4, ease: 'power2.inOut' });
          });
          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power3.out' });
            gsap.to(btn.querySelector('.btn-bg'), { yPercent: 0, duration: 0.4, ease: 'power2.inOut' });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full min-h-screen bg-obsidian text-ivory pt-32 sm:pt-48 overflow-hidden">
      
      {/* Background Noise */}
      <svg className="fixed top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none z-0">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Decorative Branding */}
      <div className="fixed bottom-12 left-12 opacity-5 pointer-events-none select-none hidden lg:block z-0">
        <h1 className="text-[12vw] font-drama whitespace-nowrap leading-none text-ivory">Elias Habib</h1>
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto mb-20 md:mb-32 relative z-10">
        <div className="overflow-hidden">
          <h1 className="work-header-text text-5xl md:text-8xl lg:text-[7rem] font-sans font-black tracking-tighter uppercase leading-[0.9]">
            Selected
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="work-header-text text-5xl md:text-8xl lg:text-[7rem] font-sans font-black tracking-tighter uppercase leading-[0.9] text-champagne mb-8">
            Works <span className="text-xl md:text-3xl tracking-normal text-ivory/40 lowercase font-serif italic">23—25</span>
          </h1>
        </div>
        
        <div className="work-header-line h-px w-full bg-gradient-to-r from-champagne/40 to-transparent origin-left mb-8" />
        
        <div className="overflow-hidden max-w-xl">
          <p className="work-header-text text-lg text-ivory/60 font-sans leading-relaxed">
            A curated selection of production-grade applications that combine robust engineering with uncompromising cinematic design.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto pb-32 relative z-10 flex flex-col gap-24 md:gap-48">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index} 
              className={`project-row flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
            >
              
              {/* Image Block */}
              <div className="project-image-wrap w-full lg:w-[55%] relative group cursor-pointer overflow-hidden rounded-[2rem] sm:rounded-[3rem] aspect-[4/3] md:aspect-[16/10]">
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60 z-10" />
                
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-[120%] object-cover object-center absolute -top-[10%] left-0 transform origin-center transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Number indicator */}
                <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-champagne/30 backdrop-blur-md flex items-center justify-center text-champagne font-mono text-sm">
                    0{index + 1}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-ivory/80">{project.year}</span>
                </div>
              </div>

              {/* Content Block */}
              <div className="project-content w-full lg:w-[45%] flex flex-col items-start">
                <div className="project-stagger font-mono text-champagne text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                  <span>Project {index + 1}</span>
                  <div className="flex-1 h-px bg-champagne/30" />
                </div>
                
                <h2 className="project-stagger text-4xl sm:text-5xl font-sans font-black tracking-tight mb-2 uppercase">
                  {project.title}
                </h2>
                
                <h3 className="project-stagger text-xl text-ivory/60 font-serif italic mb-8">
                  {project.subtitle}
                </h3>
                
                <p className="project-stagger text-ivory/70 leading-relaxed mb-10 text-base sm:text-lg">
                  {project.description}
                </p>

                <div className="project-stagger flex flex-wrap gap-2 mb-12">
                  {project.tech.map((t) => (
                    <span key={t} className="px-4 py-2 rounded-full border border-ivory/10 text-xs font-mono text-ivory/50">
                      {t}
                    </span>
                  ))}
                </div>

                <button className="project-stagger magnetic-btn relative overflow-hidden px-8 py-4 rounded-full border border-champagne/30 bg-transparent text-champagne font-sans font-semibold text-sm flex items-center gap-3 transition-colors hover:text-obsidian group">
                  <div className="btn-bg absolute inset-0 bg-champagne translate-y-full rounded-full z-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    View Project Details
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Banner / CTA at bottom */}
      <section className="relative z-10 border-t border-ivory/5 bg-transparent py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
         <h2 className="text-3xl md:text-5xl font-sans font-black uppercase text-ivory mb-6 tracking-tight">Got a project in mind?</h2>
         <p className="text-ivory/60 font-serif italic mb-10 max-w-xl text-lg">Let's craft something cinematic together.</p>
         <Link to="/say-hello" className="inline-flex items-center justify-center px-10 h-14 rounded-full bg-champagne text-obsidian font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-300">
           Start a Conversation
         </Link>
      </section>

      <Footer />
    </main>
  );
}
