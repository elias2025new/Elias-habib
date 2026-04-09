import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ctaRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Magnetic button effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      const btn = ctaRef.current;
      if(!btn) return;
      
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.03, duration: 0.3, ease: 'power3.out' });
        gsap.to(btn.querySelector('.bg-slide'), { yPercent: -100, duration: 0.4, ease: 'power2.inOut' });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power3.out' });
        gsap.to(btn.querySelector('.bg-slide'), { yPercent: 0, duration: 0.4, ease: 'power2.inOut' });
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    
    if (isOpen) {
      gsap.to(menuRef.current, {
        yPercent: 100,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        display: 'flex'
      });
      gsap.fromTo('.mobile-nav-item', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
    }
  }, [isOpen]);

  const navItems = ['Work', 'Expertise', 'Process'];

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-between px-4 sm:px-6 py-3 rounded-full transition-all duration-500 w-[95%] sm:w-[90%] max-w-5xl ${
          scrolled || isOpen
            ? 'bg-obsidian/80 backdrop-blur-xl border border-slate/50 shadow-2xl'
            : 'bg-transparent border border-transparent border-b-slate/20'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="text-lg sm:text-xl font-bold font-sans tracking-tight text-ivory flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span>Elias Habib</span>
            <span className="text-[10px] sm:text-xs font-mono px-2 py-1 bg-slate/30 rounded-full text-champagne/80 hidden sm:inline-block">Freelance</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-ivory/70">
          {navItems.map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} className="hover:text-champagne transition-colors duration-300 hover:-translate-y-px inline-block">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/say-hello"
            ref={ctaRef}
            className="hidden sm:flex relative overflow-hidden px-6 py-2.5 rounded-full bg-champagne text-obsidian font-semibold text-sm transition-shadow hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          >
            <div className="bg-slide absolute inset-0 bg-ivory translate-y-full rounded-full" />
            <span className="relative z-10 flex items-center gap-2">
              Say hello
            </span>
          </Link>
          
          <Link
             to="/say-hello"
             className="sm:hidden px-4 py-2 rounded-full bg-champagne text-obsidian font-semibold text-xs transition-shadow whitespace-nowrap"
          >
             Say hello
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ivory hover:text-champagne transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-50 bg-obsidian border-b border-ivory/10 flex flex-col items-center justify-center -translate-y-full opacity-0 hidden"
        style={{ height: '100dvh' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 to-transparent pointer-events-none" />
        
        <div className="flex flex-col items-center gap-8 mt-20">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="mobile-nav-item text-4xl font-sans font-black tracking-tight text-ivory hover:text-champagne transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="w-12 h-px bg-ivory/20 my-4 mobile-nav-item" />
          <Link
            to="/say-hello"
            onClick={() => setIsOpen(false)}
            className="mobile-nav-item text-lg font-mono text-champagne tracking-widest uppercase"
          >
            Say Hello
          </Link>
        </div>
      </div>
    </>
  );
}
