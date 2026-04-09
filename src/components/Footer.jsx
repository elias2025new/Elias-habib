import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050508] pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] relative overflow-hidden flex justify-center border-t border-slate/10">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;utf8,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%23FAF8F5\'/%3E%3C/svg%3E')] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />
      
      <div className="w-full max-w-7xl relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div className="flex flex-col gap-8 max-w-sm">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-sans font-bold text-ivory tracking-tight">Elias Habib</h2>
            <p className="font-drama italic text-xl text-champagne">Freelance Fullstack Developer.</p>
          </div>
          <p className="text-sm font-sans text-slate-400 leading-relaxed">
            Architecting high-performance digital experiences. Moving beyond generic templates into precision engineering.
          </p>
          <Link to="/say-hello" className="inline-block mt-4 w-fit px-8 py-4 bg-champagne text-obsidian rounded-full font-sans font-bold hover:scale-105 transition-transform duration-300">
            Say hello
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-semibold text-ivory uppercase tracking-widest text-xs">Navigation</h3>
            {['Expertise', 'Process', 'Projects'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-sans text-sm text-slate-400 hover:text-champagne transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-semibold text-ivory uppercase tracking-widest text-xs">Socials</h3>
            {['GitHub', 'LinkedIn', 'Twitter'].map(item => (
              <a key={item} href="#" className="font-sans text-sm text-slate-400 hover:text-champagne transition-colors">{item}</a>
            ))}
          </div>
        </div>
        
      </div>
      
      <div className="absolute bottom-6 left-6 md:left-16 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">System Operational</span>
      </div>
      
      <div className="absolute bottom-6 right-6 md:right-16 font-mono text-[10px] text-slate-500 tracking-widest uppercase">
        © {new Date().getFullYear()} Elias Habib. All Rights Reserved.
      </div>
    </footer>
  );
}
