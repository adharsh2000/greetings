import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="text-center"
      style={{ background: 'linear-gradient(180deg, #0D0500 0%, #060200 100%)', padding: '20px 10px' }}
    >
      <p className="text-yellow-400 text-base" style={{ marginBottom: '4px' }}>🌼 Happy Vishu 2026 🌼</p>
      <p className="text-yellow-500/60 text-xs" style={{ marginBottom: '4px' }}>ഈ വിഷു നിങ്ങൾക്ക് ഐശ്വര്യം നൽകട്ടെ</p>
      <p className="text-yellow-500/40 text-xs flex items-center justify-center gap-1" style={{ marginTop: '24px' }}>
        Made with <Heart size={11} className="text-red-500" /> by Trideep Kumar
      </p>
    </footer>
  );
}