import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Hero from './components/Hero';
import WishesSection from './components/WishesSection';
// import QuotesSection from './components/QuotesSection';
import GiftSection from './components/GiftSection';
import Footer from './components/Footer';
import { useAudio } from './hooks/useAudio';
import song from '/Kanikanum-Neram.mp3';

// Optional: Drop your own Kerala instrumental MP3 at /public/music.mp3
// A royalty-free sample is referenced here — replace with your own file for production.
const MUSIC_SRC = song;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isMuted, toggleMute, volume, handleVolumeChange } = useAudio(MUSIC_SRC);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#0D0500' }}>
      {/* Force loader to never occupy document flow */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: isLoading ? 'auto' : 'none' }}>
        <Loader isLoading={isLoading} />
      </div>
      <main>
        <Hero isMuted={isMuted} toggleMute={toggleMute} />
        <WishesSection />
        {/* <QuotesSection /> */}
        <GiftSection />
      </main>
      <Footer />
    </div>
  );
}
