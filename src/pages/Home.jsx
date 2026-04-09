import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      {/* Small CTA before Footer instead of the full form */}
      <section className="py-20 bg-obsidian text-center border-t border-ivory/5">
        <h2 className="text-3xl font-sans font-bold text-ivory mb-8">Ready to start your next project?</h2>
        <Link 
          to="/say-hello" 
          className="inline-flex items-center justify-center px-10 h-14 rounded-full bg-champagne text-obsidian font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-300"
        >
          Get in touch
        </Link>
      </section>
      <Footer />
    </>
  );
}
