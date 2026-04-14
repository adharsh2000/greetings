import { motion, AnimatePresence } from 'framer-motion';

const mandalaPath = "M50,10 L90,50 L50,90 L10,50 Z";

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, #2D1500 0%, #0D0500 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Outer ring */}
          <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
            {/* Radiating circles */}
            {[0, 0.4, 0.8].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-yellow-400/30"
                style={{ width: 120 + i * 30, height: 120 + i * 30 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            {/* Spinning ring outer */}
            <svg className="loader-ring absolute" width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeDasharray="50 330" strokeLinecap="round"/>
              <circle cx="70" cy="70" r="60" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="20 360" strokeDashoffset="100" strokeLinecap="round" opacity="0.5"/>
              {/* Decorative dots */}
              {Array.from({length: 8}).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x = 70 + 60 * Math.cos(angle);
                const y = 70 + 60 * Math.sin(angle);
                return <circle key={i} cx={x} cy={y} r="3" fill="#FFD700" opacity="0.8"/>;
              })}
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700"/>
                  <stop offset="50%" stopColor="#FF9933"/>
                  <stop offset="100%" stopColor="#FFD700"/>
                </linearGradient>
              </defs>
            </svg>

            {/* Inner spinning ring (reverse) */}
            <svg className="loader-ring-reverse absolute" width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="35" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="30 190" strokeLinecap="round" opacity="0.7"/>
            </svg>

            {/* Center Diya flame */}
            <motion.div
              className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full"
              style={{ background: 'radial-gradient(circle, #FF9933 0%, #8B0000 80%)' }}
              animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 20px #FF9933', '0 0 40px #FFD700', '0 0 20px #FF9933'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span style={{ fontSize: 28 }}>🪔</span>
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-display text-yellow-400 tracking-widest text-sm uppercase" style={{ letterSpacing: '0.3em' }}>
              Happy Vishu
            </p>
            <motion.div className="flex justify-center gap-1 mt-3">
              {['•','•','•'].map((dot, i) => (
                <motion.span
                  key={i}
                  className="text-yellow-500 text-xs"
                  animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                >
                  {dot}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Flower petals */}
          {Array.from({length: 8}).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl pointer-events-none select-none"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 1, 0.4],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🌼
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
