import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Player } from '@remotion/player';
import { WorkShowcase } from '../remotion/WorkShowcase';

import eliasImg from '../assets/elias.png';

export default function Hero() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-bg-text', { y: 100, opacity: 0, duration: 1.5, stagger: 0.2 })
        .from('.hero-image', { scale: 1.1, opacity: 0, duration: 1.2, ease: 'power2.out' }, '-=1.0')
        .from('.hero-fg-text', { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, '-=0.5')
        .from('.hero-description', { y: 20, opacity: 0, duration: 1 }, '-=0.8')
        .fromTo('.hero-player-container', 
          { opacity: 0 }, 
          { 
            opacity: 1, 
            duration: 1, 
            ease: 'power2.out',
            onComplete: () => {
              if (playerRef.current) {
                playerRef.current.play();
              }
            }
          }, 
          '+=0.2'
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Heavy gradient overlay at the bottom matching 'Midnight Luxe' */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent z-10 pointer-events-none" />

      {/* Massive Background Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-30 select-none z-0 overflow-hidden mix-blend-overlay">
        <h1 className="hero-bg-text text-[clamp(4rem,15vw,12rem)] leading-none font-sans font-bold text-champagne uppercase -tracking-[0.05em] whitespace-nowrap">
          FULLSTACK
        </h1>
        <h1 className="hero-bg-text text-[clamp(4rem,15vw,12rem)] leading-none font-drama italic text-champagne uppercase opacity-70 ml-10 md:ml-20 whitespace-nowrap">
          ENGINEER
        </h1>
      </div>

      {/* Centered Image mimicking Sultan Karimi layout */}
      <div className="relative z-5 w-full flex justify-center items-end mt-10 md:mt-20">
        <div className="relative h-[55vh] md:h-[75vh] w-fit">
          <img 
            src={eliasImg} 
            alt="Elias Habib" 
            className="hero-image h-full w-auto object-contain grayscale drop-shadow-2xl brightness-90 contrast-125 mask-image-bottom pb-4 rounded-[2.5rem]"
            style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
          />
        </div>
      </div>

      {/* Dynamic Remotion Player - Right Aligned */}
      <div className="hero-player-container absolute right-0 top-1/2 -translate-y-1/2 z-30 w-full max-w-[320px] lg:max-w-[380px] aspect-square overflow-hidden rounded-[2rem] border border-champagne/20 shadow-2xl mr-12 hidden md:block group hover:scale-[1.02] transition-transform duration-500 bg-obsidian/40 backdrop-blur-md">
         <Player
            ref={playerRef}
            component={WorkShowcase}
            durationInFrames={360}
            fps={30}
            compositionWidth={1080}
            compositionHeight={1080}
            style={{
              width: '100%',
              height: '100%',
            }}
            controls={false}
            loop
          />
          {/* Subtle overlay for the "Digital Instrument" feel */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-[2rem] z-40"></div>
          <div className="absolute top-4 right-6 z-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-tighter text-ivory/50 uppercase">Live Engine</span>
          </div>
      </div>

      {/* Foreground Content */}
      <div className="absolute bottom-6 md:bottom-20 z-20 w-full px-6 md:px-16 mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-6">
        <div className="max-w-xl">
          <p className="hero-fg-text font-sans text-champagne font-semibold tracking-widest text-xs md:text-sm uppercase mb-2">
            Elias Habib — System Architecture
          </p>
          <h2 className="hero-fg-text text-3xl md:text-5xl lg:text-7xl font-sans font-bold text-ivory tracking-tight mb-2">
            Digital <span className="font-drama italic font-normal text-champagne">Precision.</span>
          </h2>
          <p className="hero-description text-slate-300 font-sans text-xs md:text-base leading-relaxed max-w-sm md:max-w-md">
            Between creativity and strategy lies the space where I architect digital experiences. As a freelance fullstack web developer, I build high-performance, pixel-perfect platforms that speak with clarity and convert with purpose.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end text-left md:text-right gap-1 md:gap-2 opacity-80 pt-4 md:pt-0 border-t border-ivory/10 md:border-none w-full md:w-auto mt-4 md:mt-0">
          <span className="hero-fg-text mt-4 md:mt-0 font-mono text-[10px] md:text-xs tracking-widest text-ivory flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse block"></span>
            AVAILABLE FOR PROJECTS
          </span>
          <span className="hero-fg-text font-sans text-[10px] md:text-xs text-slate-400 max-w-[200px]">
            Based worldwide. Architecting on modern stacks.
          </span>
        </div>
      </div>
    </section>
  );
}
