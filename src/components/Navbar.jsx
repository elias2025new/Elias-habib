import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Eye, Download, Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up worker for PDF rendering
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [numPages, setNumPages] = useState(null);
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
    setShowPreview(false);
  }, [location]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
            item === 'Work' ? (
              <Link key={item} to="/work" className="hover:text-champagne transition-colors duration-300 hover:-translate-y-px inline-block">
                {item}
              </Link>
            ) : (
              <Link key={item} to={`/#${item.toLowerCase()}`} className="hover:text-champagne transition-colors duration-300 hover:-translate-y-px inline-block">
                {item}
              </Link>
            )
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* CV Dropdown Desktop */}
          <div className="relative group hidden sm:block">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-sans font-medium text-ivory/80 hover:text-champagne transition-colors duration-300">
              CV <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full right-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-obsidian border border-slate/20 rounded-2xl p-1.5 w-40 shadow-2xl flex flex-col gap-1 backdrop-blur-xl">
                <button 
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-ivory/80 hover:text-obsidian hover:bg-champagne rounded-xl transition-all duration-300 w-full text-left"
                >
                  <Eye size={16} /> Preview
                </button>
                <a 
                  href="/cv.pdf" 
                  download="Elias_Habib_CV.pdf"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-ivory/80 hover:text-obsidian hover:bg-champagne rounded-xl transition-all duration-300"
                >
                  <Download size={16} /> Download
                </a>
              </div>
            </div>
          </div>

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
            item === 'Work' ? (
              <Link
                key={item}
                to="/work"
                onClick={() => setIsOpen(false)}
                className="mobile-nav-item text-4xl font-sans font-black tracking-tight text-ivory hover:text-champagne transition-colors"
              >
                {item}
              </Link>
            ) : (
              <Link 
                key={item} 
                to={`/#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="mobile-nav-item text-4xl font-sans font-black tracking-tight text-ivory hover:text-champagne transition-colors"
              >
                {item}
              </Link>
            )
          ))}
          <div className="w-12 h-px bg-ivory/20 my-4 mobile-nav-item" />
          
          <div className="flex flex-col items-center gap-4 mobile-nav-item w-full">
            <button 
              onClick={() => { setShowPreview(true); setIsOpen(false); }}
              className="text-xl font-sans font-medium text-ivory/80 hover:text-champagne flex items-center gap-3 transition-colors"
            >
              <Eye size={20} /> Preview CV
            </button>
            <a 
              href="/cv.pdf" 
              download="Elias_Habib_CV.pdf"
              className="text-xl font-sans font-medium text-ivory/80 hover:text-champagne flex items-center gap-3 transition-colors"
            >
              <Download size={20} /> Download CV
            </a>
          </div>

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

      {/* CV Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-obsidian/90 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setShowPreview(false)} 
          />
          <div className="relative w-full max-w-5xl h-[85vh] bg-slate/10 border border-ivory/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-4 border-b border-ivory/10 flex justify-between items-center bg-obsidian/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center">
                   <Eye size={16} className="text-champagne" />
                </div>
                <h3 className="text-ivory font-semibold font-sans">CV Preview</h3>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href="/cv.pdf" 
                  download 
                  className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/10 hover:bg-ivory/20 text-ivory/80 text-xs font-medium transition-all"
                >
                  <Download size={14} /> Download
                </a>
                <button 
                  onClick={() => setShowPreview(false)} 
                  className="p-2 text-ivory/50 hover:text-ivory hover:rotate-90 transition-all duration-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-obsidian/40 overflow-y-auto custom-scrollbar">
              <div className="flex justify-center p-4 sm:p-12 min-h-full">
                <Document
                  file="/cv.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex flex-col items-center justify-center gap-4 py-32">
                      <Loader2 className="w-10 h-10 text-champagne animate-spin" />
                      <p className="text-ivory/40 font-mono text-sm tracking-widest uppercase">Initializing Preview...</p>
                    </div>
                  }
                  error={
                    <div className="flex flex-col items-center justify-center gap-4 py-32 text-center px-4">
                      <p className="text-ivory/60 font-sans">Unable to load preview. Please try downloading the file instead.</p>
                      <a 
                        href="/cv.pdf" 
                        download 
                        className="px-6 py-2 rounded-full bg-champagne text-obsidian font-bold text-sm"
                      >
                        Download CV
                      </a>
                    </div>
                  }
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_container_${index + 1}`} className="mb-10 last:mb-0">
                      <Page 
                        pageNumber={index + 1} 
                        scale={window.innerWidth < 640 ? 0.6 : 1.2}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-ivory/5"
                        loading={
                          <div className="w-[300px] sm:w-[800px] h-[500px] bg-slate/5 animate-pulse rounded-lg flex items-center justify-center">
                             <div className="w-8 h-8 border-2 border-ivory/10 border-t-ivory/40 rounded-full animate-spin" />
                          </div>
                        }
                      />
                      <div className="mt-4 text-center">
                        <span className="text-[10px] font-mono text-ivory/20 uppercase tracking-widest">Page {index + 1} of {numPages}</span>
                      </div>
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
