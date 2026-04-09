import Contact from '../components/Contact';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SayHello() {
  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 relative overflow-hidden">
      {/* Back to Home Link */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 mb-8 md:mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-champagne/60 hover:text-champagne font-mono text-xs uppercase tracking-[0.2em] transition-colors"
        >
          <ArrowLeft size={16} /> Back to perspective
        </Link>
      </div>

      {/* The main form section */}
      <Contact />

      {/* Decorative Branding */}
      <div className="absolute bottom-12 left-12 opacity-5 pointer-events-none select-none hidden lg:block">
        <h1 className="text-[12vw] font-drama whitespace-nowrap leading-none">Elias Habib</h1>
      </div>
    </div>
  );
}
