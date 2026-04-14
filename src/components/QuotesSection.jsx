import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  {
    quote: "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience.",
    attribution: "For the Vishu Spirit",
    icon: "✦",
  },
  {
    quote: "As the first sight of Kani blesses the eyes at dawn, may every dawn of your life bring fresh hope, golden light, and divine grace.",
    attribution: "Traditional Vishu Blessing",
    icon: "⬡",
  },
  {
    quote: "Prosperity is not just wealth of gold, but the richness of relationships, the health of the body, and the peace of the soul.",
    attribution: "Ancient Kerala Wisdom",
    icon: "◈",
  },
  {
    quote: "Every new year is a garden of possibilities. Plant seeds of kindness, water them with love, and harvest joy all year long.",
    attribution: "Vishu New Year Reflection",
    icon: "✦",
  },
  {
    quote: "Like the golden Kani Konna in full bloom, may your life be bright, beautiful, and full of fragrant blessings.",
    attribution: "Kerala Festive Tradition",
    icon: "⬡",
  },
  {
    quote: "The Vishu Kani teaches us: even in darkness, awaken first to beautiful things — gold, grains, fruits, and the divine.",
    attribution: "Vishu Kani Philosophy",
    icon: "◈",
  },
];

export default function QuotesSection() {
  const [current, setCurrent] = useState(0);

  const go = (idx) => setCurrent(idx);
  const prev = () => go((current - 1 + quotes.length) % quotes.length);
  const next = () => go((current + 1) % quotes.length);

  return (
    <section
      id="quotes"
      className="w-full relative py-24 flex justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1A0A00 0%, #0D0500 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 100%, rgba(255,215,0,0.05) 0%, transparent 50%)' }} />
      <div className="w-full max-w-2xl px-6">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a84c] mb-4"
          >
            Wisdom &amp; Light
          </p>
          <h2
            className="font-serif text-[#f0ece3] leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
          >
            Words to{' '}
            <em className="text-[#c9a84c] italic">Inspire</em>
          </h2>
          <div className="mt-5 w-10 h-px bg-[rgba(201,168,76,0.35)]" />
        </motion.div>

        {/* Card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden glass-card gold-border-glow shadow-2xl shadow-yellow-500/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)',
            }}
          />

          <div
            className="px-10 pt-12 pb-8"
            style={{ minHeight: 280 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* Geometric icon */}
                <span className="block text-xl text-[#c9a84c] mb-7 opacity-70">
                  {quotes[current].icon}
                </span>

                {/* Quote */}
                <blockquote
                  className="font-serif italic text-[#f0ece3] leading-relaxed mb-6"
                  style={{ fontSize: 'clamp(18px, 2.6vw, 23px)' }}
                >
                  {quotes[current].quote}
                </blockquote>

                {/* Attribution */}
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#c9a84c]">
                  {quotes[current].attribution}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div
            className="flex items-center justify-between px-10 py-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Counter */}
            <span className="text-[11px] tabular-nums text-[rgba(240,236,227,0.25)] tracking-wide">
              {String(current + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
            </span>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="rounded-full border-none cursor-pointer p-0 transition-all duration-200"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    background:
                      i === current
                        ? '#c9a84c'
                        : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              {[{ fn: prev, label: '←' }, { fn: next, label: '→' }].map(
                ({ fn, label }) => (
                  <motion.button
                    key={label}
                    onClick={fn}
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-sm"
                    style={{
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'transparent',
                      color: 'rgba(240,236,227,0.45)',
                    }}
                    whileHover={{
                      borderColor: 'rgba(201,168,76,0.4)',
                      color: '#c9a84c',
                    }}
                    whileTap={{ scale: 0.93 }}
                  >
                    {label}
                  </motion.button>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const quotes = [
//   {
//     quote: "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience.",
//     attribution: "— For the Vishu Spirit",
//     icon: "🌟",
//   },
//   {
//     quote: "As the first sight of Kani blesses the eyes at dawn, may every dawn of your life bring fresh hope, golden light, and divine grace.",
//     attribution: "— Traditional Vishu Blessing",
//     icon: "🪔",
//   },
//   {
//     quote: "Prosperity is not just wealth of gold, but the richness of relationships, the health of the body, and the peace of the soul.",
//     attribution: "— Ancient Kerala Wisdom",
//     icon: "🌸",
//   },
//   {
//     quote: "Every new year is a garden of possibilities. Plant seeds of kindness, water them with love, and harvest joy all year long.",
//     attribution: "— Vishu New Year Reflection",
//     icon: "🌺",
//   },
//   {
//     quote: "Like the golden Kani Konna in full bloom, may your life be bright, beautiful, and full of fragrant blessings.",
//     attribution: "— Kerala Festive Tradition",
//     icon: "💛",
//   },
//   {
//     quote: "The Vishu Kani teaches us: even in darkness, awaken first to beautiful things — gold, grains, fruits, and the divine.",
//     attribution: "— Vishu Kani Philosophy",
//     icon: "✨",
//   },
// ];

// export default function QuotesSection() {
//   const [current, setCurrent] = useState(0);

//   const prev = () => setCurrent(c => (c - 1 + quotes.length) % quotes.length);
//   const next = () => setCurrent(c => (c + 1) % quotes.length);

//   return (
//     <section
//       id="quotes"
//       className="relative py-28 overflow-hidden"
//       style={{
//         background: 'linear-gradient(180deg, #200C00 0%, #2D1500 50%, #1A0A00 100%)',
//       }}
//     >
//       {/* Background decoration */}
//       <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
//         <div
//           className="absolute -top-32 left-1/2 -translate-x-1/2"
//           style={{
//             width: '80vw',
//             height: '60vw',
//             background: 'radial-gradient(ellipse, rgba(255,140,0,0.07) 0%, transparent 70%)',
//             borderRadius: '50%',
//           }}
//         />
//       </div>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px' }}
//           transition={{ duration: 0.8 }}
//         >
//           <p className="font-body text-yellow-500/60 tracking-widest text-xs uppercase mb-3" style={{ letterSpacing: '0.4em' }}>
//             ✦ Wisdom & Light ✦
//           </p>
//           <h2 className="font-display text-shimmer mb-4" style={{ fontSize: 'clamp(28px, 6vw, 52px)' }}>
//             Words to Inspire
//           </h2>
//           <div className="mt-4 flex justify-center">
//             <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
//           </div>
//         </motion.div>

//         {/* Quote carousel */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <div
//             className="relative rounded-3xl overflow-hidden"
//             style={{
//               background: 'rgba(255,215,0,0.04)',
//               border: '1px solid rgba(255,215,0,0.15)',
//               backdropFilter: 'blur(20px)',
//               padding: 'clamp(32px, 6vw, 64px)',
//             }}
//           >
//             {/* Large quote mark */}
//             <div
//               className="absolute top-6 left-8 font-display text-yellow-500/10 leading-none pointer-events-none select-none"
//               style={{ fontSize: '120px' }}
//             >
//               "
//             </div>

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={current}
//                 className="relative z-10 text-center"
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.45, ease: 'easeInOut' }}
//               >
//                 {/* Icon */}
//                 <motion.div
//                   className="text-5xl mb-8"
//                   animate={{ y: [0, -6, 0] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//                 >
//                   {quotes[current].icon}
//                 </motion.div>

//                 {/* Quote text */}
//                 <blockquote
//                   className="font-body text-yellow-100/90 leading-relaxed mb-6 italic"
//                   style={{ fontSize: 'clamp(16px, 2.5vw, 22px)' }}
//                 >
//                   {quotes[current].quote}
//                 </blockquote>

//                 {/* Attribution */}
//                 <p className="font-display text-yellow-500" style={{ fontSize: 'clamp(12px, 1.5vw, 15px)' }}>
//                   {quotes[current].attribution}
//                 </p>
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation */}
//             <div className="flex items-center justify-center gap-6 mt-10">
//               <motion.button
//                 onClick={prev}
//                 className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
//                 style={{
//                   border: '1px solid rgba(255,215,0,0.3)',
//                   background: 'rgba(255,215,0,0.07)',
//                   color: '#FFD700',
//                 }}
//                 whileHover={{ scale: 1.1, background: 'rgba(255,215,0,0.18)' }}
//                 whileTap={{ scale: 0.92 }}
//               >
//                 <ChevronLeft size={18} />
//               </motion.button>

//               {/* Dot indicators */}
//               <div className="flex gap-2">
//                 {quotes.map((_, i) => (
//                   <motion.button
//                     key={i}
//                     onClick={() => setCurrent(i)}
//                     className="rounded-full cursor-pointer border-none"
//                     style={{
//                       width: i === current ? 24 : 8,
//                       height: 8,
//                       background: i === current ? '#FFD700' : 'rgba(255,215,0,0.3)',
//                     }}
//                     animate={{ width: i === current ? 24 : 8 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 ))}
//               </div>

//               <motion.button
//                 onClick={next}
//                 className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
//                 style={{
//                   border: '1px solid rgba(255,215,0,0.3)',
//                   background: 'rgba(255,215,0,0.07)',
//                   color: '#FFD700',
//                 }}
//                 whileHover={{ scale: 1.1, background: 'rgba(255,215,0,0.18)' }}
//                 whileTap={{ scale: 0.92 }}
//               >
//                 <ChevronRight size={18} />
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Decorative flower row */}
//         <motion.div
//           className="flex justify-center gap-4 mt-12 text-3xl"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//         >
//           {['🌼', '🌸', '✨', '🌸', '🌼'].map((f, i) => (
//             <motion.span
//               key={i}
//               animate={{ y: [0, -8, 0] }}
//               transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
//               className="cursor-default select-none"
//             >
//               {f}
//             </motion.span>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
