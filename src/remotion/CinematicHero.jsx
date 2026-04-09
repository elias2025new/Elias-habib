import { spring, useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';

export const CinematicHero = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation constants
  const entrance = spring({
    frame: frame,
    fps,
    config: { stiffness: 60 },
  });

  const textEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12 },
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 300], [1.1, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-[#0D0D12] text-[#FAF8F5] overflow-hidden font-sans">
      {/* Background massive text */}
      <div 
        style={{ opacity: 0.2 * entrance }}
        className="absolute inset-0 flex flex-col justify-center items-center select-none z-0"
      >
        <h1 className="text-[180px] leading-none font-bold text-[#C9A84C] uppercase -tracking-[0.05em] whitespace-nowrap">
          FULLSTACK
        </h1>
        <h1 className="text-[180px] leading-none italic text-[#C9A84C] uppercase opacity-70 ml-20" style={{ fontFamily: 'Playfair Display' }}>
          ENGINEER
        </h1>
      </div>

      {/* Main Content */}
      <div className="absolute bottom-32 left-32 z-20">
        <p 
          className="text-[#C9A84C] font-semibold tracking-widest text-2xl uppercase mb-4"
          style={{ 
            opacity: textEntrance,
            transform: `translateY(${interpolate(textEntrance, [0, 1], [20, 0])}px)`
          }}
        >
          {subtitle}
        </p>
        <h2 
          className="text-9xl font-bold tracking-tight mb-4"
          style={{ 
            opacity: textEntrance,
            transform: `translateY(${interpolate(textEntrance, [0, 1], [40, 0])}px)`
          }}
        >
          Digital <span className="italic font-normal text-[#C9A84C]" style={{ fontFamily: 'Playfair Display' }}>Precision.</span>
        </h2>
      </div>

      {/* VFX: Noise / Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/40 to-transparent z-10" />
      
      {/* Visual Texture: Noise overlay mimicking the landing page */}
      <svg className="fixed top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none z-50">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </AbsoluteFill>
  );
};
