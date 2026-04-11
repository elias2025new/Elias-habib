import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SocialLinks from './components/SocialLinks';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SayHello from './pages/SayHello';
import Work from './pages/Work';

function App() {
  return (
    <div className="w-full min-h-screen bg-obsidian text-ivory font-sans">
      <ScrollToTop />
      <Navbar />
      <SocialLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/say-hello" element={<SayHello />} />
        {/* Fallback to Home if path doesn't match */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
