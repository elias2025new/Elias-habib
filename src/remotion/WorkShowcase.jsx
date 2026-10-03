import { spring, useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';

const projects = [
  "Habesha Movers Web App",
  "Dermo Restaurant QR Menu",
  "Google SEO & Search Engine",
  "Serenify Spa Reservation (SRM)",
  "Telegram Mini Apps Framework"
];

// Architectural SVG Logos (Theme: The Box)
const BoxLogo = ({ index, color = "#C9A84C" }) => {
  if (index === 0) { // Habesha Movers: Isometric Logistics Box with Motion
    return (
      <svg width="84" height="84" viewBox="0 0 64 64" fill="none">
        <path d="M32 10L54 22V42L32 54L10 42V22L32 10Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M32 10V32M32 32L54 22M32 32L10 22" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 28H14M2 34H12M4 40H10" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      </svg>
    );
  }
  if (index === 1) { // Dermo QR Menu: Box with QR Matrix Pattern
    return (
      <svg width="84" height="84" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="12" width="40" height="40" stroke={color} strokeWidth="1.5"/>
        <rect x="18" y="18" width="8" height="8" fill={color}/>
        <rect x="38" y="18" width="8" height="8" fill={color}/>
        <rect x="18" y="38" width="8" height="8" fill={color}/>
        <rect x="36" y="36" width="6" height="6" fill={color} opacity="0.7"/>
      </svg>
    );
  }
  if (index === 2) { // Google SEO Engine: Box with Surging Growth Analytics
    return (
      <svg width="84" height="84" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="12" width="40" height="40" rx="4" stroke={color} strokeWidth="1.5"/>
        <path d="M18 42L28 32L36 38L46 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 22H46V28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="32" r="1.5" fill={color}/>
        <circle cx="36" cy="38" r="1.5" fill={color}/>
      </svg>
    );
  }
  if (index === 3) { // Serenify SRM: Spa Droplet & Calendar Node
    return (
      <svg width="84" height="84" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="12" width="40" height="40" rx="4" stroke={color} strokeWidth="1.5"/>
        <path d="M32 22C32 22 23 33 23 38C23 42.5 27 46 32 46C37 46 41 42.5 41 38C41 33 32 22 32 22Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2"/>
        <circle cx="32" cy="38" r="2" fill={color}/>
      </svg>
    );
  }
  if (index === 4) { // Telegram Mini Apps: Messenger WebApp Signal
    return (
      <svg width="84" height="84" viewBox="0 0 64 64" fill="none">
        <path d="M12 20V52H52V20H32" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 16L32 12L54 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="34" r="2" fill={color}/>
        <circle cx="40" cy="34" r="2" fill={color}/>
        <path d="M26 42H38" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  return null;
};

const ProjectItem = ({ title, index, startTime }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startTime;
  
  if (relativeFrame < 0) return null;

  const pulse = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const targetY = 220 + index * 115;
  
  const opacity = interpolate(relativeFrame, [0, 15], [0, 1]);
  const translateX = interpolate(pulse, [0, 1], [-40, 0]);
  const scale = interpolate(pulse, [0, 1], [1.08, 1]);
  const brightness = interpolate(pulse, [0, 0.5, 1], [1, 2, 1]);

  return (
    <div 
      className="absolute flex items-center justify-start gap-10 w-full px-16"
      style={{ 
        opacity,
        top: targetY,
        transform: `translateY(-50%) translateX(${translateX}px) scale(${scale})`,
        filter: `brightness(${brightness})`,
        left: 0,
        zIndex: relativeFrame < 40 ? 50 : 10
      }}
    >
      <span className="text-[#C9A84C] font-mono text-2xl opacity-40">0{index + 1}</span>
      <div className="flex flex-col">
        <h3 className="text-4xl font-sans font-black tracking-tight text-[#FAF8F5] leading-tight max-w-[850px] uppercase">
          {title}
        </h3>
        <div className="h-[1px] w-20 bg-[#C9A84C]/40 mt-1.5" />
      </div>
    </div>
  );
};

const TrayLogo = ({ index, startTime }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startTime;

  if (relativeFrame < 0) return null;

  const pop = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.8 },
  });

  const translateY = interpolate(pop, [0, 1], [100, 0]);
  const opacity = interpolate(pop, [0, 0.5], [0, 1]);

  return (
    <div 
      className="flex flex-col items-center gap-1.5"
      style={{ 
        opacity, 
        transform: `translateY(${translateY}px)`
      }}
    >
      <BoxLogo index={index} />
      <span className="text-[9px] font-mono text-[#C9A84C]/60 uppercase tracking-[0.2em]">
        SYS-0{index + 1}
      </span>
    </div>
  );
};

export const WorkShowcase = () => {
  const frame = useCurrentFrame();
  
  const introOpacity = interpolate(frame, [0, 18, 42, 52], [0, 1, 1, 0]);
  const introScale = interpolate(frame, [0, 52], [0.95, 1.05]);

  return (
    <AbsoluteFill className="bg-transparent overflow-hidden">
      {/* Intro Layer: "Verified Work" */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{ 
          opacity: introOpacity,
          transform: `scale(${introScale})`
        }}
      >
        <h2 className="text-7xl font-drama italic text-[#C9A84C]">Verified Systems</h2>
      </div>

      {/* Persistent Projects List */}
      <AbsoluteFill className="z-10">
        {projects.map((project, i) => (
          <ProjectItem 
            key={project} 
            title={project} 
            index={i} 
            startTime={52 + i * 54}
          />
        ))}
      </AbsoluteFill>

      {/* Logo Tray at the Bottom */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center items-end gap-10 z-10 px-6">
        {projects.map((_, i) => (
          <TrayLogo 
            key={`logo-${i}`} 
            index={i} 
            startTime={80 + i * 54}
          />
        ))}
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent opacity-60" />
      
      {/* Visual Texture */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </AbsoluteFill>
  );
};
