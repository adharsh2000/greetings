import { useState, useEffect, useRef } from 'react';

export function useAudio(src) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!src) return;
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.muted = false;

    audioRef.current.addEventListener('canplaythrough', () => setIsReady(true));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => { });
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (val) => {
    const v = parseFloat(val);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return { isMuted, toggleMute, volume, handleVolumeChange, isReady };
}
