import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import MUSIC_SRC from '/Kanikanum-Neram.mp3';

// ─── Kanikkonna petals ────────────────────────────────────────────────────────
const PETALS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 96 + 2}%`,
  size: Math.random() * 8 + 7,
  delay: Math.random() * 10,
  duration: Math.random() * 5 + 7,
  xOffset: Math.random() * 100 - 50,
}));

// ─── Thookkuvilakku SVG ───────────────────────────────────────────────────────
function Thookkuvilakku({ color = '#fbbf24' }) {
  return (
    <svg
      width="38"
      height="110"
      viewBox="0 0 38 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
    >
      <line x1="19" y1="0" x2="19" y2="24" stroke={color} strokeWidth="1.5" />
      <ellipse cx="19" cy="25" rx="10" ry="3" fill={color} opacity="0.9" />
      <path d="M9 25 L7 40 Q19 47 31 40 L29 25 Z" fill={color} opacity="0.75" />
      <ellipse cx="19" cy="40" rx="13" ry="4.5" fill={color} opacity="0.85" />
      <ellipse cx="19" cy="54" rx="10" ry="13" fill={color} opacity="0.7" />
      <ellipse cx="19" cy="54" rx="7.5" ry="10" fill={color} opacity="0.15" />
      <line x1="19" y1="67" x2="19" y2="110" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <g style={{ transformOrigin: '19px 36px', animation: 'flamePulse 1.1s ease-in-out infinite' }}>
        <path d="M19 37 Q23 28 19 21 Q15 28 19 37Z" fill="#fde68a" />
        <path d="M19 35 Q21 29 19 24 Q17 29 19 35Z" fill="white" opacity="0.75" />
      </g>
      <style>{`
        @keyframes flamePulse {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
          50%       { transform: scaleY(1.15) scaleX(0.9); opacity: 0.85; }
        }
      `}</style>
    </svg>
  );
}

// ─── Door Panel ───────────────────────────────────────────────────────────────
function DoorPanel({ side, isOpen }) {
  const isLeft = side === 'left';
  const variants = {
    closed: { rotateY: 0, x: 0 },
    open: {
      rotateY: isLeft ? -115 : 115,
      x: isLeft ? '-55%' : '55%',
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 2.4, ease: [0.45, 0, 0.25, 1] }}
      style={{
        width: '50%',
        height: '100%',
        position: 'relative',
        transformOrigin: isLeft ? 'left center' : 'right center',
        transformStyle: 'preserve-3d',
        perspective: '1200px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isLeft
            ? `repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 2px, transparent 2px, transparent 28px), linear-gradient(180deg, #3d2208 0%, #2a1605 40%, #3d2208 70%, #2a1605 100%)`
            : `repeating-linear-gradient(90deg, transparent 0px, transparent 26px, rgba(255,255,255,0.025) 26px, rgba(255,255,255,0.025) 28px), linear-gradient(180deg, #3d2208 0%, #2a1605 40%, #3d2208 70%, #2a1605 100%)`,
          borderRight: isLeft ? '2px solid rgba(218,165,32,0.3)' : 'none',
          borderLeft: !isLeft ? '2px solid rgba(218,165,32,0.3)' : 'none',
        }}
      />
      {[
        { top: '11%', height: '22%' },
        { top: '37%', height: '36%' },
        { bottom: '7%', height: '11%' },
      ].map((style, i) => (
        <div key={i} style={{ position: 'absolute', left: 14, right: 14, border: '1px solid rgba(218,165,32,0.25)', borderRadius: 4, ...style }} />
      ))}
      <div style={{ position: 'absolute', top: '10%', [isLeft ? 'right' : 'left']: 10, zIndex: 5 }}>
        <Thookkuvilakku color="#fbbf24" />
      </div>
      <div style={{ position: 'absolute', top: '50%', [isLeft ? 'right' : 'left']: 14, transform: 'translateY(-50%)', width: 14, height: 14, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #fde68a, #b45309)', border: '1px solid #92400e', boxShadow: '0 0 6px rgba(251,191,36,0.4)' }} />
    </motion.div>
  );
}

