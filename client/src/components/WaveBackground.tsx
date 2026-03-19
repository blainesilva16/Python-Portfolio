const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(174 100% 70%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(174 100% 60%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(174 100% 70%)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(174 100% 65%)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(174 100% 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(174 100% 65%)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Wave Layer 1 */}
        <g className="animate-wave-motion" style={{ animationDelay: "0s" }}>
          <path
            d="M-100,400 Q200,200 500,350 T1100,300 T1600,400"
            fill="none"
            stroke="url(#waveGradient1)"
            strokeWidth="3"
          />
          <path
            d="M-100,420 Q250,180 550,320 T1150,280 T1600,380"
            fill="none"
            stroke="url(#waveGradient2)"
            strokeWidth="2"
          />
        </g>

        {/* Wave Layer 2 */}
        <g className="animate-wave-motion" style={{ animationDelay: "-2s" }}>
          <path
            d="M-100,450 Q300,250 600,400 T1200,350 T1600,450"
            fill="none"
            stroke="url(#waveGradient1)"
            strokeWidth="2.5"
          />
          <path
            d="M-100,480 Q350,220 650,380 T1250,320 T1600,420"
            fill="none"
            stroke="url(#waveGradient2)"
            strokeWidth="1.5"
          />
        </g>

        {/* Wave Layer 3 - Left side curves */}
        <g className="animate-wave-motion" style={{ animationDelay: "-4s" }}>
          <path
            d="M-50,100 Q100,300 50,500 T100,700"
            fill="none"
            stroke="url(#waveGradient1)"
            strokeWidth="2"
          />
          <path
            d="M0,150 Q150,350 100,550 T150,750"
            fill="none"
            stroke="url(#waveGradient2)"
            strokeWidth="1.5"
          />
        </g>

        {/* Wave Layer 4 - Right side curves */}
        <g className="animate-wave-motion" style={{ animationDelay: "-6s" }}>
          <path
            d="M1400,100 Q1340,300 1390,500 T1340,700"
            fill="none"
            stroke="url(#waveGradient1)"
            strokeWidth="2"
          />
          <path
            d="M1440,150 Q1380,350 1430,550 T1380,750"
            fill="none"
            stroke="url(#waveGradient2)"
            strokeWidth="1.5"
          />
        </g>

        {/* Additional flowing curves */}
        <g className="animate-wave-motion" style={{ animationDelay: "-3s" }}>
          <path
            d="M-100,550 Q400,450 700,550 T1300,500 T1600,550"
            fill="none"
            stroke="url(#waveGradient2)"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

export default WaveBackground;
