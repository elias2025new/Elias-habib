import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Box, Columns, Database, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ShufflerCard = () => {
  const [items, setItems] = useState(['Architecture Map', 'API Gateway Route', 'Database Schema']);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const copy = [...prev];
        copy.unshift(copy.pop());
        return copy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center pt-8">
      {items.map((item, idx) => {
        const isTop = idx === 0;
        return (
          <div
            key={item}
            className="absolute p-4 rounded-xl border border-slate/30 shadow-lg backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-3/4 flex items-center gap-3"
            style={{
              transform: `translateY(${idx * 20}px) scale(${1 - idx * 0.05})`,
              zIndex: 10 - idx,
              backgroundColor: isTop ? '#C9A84C' : '#1A1A24',
              color: isTop ? '#0D0D12' : '#FAF8F5',
              opacity: 1 - idx * 0.3
            }}
          >
            {isTop ? <Database size={18} /> : <Box size={18} opacity={0.5} />}
            <span className="font-mono text-xs">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState('');
  const fullText = "const Frontend = new PixelPerfect({ framework: 'React', aesthetic: 'Premium', responsive: true });";
  
  useEffect(() => {
    let currentText = '';
    let i = 0;
    let timerId;
    let timeoutId;

    const startTyping = () => {
      timerId = setInterval(() => {
        currentText += fullText[i];
        setText(currentText);
        i++;
        
        if (i === fullText.length) {
          clearInterval(timerId);
          timeoutId = setTimeout(() => {
            currentText = '';
            setText('');
            i = 0;
            startTyping();
          }, 3000); // Wait 3s before looping
        }
      }, 50);
    };

    startTyping();

    return () => {
      clearInterval(timerId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="h-48 w-full bg-[#111118] border border-slate/30 rounded-xl p-4 flex flex-col mt-4">
      <div className="flex items-center gap-2 mb-4 border-b border-slate/20 pb-2">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="ml-auto font-mono text-[10px] text-slate-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse"></span> LIVE FEED
        </span>
      </div>
      <div className="font-mono text-xs text-green-400 leading-relaxed overflow-hidden">
        {text}<span className="inline-block w-1.5 h-3 bg-champagne ml-1 animate-pulse" />
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const cursorRef = useRef(null);
  const cellRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set(cursorRef.current, { x: 0, y: 0 })
        .to(cursorRef.current, { x: 80, y: 40, duration: 1.5, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, onStart: () => setActive(true) })
        .to(cursorRef.current, { x: 160, y: 80, duration: 1, ease: 'power2.inOut', delay: 0.5, onStart: () => setActive(false) })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-48 w-full mt-4 relative bg-[#111118] border border-slate/30 rounded-xl p-4 overflow-hidden flex flex-col items-center justify-center">
      <div className="grid grid-cols-7 gap-1 w-full max-w-[200px] mb-2 text-center text-[10px] font-mono text-slate-500">
        {['S','M','T','W','T','F','S'].map(d => <span key={d}>{d}</span>)}
        {Array.from({length: 14}).map((_, i) => (
          <div 
            key={i} 
            ref={i === 9 ? cellRef : null}
            className={`h-4 rounded-sm transition-colors duration-300 ${i === 9 && active ? 'bg-champagne' : 'bg-slate/20'}`}
          />
        ))}
      </div>
      <button className="mt-4 px-3 py-1 bg-slate/20 rounded font-mono text-[10px] text-ivory">SAVE NODE</button>
      
      <div ref={cursorRef} className="absolute top-0 left-0 text-white z-10 pointer-events-none drop-shadow-md">
        <MousePointer2 size={24} className="fill-ivory stroke-obsidian stroke-2" />
      </div>
    </div>
  );
};

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={containerRef} className="py-16 md:py-24 px-6 md:px-16 w-full max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-ivory tracking-tight mb-4">
          Interactive <span className="font-drama italic text-champagne font-normal">Functional Artifacts.</span>
        </h2>
        <p className="text-slate-400 font-sans max-w-xl">
          Moving beyond static design into dynamic, functional elements that serve a purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="feature-card glass-panel rounded-[2rem] p-8 flex flex-col shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Database size={64} />
          </div>
          <h3 className="font-sans font-bold text-xl text-ivory mb-2 z-10">End-to-End System Design</h3>
          <p className="text-sm font-sans text-slate-400 z-10">Robust architectures from database schema to API gateways, built for scale and seamless data flow.</p>
          <ShufflerCard />
        </div>

        {/* Card 2 */}
        <div className="feature-card glass-panel rounded-[2rem] p-8 flex flex-col shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Columns size={64} />
          </div>
          <h3 className="font-sans font-bold text-xl text-ivory mb-2 z-10">Pixel-Perfect Frontend</h3>
          <p className="text-sm font-sans text-slate-400 z-10">Cinematic user interfaces tailored to individual brand identities. No generic templates allowed.</p>
          <TypewriterCard />
        </div>

        {/* Card 3 */}
        <div className="feature-card glass-panel rounded-[2rem] p-8 flex flex-col shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Box size={64} />
          </div>
          <h3 className="font-sans font-bold text-xl text-ivory mb-2 z-10">Scalable Backend</h3>
          <p className="text-sm font-sans text-slate-400 z-10">High-performance server environments engineered to handle robust processing and strict async schedules.</p>
          <SchedulerCard />
        </div>

      </div>
    </section>
  );
}
