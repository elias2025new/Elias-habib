import { Composition } from 'remotion';
import { CinematicHero } from './CinematicHero';
import { WorkShowcase } from './WorkShowcase';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="CinematicHero"
        component={CinematicHero}
        durationInFrames={300} // 10 seconds at 30 fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Digital Precision.",
          subtitle: "Elias Habib — System Architecture",
        }}
      />
      <Composition
        id="WorkShowcase"
        component={WorkShowcase}
        durationInFrames={360} // 12 seconds at 30 fps
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
