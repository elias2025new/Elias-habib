import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.phil-line');
      
      lines.forEach((line) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out'
        });
      });
      
      gsap.to('.phil-bg', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        ease: 'none'
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-40 overflow-hidden bg-[#0A0A0F] flex items-center justify-center">
      {/* Background organic texture layer matching Midnight Luxe mood */}
      <div 
        className="phil-bg absolute -inset-20 opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549488344-c01bbcb25ab3?q=80&w=2670&auto=format&fit=crop")' }}
      />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center md:text-left flex flex-col md:items-center gap-10">
        
        <p className="phil-line text-lg md:text-3xl font-sans text-slate-400 font-light tracking-wide max-w-2xl">
          Most web development focuses on: <span className="font-semibold text-ivory/80">generic templates and quick fixes.</span>
        </p>
        
        <h2 className="phil-line text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-ivory tracking-tight leading-none">
          I build with: <br/>
          <span className="font-drama italic text-champagne block mt-2 text-shadow-glow">Precision Architecture.</span>
        </h2>
        
      </div>
    </section>
  );
}
