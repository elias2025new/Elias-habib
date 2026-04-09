import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discovery & System Design',
    desc: 'Mapping technical requirements into a robust end-to-end architecture.',
    SVG: () => (
      <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-80 mix-blend-screen animate-spin-slow" style={{ animationDuration: '20s' }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#FAF8F5" strokeWidth="0.5" />
        <path d="M50 10 V 90 M10 50 H 90" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'Pixel-Perfect Build',
    desc: 'Translating design into a performant, dynamic frontend application.',
    SVG: () => (
      <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-80 mix-blend-screen">
        <defs>
          <linearGradient id="laser" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="#FAF8F5" strokeWidth="0.2" opacity="0.3" strokeDasharray="10 10" />
        <rect x="0" y="45" width="100" height="2" fill="url(#laser)" className="animate-pulse" />
        <circle cx="30" cy="46" r="3" fill="#C9A84C" className="animate-ping" />
        <circle cx="70" cy="46" r="3" fill="#C9A84C" className="animate-ping" style={{animationDelay: '1s'}} />
      </svg>
    )
  },
  {
    num: '03',
    title: 'Deployment & Scale',
    desc: 'Engineering high-availability servers to ensure flawless user access worldwide.',
    SVG: () => (
      <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-80 mix-blend-screen">
        <path 
          d="M0 50 L 20 50 L 30 20 L 50 80 L 60 40 L 70 50 L 100 50" 
          fill="none" 
          stroke="#C9A84C" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
          className="protocol-wave"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
      </svg>
    )
  }
];

export default function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        const isLastCard = i === cards.length - 1;
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: isLastCard,
          id: `card-${i}`,
        });

        // The card underneath scales and blurs when the NEXT card comes over it
        if(i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(20px)',
            ease: 'none'
          });
        }
      });
      
      // Animate wave on card 3 specifically
      gsap.to('.protocol-wave', {
        scrollTrigger: {
          trigger: '.protocol-wave',
          start: 'top 80%',
        },
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.out',
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div id="process" ref={containerRef} className="relative w-full bg-obsidian">
      {steps.map((step, i) => (
        <section 
          key={i} 
          className="protocol-card min-h-screen md:h-[100dvh] w-full flex items-center justify-center p-4 md:p-6 bg-obsidian"
          style={{ zIndex: i }}
        >
          <div className="w-full max-w-5xl mx-auto glass-panel border border-slate/30 rounded-[2rem] md:rounded-[3rem] min-h-[70vh] md:h-[80vh] flex flex-col md:flex-row items-center justify-between p-8 md:p-20 shadow-2xl relative overflow-hidden bg-obsidian/90">
            
            <div className="flex-1 flex flex-col items-start gap-6 relative z-10">
              <span className="font-mono text-5xl md:text-7xl font-bold text-slate/20 absolute -top-10 -left-6 uppercase pointer-events-none select-none">
                Step {step.num}
              </span>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-champagne/30 flex items-center justify-center font-mono text-champagne">
                  {step.num}
                </div>
              </div>
              <h2 className="text-2xl md:text-5xl font-sans font-bold text-ivory tracking-tight max-w-md">
                {step.title}
              </h2>
              <p className="font-sans text-slate-400 text-base md:text-lg max-w-md">
                {step.desc}
              </p>
            </div>
            
            <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 relative z-10 w-full h-full max-h-[300px]">
              <step.SVG />
            </div>

          </div>
        </section>
      ))}
      <div className="h-20 md:h-0" /> {/* Mobile final buffer to prevent footer overlay jump */}
    </div>
  );
}
