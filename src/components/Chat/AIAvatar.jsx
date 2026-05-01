
const AIAvatar = ({ isSpeaking }) => {
  return (
    <div className={`avatar-container ${isSpeaking ? 'is-speaking' : ''}`}>
      {/* Friendly sound waves */}
      <div className="sound-waves"></div>
      
      {/* Friendly SVG Doll/Girl Avatar */}
    <div className="friendly-face">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Glow/Shadow for visibility */}
          <circle cx="50" cy="50" r="48" fill="rgba(37, 99, 235, 0.03)" />
          
          {/* Main Head Shape - Clean & Defined */}
          <circle cx="50" cy="52" r="38" fill="white" stroke="#cbd5e1" strokeWidth="1" />
          
          {/* Stylized Hair/Top part - Professional Dark Navy */}
          <path d="M18 42 Q 25 15 50 15 Q 75 15 82 42 L 82 45 Q 50 35 18 45 Z" fill="#1e293b" />
          
          {/* Professional Headset (Tutor Vibe) */}
          <path d="M15 50 Q 15 20 50 20 Q 85 20 85 50" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          <rect x="10" y="45" width="8" height="15" rx="3" fill="#2563eb" />
          <rect x="82" y="45" width="8" height="15" rx="3" fill="#2563eb" />
          <path d="M18 60 Q 25 75 35 75" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          
          {/* Eyebrows (Expression) */}
          <path d="M30 42 Q 35 38 40 42" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60 42 Q 65 38 70 42" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Large Expressive Eyes */}
          <g className="eyes">
            <circle cx="36" cy="52" r="5.5" fill="#0f172a" />
            <circle cx="64" cy="52" r="5.5" fill="#0f172a" />
            {/* Bright Highlights */}
            <circle cx="34" cy="50" r="2.2" fill="white" />
            <circle cx="62" cy="50" r="2.2" fill="white" />
            <circle cx="38" cy="54" r="1" fill="white" opacity="0.6" />
            <circle cx="66" cy="54" r="1" fill="white" opacity="0.6" />
          </g>

          {/* Friendly Smile (Animates when speaking) */}
          {isSpeaking ? (
            <g className="mouth-speaking">
              <path d="M42 68 Q 50 78 58 68" fill="#2563eb" />
              <path d="M42 68 Q 50 78 58 68" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            <path d="M44 70 Q 50 74 56 70" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          )}
          
          {/* Subtle Blush (Professional Blue tone) */}
          <circle cx="28" cy="62" r="4" fill="#dbeafe" opacity="0.5" />
          <circle cx="72" cy="62" r="4" fill="#dbeafe" opacity="0.5" />
        </svg>
      </div>

      {/* Blink CSS Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 96%, 98% { transform: scaleY(1); }
          97% { transform: scaleY(0.1); }
        }
        .eyes {
          transform-origin: center 52px;
          animation: blink 4s infinite linear;
        }
      `}} />
    </div>
  );
};

export default AIAvatar;
