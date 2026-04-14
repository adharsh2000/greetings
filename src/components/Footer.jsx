import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-10 text-center"
      style={{ background: 'linear-gradient(180deg, #0D0500 0%, #060200 100%)' }}
    >
      <p className="text-yellow-400 text-base mb-1">🌼 Happy Vishu 2026 🌼</p>
      <p className="text-yellow-500/60 text-xs mb-3">ഈ വിഷു നിങ്ങൾക്ക് ഐശ്വര്യം നൽകട്ടെ</p>
      <p className="text-yellow-500/40 text-xs flex items-center justify-center gap-1">
        Made with <Heart size={11} className="text-red-500" /> by Trideep Kumar
      </p>
    </footer>
  );
}

// import { Heart } from 'lucide-react';

// export default function Footer() {
//   return (
//     <footer
//       className="py-6 text-center text-yellow-400"
//       style={{
//         background: 'linear-gradient(180deg, #0D0500 0%, #060200 100%)',
//       }}
//     >
//       <h2 className="text-lg mb-2">🌼 Happy Vishu 2026 🌼</h2>

//       <p className="text-sm text-yellow-500/70 mb-2">
//         ✦ ഈ വിഷു നിങ്ങൾക്ക് ഐശ്വര്യം നൽകട്ടെ ✦
//       </p>

//       <p className="text-xs text-yellow-500/50">
//         Greetings <Heart size={12} className="inline text-red-500" /> from Trideep Kumar
//       </p>
//     </footer>
//   );
// }