function ArchDecor() {
  return (
    <svg style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 30, pointerEvents: 'none' }} width="340" height="60" viewBox="0 0 340 60" fill="none">
      <path d="M0 60 Q170 -10 340 60" stroke="rgba(218,165,32,0.35)" strokeWidth="1.5" fill="none" />
      <circle cx="170" cy="6" r="3" fill="rgba(251,191,36,0.5)" />
    </svg>
  );
}

// ─── Hero Component ───────────────────────────────────────────────────────────
export default function Hero({ isMuted, toggleMute }) {
  const containerRef = useRef(null);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [petalsActive, setPetalsActive] = useState(false);
  const { volume, handleVolumeChange } = useAudio(MUSIC_SRC);

  const handleOpen = () => {
    if (doorsOpen) return;
    toggleMute(true);
    setDoorsOpen(true);
    setTimeout(() => setPetalsActive(true), 800);
  };

  return (
    <section
      ref={containerRef}
      onClick={handleOpen}
      className="relative h-screen w-full flex flex-col items-center justify-end overflow-hidden bg-black"
      style={{ cursor: doorsOpen ? 'default' : 'pointer' }}
    >
      {/* ── Background Switcher ── */}
      <div className="absolute inset-0 z-0">
        {/* Mobile View Image */}
        <img
          fetchPriority='high'
          src="/mobile-image-2.webp"
          alt="Vishu Kani Mobile"
          className="block sm:hidden absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Web/Desktop View Image */}
        <img
          fetchPriority='high'
          src="/desktop-image-2.webp"
          alt="Vishu Kani Desktop"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      {/* ── Petals ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {PETALS.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-[-2%] text-yellow-400"
            style={{ left: petal.left, fontSize: petal.size, opacity: petalsActive ? 0.65 : 0 }}
            animate={petalsActive ? { y: ['0vh', '105vh'], x: [0, petal.xOffset], rotate: [0, 720] } : {}}
            transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: 'linear' }}
          >
            ✿
          </motion.div>
        ))}
      </div>

      {/* ── Doors ── */}
      <div className="absolute inset-0 z-40 pointer-events-none" style={{ perspective: '1200px', display: 'flex', overflow: 'hidden' }}>
        <ArchDecor />
        <DoorPanel side="left" isOpen={doorsOpen} />
        <DoorPanel side="right" isOpen={doorsOpen} />
      </div>

      {/* ── UI Elements ── */}
      <motion.div className="absolute z-50 bottom-25 left-1/2 -translate-x-1/2 text-yellow-400/60 text-xs tracking-widest pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: doorsOpen ? 0 : 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
        ✦ &nbsp; tap to open &nbsp; ✦
      </motion.div>

      <motion.button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="absolute top-3 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-yellow-500/30 bg-black/40 text-yellow-400/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </motion.button>

      {/* ── Text Content ── */}
      <motion.div
        // className="relative z-20 w-full max-w-7xl px-8 pb-12 sm:pb-24 flex flex-col items-center sm:items-start text-center sm:text-left"
        className="
    absolute z-20 w-full max-w-7xl px-6 sm:px-8

    /* 📱 MOBILE → TOP */
    top-10 left-1/2 -translate-x-1/2 text-center items-center

    /* 💻 DESKTOP → BOTTOM */
    sm:top-auto sm:left-1/2 sm:-translate-x-1/2
    sm:items-start sm:text-left

    flex flex-col
  "
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 40 }}
        transition={{ delay: doorsOpen ? 1 : 0, duration: 1, ease: "easeOut" }}
      >
        <h1
          className="text-5xl font-bold sm:text-7xl leading-tight mb-4"
          style={{
            fontFamily: "'Noto Serif Malayalam', serif",
            background: "linear-gradient(90deg, #fff7cc 0%, #fbbf24 30%, #f59e0b 60%, #fff7cc 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "goldShimmer 4s linear infinite",
          }}
        >
          വിഷു ആശംസകൾ
        </h1>
      </motion.div>

      <style>{`
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}

// import { useRef, useState, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { Volume2, VolumeX } from 'lucide-react';
// import { useAudio } from '../hooks/useAudio';
// import MUSIC_SRC from '/krishna-mp3.mp4';





// // ─── Kanikkonna petals ────────────────────────────────────────────────────────
// const PETALS = Array.from({ length: 32 }, (_, i) => ({
//   id: i,
//   left: `${Math.random() * 96 + 2}%`,
//   size: Math.random() * 8 + 7,
//   delay: Math.random() * 10,
//   duration: Math.random() * 5 + 7,
//   xOffset: Math.random() * 100 - 50,
// }));

// // ─── Thookkuvilakku SVG ───────────────────────────────────────────────────────
// function Thookkuvilakku({ color = '#fbbf24' }) {
//   return (
//     <svg
//       width="38"
//       height="110"
//       viewBox="0 0 38 110"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
//     >
//       {/* Hanging chain */}
//       <line x1="19" y1="0" x2="19" y2="24" stroke={color} strokeWidth="1.5" />

//       {/* Top cap */}
//       <ellipse cx="19" cy="25" rx="10" ry="3" fill={color} opacity="0.9" />

//       {/* Neck cone */}
//       <path d="M9 25 L7 40 Q19 47 31 40 L29 25 Z" fill={color} opacity="0.75" />

//       {/* Body band */}
//       <ellipse cx="19" cy="40" rx="13" ry="4.5" fill={color} opacity="0.85" />

//       {/* Oil cup / main body */}
//       <ellipse cx="19" cy="54" rx="10" ry="13" fill={color} opacity="0.7" />
//       <ellipse cx="19" cy="54" rx="7.5" ry="10" fill={color} opacity="0.15" />

//       {/* Drip tail */}
//       <line x1="19" y1="67" x2="19" y2="110" stroke={color} strokeWidth="1.2" opacity="0.35" />

//       {/* Flame */}
//       <g style={{ transformOrigin: '19px 36px', animation: 'flamePulse 1.1s ease-in-out infinite' }}>
//         <path d="M19 37 Q23 28 19 21 Q15 28 19 37Z" fill="#fde68a" />
//         <path d="M19 35 Q21 29 19 24 Q17 29 19 35Z" fill="white" opacity="0.75" />
//       </g>

//       <style>{`
//         @keyframes flamePulse {
//           0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
//           50%       { transform: scaleY(1.15) scaleX(0.9); opacity: 0.85; }
//         }
//       `}</style>
//     </svg>
//   );
// }

// // ─── Door Panel ───────────────────────────────────────────────────────────────
// function DoorPanel({ side, isOpen }) {
//   const isLeft = side === 'left';

//   const variants = {
//     closed: { rotateY: 0, x: 0 },
//     open: {
//       rotateY: isLeft ? -115 : 115,
//       x: isLeft ? '-55%' : '55%',
//     },
//   };

//   return (
//     <motion.div
//       variants={variants}
//       initial="closed"
//       animate={isOpen ? 'open' : 'closed'}
//       transition={{ duration: 2.4, ease: [0.45, 0, 0.25, 1] }}
//       style={{
//         width: '50%',
//         height: '100%',
//         position: 'relative',
//         transformOrigin: isLeft ? 'left center' : 'right center',
//         transformStyle: 'preserve-3d',
//         perspective: '1200px',
//       }}
//     >
//       {/* Wood grain */}
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           background: isLeft
//             ? `
//               repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 2px, transparent 2px, transparent 28px),
//               linear-gradient(180deg, #3d2208 0%, #2a1605 40%, #3d2208 70%, #2a1605 100%)
//             `
//             : `
//               repeating-linear-gradient(90deg, transparent 0px, transparent 26px, rgba(255,255,255,0.025) 26px, rgba(255,255,255,0.025) 28px),
//               linear-gradient(180deg, #3d2208 0%, #2a1605 40%, #3d2208 70%, #2a1605 100%)
//             `,
//           borderRight: isLeft ? '2px solid rgba(218,165,32,0.3)' : 'none',
//           borderLeft: !isLeft ? '2px solid rgba(218,165,32,0.3)' : 'none',
//         }}
//       />

//       {/* Carved panels */}
//       {[
//         { top: '11%', height: '22%' },
//         { top: '37%', height: '36%' },
//         { bottom: '7%', height: '11%' },
//       ].map((style, i) => (
//         <div
//           key={i}
//           style={{
//             position: 'absolute',
//             left: 14,
//             right: 14,
//             border: '1px solid rgba(218,165,32,0.25)',
//             borderRadius: 4,
//             ...style,
//           }}
//         />
//       ))}
//       {/* Inner panel insets */}
//       {[
//         { top: '12.5%', height: '19%' },
//         { top: '38.5%', height: '33%' },
//       ].map((style, i) => (
//         <div
//           key={`inner-${i}`}
//           style={{
//             position: 'absolute',
//             left: 24,
//             right: 24,
//             border: '1px solid rgba(218,165,32,0.12)',
//             borderRadius: 4,
//             ...style,
//           }}
//         />
//       ))}

//       {/* Thookkuvilakku */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '10%',
//           [isLeft ? 'right' : 'left']: 10,
//           zIndex: 5,
//         }}
//       >
//         <Thookkuvilakku color="#fbbf24" />
//       </div>

//       {/* Door knob */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '50%',
//           [isLeft ? 'right' : 'left']: 14,
//           transform: 'translateY(-50%)',
//           width: 14,
//           height: 14,
//           borderRadius: '50%',
//           background: 'radial-gradient(circle at 35% 35%, #fde68a, #b45309)',
//           border: '1px solid #92400e',
//           boxShadow: '0 0 6px rgba(251,191,36,0.4)',
//         }}
//       />
//     </motion.div>
//   );
// }

// // ─── Arch decoration ──────────────────────────────────────────────────────────
// function ArchDecor() {
//   return (
//     <svg
//       style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 30, pointerEvents: 'none' }}
//       width="340"
//       height="60"
//       viewBox="0 0 340 60"
//       fill="none"
//     >
//       <path d="M0 60 Q170 -10 340 60" stroke="rgba(218,165,32,0.35)" strokeWidth="1.5" fill="none" />
//       <path d="M20 60 Q170 5 320 60" stroke="rgba(218,165,32,0.15)" strokeWidth="1" fill="none" />
//       <circle cx="170" cy="6" r="3" fill="rgba(251,191,36,0.5)" />
//       <circle cx="140" cy="14" r="2" fill="rgba(251,191,36,0.3)" />
//       <circle cx="200" cy="14" r="2" fill="rgba(251,191,36,0.3)" />
//       <circle cx="110" cy="26" r="1.5" fill="rgba(251,191,36,0.2)" />
//       <circle cx="230" cy="26" r="1.5" fill="rgba(251,191,36,0.2)" />
//     </svg>
//   );
// }

// // ─── Hero ─────────────────────────────────────────────────────────────────────
// export default function Hero({ isMuted, toggleMute }) {
//   const containerRef = useRef(null);
//   const [doorsOpen, setDoorsOpen] = useState(false);
//   const [petalsActive, setPetalsActive] = useState(false);
//   const { volume, handleVolumeChange } = useAudio(MUSIC_SRC);

//   const handleOpen = () => {

//     if (doorsOpen) return;
//     toggleMute(true);
//     setDoorsOpen(true);
//     setTimeout(() => setPetalsActive(true), 800);
//   };

//   return (
//     <section
//       ref={containerRef}
//       onClick={handleOpen}
//       className="relative h-screen w-full flex flex-col items-center justify-end overflow-hidden bg-black"
//       style={{ cursor: doorsOpen ? 'default' : 'pointer' }}
//     >
//       {/* ── Background ── */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/Gemini_Generated_Image_ocavcyocavcyocav.png"
//           alt="Vishu Kani"
//           className="absolute inset-0 w-full h-full object-cover object-top"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
//       </div>

//       {/* ── Kanikkonna petals ── */}
//       <div className="absolute inset-0 z-10 pointer-events-none">
//         {PETALS.map((petal) => (
//           <motion.div
//             key={petal.id}
//             className="absolute top-[-2%] text-yellow-400"
//             style={{ left: petal.left, fontSize: petal.size, opacity: petalsActive ? 0.65 : 0 }}
//             animate={petalsActive ? { y: ['0vh', '105vh'], x: [0, petal.xOffset], rotate: [0, 720] } : {}}
//             transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: 'linear' }}
//           >
//             ✿
//           </motion.div>
//         ))}
//       </div>

//       {/* ── Temple doors ── */}
//       <div
//         className="absolute inset-0 z-40 pointer-events-none"
//         style={{ perspective: '1200px', display: 'flex', overflow: 'hidden' }}
//       >
//         <ArchDecor />
//         <DoorPanel side="left" isOpen={doorsOpen} />
//         <DoorPanel side="right" isOpen={doorsOpen} />
//       </div>

//       {/* ── Tap hint ── */}
//       <motion.div
//         className="absolute z-50 bottom-8 left-1/2 -translate-x-1/2 text-yellow-400/60 text-xs tracking-widest pointer-events-none"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: doorsOpen ? 0 : 1 }}
//         transition={{ delay: 1.2, duration: 0.8 }}
//       >
//         ✦ &nbsp; tap to open &nbsp; ✦
//       </motion.div>

//       {/* ── Mute button ── */}
//       <motion.button
//         onClick={(e) => { e.stopPropagation(); toggleMute(); }}
//         className="absolute top-5 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-yellow-500/30 bg-black/40 text-yellow-400/70 backdrop-blur-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 3 }}
//       >
//         {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
//       </motion.button>

//       {/* ── Content overlay ── */}
//       <motion.div
//         className="relative z-20 w-full max-w-7xl px-8 pb-16 sm:pb-24 flex flex-col items-center sm:items-start text-center sm:text-left"
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 60 }}
//         transition={{ delay: doorsOpen ? 2 : 0, duration: 1.4, ease: "easeOut" }}
//       >
//         {/* 🌼 Small label */}
//         {/* <p className="font-malayalam text-amber-400/70 text-[11px] sm:text-xs tracking-[0.5em] mb-3">
//           വിഷുക്കണി
//         </p> */}

//         {/* ✨ Main Malayalam Heading */}
//         <h1
//           className="text-4xl sm:text-7xl leading-tight mb-4"
//           style={{
//             fontFamily: "'Noto Serif Malayalam', serif",
//             background:
//               "linear-gradient(90deg, #fff7cc 0%, #fbbf24 30%, #f59e0b 60%, #fff7cc 100%)",
//             backgroundSize: "200% auto",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             animation: "goldShimmer 4s linear infinite",
//           }}
//         >
//           വിഷു ആശംസകൾ
//           {/* <span className="block text-2xl sm:text-4xl mt-2 opacity-80">
//             2026
//           </span> */}
//         </h1>

//         {/* 🪔 Subtext */}
//         {/* <p
//           className="text-yellow-100/50 text-[10px] sm:text-xs tracking-[0.35em] mt-3"
//           style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
//         >
//           സമൃദ്ധി • സമാധാനം • അനുഗ്രഹം
//         </p> */}
//       </motion.div>

//       <style>{`
//         @keyframes shimmer {
//           0%   { background-position: -200% center; }
//           100% { background-position:  200% center; }
//         }
//       `}</style>
//     </section>
//   );
// }

