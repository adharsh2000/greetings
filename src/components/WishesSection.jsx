import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const wishes = [
  {
    title: "ഐശ്വര്യപൂർണ്ണമായ വിഷു",
    subtitle: "വിഷു ആശംസകൾ",
    message: "കണിയും കൈനീട്ടവും ഈ പുതുവർഷത്തിൽ നിങ്ങളുടെ ജീവിതത്തിൽ ഐശ്വര്യവും സമൃദ്ധിയും നിറയ്ക്കട്ടെ.",
  },
  {
    title: "സമൃദ്ധിയുടെ പുലരി",
    subtitle: "മംഗളങ്ങൾ നേരുന്നു",
    message: "കണിക്കൊന്നകൾ പൂത്തുലയുന്ന ഈ വേളയിൽ, നിങ്ങളുടെ വീട്ടിൽ ചിരിയും ആരോഗ്യവും സമ്പത്തും എക്കാലവും നിലനിൽക്കട്ടെ.",
  },
  {
    title: "പുണ്യനക്ഷത്ര തിളക്കം",
    subtitle: "നവവർഷം ഭദ്രം",
    message: "ഓരോ പുതിയ തുടക്കവും മുൻപത്തേക്കാൾ തിളക്കമുള്ളതാകട്ടെ. ഭഗവാൻ കൃഷ്ണന്റെ അനുഗ്രഹങ്ങൾ കുടുംബത്തിന് തുണയാകട്ടെ.",
  },
];

const cardVariants = {
  enter: (dir) => ({
    opacity: 0,
    rotateY: dir > 0 ? 45 : -45,
    z: -200,
    x: dir > 0 ? 200 : -200,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    z: 0,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (dir) => ({
    opacity: 0,
    rotateY: dir < 0 ? 45 : -45,
    z: -200,
    x: dir < 0 ? 200 : -200,
    filter: "blur(10px)",
  }),
};

// 3D Falling Petals with varying depths
const GoldenShower3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ perspective: "1000px" }}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: Math.random() * 100 + "%",
            z: Math.random() * -500, // Depth
            opacity: 0
          }}
          animate={{
            y: "110vh",
            rotateX: 360,
            rotateY: 360,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 7,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          className="absolute w-2 h-6 bg-amber-400 rounded-full"
          style={{
            boxShadow: "0 0 15px #fbbf24",
            background: "linear-gradient(to bottom, #fde68a, #b45309)",
          }}
        />
      ))}
    </div>
  );
};

export default function Vishu3DCarousel() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir) => {
    setIndex(([prev]) => [(prev + dir + wishes.length) % wishes.length, dir]);
  };

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 7000);
    return () => clearInterval(interval);
  }, []);

  const wish = wishes[index];

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manjari:wght@100;400;700&display=swap');
          .malayalam-3d { font-family: 'Manjari', sans-serif; perspective: 1200px; }
          .text-shadow-gold { text-shadow: 0 0 20px rgba(251, 191, 36, 0.4), 0 10px 10px rgba(0,0,0,0.8); }`}
      </style>

      <section className="relative min-h-screen flex items-center justify-center bg-[#080400] overflow-hidden malayalam-3d">

        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.15)_0%,transparent_60%)]" />
        </div>

        <GoldenShower3D />

        {/* 3D Carousel Stage */}
        {/* <div className="relative z-20 w-full max-w-5xl px-6 h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 1,
                ease: [0.23, 1, 0.32, 1]
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute flex flex-col items-center text-center"
            >
              {/* Floating Header */}
        {/* <motion.span
                style={{ translateZ: "50px" }} // Move closer to user
                className="text-amber-500 font-bold text-xs uppercase mb-6"
              >
                {wish.subtitle}
              </motion.span> */}

        {/* Depth Title */}
        {/* <h2
                style={{ translateZ: "100px" }}
                className="text-5xl md:text-8xl font-bold text-[#fef3c7] mb-8 leading-tight text-shadow-gold"
              >
                {wish.title}
              </h2> */}

        {/* 3D Divider */}
        {/* <div style={{ translateZ: "30px" }} className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_15px_#fbbf24]" />
              </div> */}

        {/* Floating Message */}
        {/* <p
                style={{ translateZ: "60px" }}
                className="text-zinc-300 text-xl md:text-3xl max-w-2xl font-light italic leading-relaxed"
              >
                “ {wish.message} ”
              </p>
            </motion.div>
          </AnimatePresence> */}
        {/* </div>  */}

        <div className="relative z-20 w-full max-w-5xl px-4 sm:px-6 min-h-[320px] sm:min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 1,
                ease: [0.23, 1, 0.32, 1]
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute flex flex-col items-center text-center"
            >
              {/* Subtitle */}
              <motion.span
                style={{ translateZ: "50px" }}
                className="text-amber-500 font-bold text-xs sm:text-sm uppercase mb-4 sm:mb-6"
              >
                {wish.subtitle}
              </motion.span>

              {/* Title */}
              <h2
                style={{ translateZ: "100px" }}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#fef3c7] mb-6 leading-tight text-shadow-gold break-words px-2"
              >
                {wish.title}
              </h2>

              {/* Divider */}
              <div style={{ translateZ: "30px" }} className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_15px_#fbbf24]" />
              </div>

              {/* Message */}
              <p
                style={{ translateZ: "60px" }}
                className="text-base sm:text-lg md:text-2xl max-w-xl sm:max-w-2xl font-light italic leading-relaxed text-zinc-300 px-2"
              >
                “ {wish.message} ”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Navigation Dots */}
        <div className="absolute bottom-12 flex gap-6 z-30">
          {wishes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              className={`h-2 rounded-full transition-all duration-500 transform ${i === index
                ? "w-16 bg-amber-400 shadow-[0_0_20px_#fbbf24] scale-90 w-16"
                : "w-4 bg-white/10 hover:bg-white/30"
                }`}
            />
          ))}
        </div>

        {/* Stage Lighting Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_40%,#000_100%)] opacity-60" />
      </section>
    </>
  );
}