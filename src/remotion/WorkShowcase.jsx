import { spring, useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';

const projects = [
  "Website for 8+ companies",
  "SRM (Spa reservation system)",
  "Digital menu (QR codes)",
  "Telegram Mini Apps"
];

// Architectural SVG Logos (Theme: The Box)
const BoxLogo = ({ index, color = "#C9A84C" }) => {
  if (index === 0) { // Moving Company: Isometric Box with Motion
    return (
      <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
        <path d="M32 10L54 22V42L32 54L10 42V22L32 10Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M32 10V32M32 32L54 22M32 32L10 22" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 28H14M2 34H12M4 40H10" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      </svg>
    );
  }
  if (index === 1) { // Spa: Box containing a Drop
    return (
      <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="12" width="40" height="40" rx="4" stroke={color} strokeWidth="1.5"/>
        <path d="M32 24C32 24 24 34 24 38C24 42 27.5 45 32 45C36.5 45 40 42 40 38C40 34 32 24 32 24Z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1"/>
      </svg>
    );
  }
  if (index === 2) { // Digital Menu: Box with QR Pattern
    return (
      <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="12" width="40" height="40" stroke={color} strokeWidth="1.5"/>
        <rect x="20" y="20" width="8" height="8" fill={color}/>
        <rect x="36" y="20" width="8" height="8" fill={color}/>
        <rect x="20" y="36" width="8" height="8" fill={color}/>
        <rect x="36" y="36" width="4" height="4" fill={color} opacity="0.6"/>
      </svg>
    );
  }
  if (index === 3) { // Telegram Bot: Box with Digital Signal
    return (
      <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
        <path d="M12 20V52H52V20H32" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 16L32 12L54 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="34" r="2" fill={color}/>
        <circle cx="40" cy="34" r="2" fill={color}/>
        <path d="M28 42H36" stroke={color} strokeWidth="1" strokeLinecap="round"/>
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

  const targetY = 250 + index * 120;
  
  const opacity = interpolate(relativeFrame, [0, 15], [0, 1]);
  const translateX = interpolate(pulse, [0, 1], [-40, 0]);
  const scale = interpolate(pulse, [0, 1], [1.1, 1]);
  const brightness = interpolate(pulse, [0, 0.5, 1], [1, 2, 1]);

  return (
    <div 
      className="absolute flex items-center justify-start gap-12 w-full px-20"
      style={{ 
        opacity,
        top: targetY,
        transform: `translateY(-50%) translateX(${translateX}px) scale(${scale})`,
        filter: `brightness(${brightness})`,
        left: 0,
        zIndex: relativeFrame < 40 ? 50 : 10
      }}
    >
      <span className="text-[#C9A84C] font-mono text-3xl opacity-30">0{index + 1}</span>
      <div className="flex flex-col">
        <h3 className="text-5xl font-sans font-black tracking-tight text-[#FAF8F5] leading-tight max-w-[800px] uppercase">
          {title}
        </h3>
        <div className="h-[1px] w-24 bg-[#C9A84C]/40 mt-2" />
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

  const translateY = interpolate(pop, [0, 1], [120, 0]); // From below screen to tray
  const opacity = interpolate(pop, [0, 0.5], [0, 1]);

  return (
    <div 
      className="flex flex-col items-center gap-2"
      style={{ 
        opacity, 
        transform: `translateY(${translateY}px)`
      }}
    >
      <BoxLogo index={index} />
      <span className="text-[10px] font-mono text-[#C9A84C]/50 uppercase tracking-[0.2em]">
        OBJ-0{index + 1}
      </span>
    </div>
  );
};

export const WorkShowcase = () => {
  const frame = useCurrentFrame();
  
  const introOpacity = interpolate(frame, [0, 20, 50, 60], [0, 1, 1, 0]);
  const introScale = interpolate(frame, [0, 60], [0.95, 1.05]);

  return (
    <AbsoluteFill className="bg-transparent overflow-hidden">
      {/* Intro Layer: "My work" */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{ 
          opacity: introOpacity,
          transform: `scale(${introScale})`
        }}
      >
        <h2 className="text-8xl font-drama italic text-[#C9A84C]">My work</h2>
      </div>

      {/* Persistent Projects List */}
      <AbsoluteFill className="z-10">
        {projects.map((project, i) => (
          <ProjectItem 
            key={project} 
            title={project} 
            index={i} 
            startTime={60 + i * 65}
          />
        ))}
      </AbsoluteFill>

      {/* Logo Tray at the Bottom */}
      <div className="absolute bottom-16 left-0 w-full flex justify-center items-end gap-20 z-10">
        {projects.map((_, i) => (
          <TrayLogo 
            key={`logo-${i}`} 
            index={i} 
            startTime={100 + i * 65} // Logos pop slightly after text
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
