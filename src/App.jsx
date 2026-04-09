import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SayHello from './pages/SayHello';

function App() {
  return (
    <div className="w-full min-h-screen bg-obsidian text-ivory font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/say-hello" element={<SayHello />} />
        {/* Fallback to Home if path doesn't match */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
