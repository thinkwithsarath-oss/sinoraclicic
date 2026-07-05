import React from "react";

interface SinoraLogoProps {
  className?: string;
  isLight?: boolean;
}

export default function SinoraLogo({ className = "w-10 h-10", isLight = false }: SinoraLogoProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Left Green Ribbon Gradient */}
        <linearGradient id="logo-green-ribbon" x1="40" y1="40" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22c55e" />     {/* Bright Green */}
          <stop offset="60%" stopColor="#84cc16" />    {/* Lime */}
          <stop offset="100%" stopColor="#a3e635" />   {/* Light Lime */}
        </linearGradient>

        {/* Right Blue Ribbon Gradient */}
        <linearGradient id="logo-blue-ribbon" x1="160" y1="40" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" />     {/* Sky Blue */}
          <stop offset="50%" stopColor="#0284c7" />    {/* Medium Blue */}
          <stop offset="100%" stopColor="#1d4ed8" />   {/* Royal Blue */}
        </linearGradient>

        {/* Inner Symbol Gradients */}
        <linearGradient id="logo-inner-green" x1="85" y1="80" x2="85" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#a3e635" />
        </linearGradient>

        <linearGradient id="logo-inner-blue" x1="105" y1="80" x2="105" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>

      {/* TOP LEFT & BOTTOM LEFT GREEN RIBBON TOOTH STRUCTURE */}
      <path 
        d="M 100,55 
           C 85,50 60,45 50,70 
           C 40,90 45,115 62,110 
           C 72,107 80,100 83,92 
           C 80,105 70,122 62,135
           C 52,150 48,168 53,178 
           C 55,182 58,175 60,170
           C 68,150 81,130 92,115
           C 96,110 93,105 88,107
           C 72,112 55,100 58,82
           C 62,65 85,62 100,68 
           Z" 
        fill={isLight ? "#ffffff" : "url(#logo-green-ribbon)"} 
        opacity={isLight ? 0.9 : 1}
      />

      {/* ADDITIONAL LOWER-LEFT GREEN ROOT SWEEP */}
      <path
        d="M 52,142
           C 48,155 46,168 50,182
           C 51,185 53,184 53,181
           C 53,170 57,156 63,145
           C 65,142 61,138 58,140
           C 56,140 54,141 52,142 Z"
        fill={isLight ? "#ffffff" : "#84cc16"}
        opacity={isLight ? 0.8 : 1}
      />

      {/* TOP RIGHT & BOTTOM RIGHT BLUE RIBBON TOOTH STRUCTURE */}
      <path 
        d="M 100,60 
           C 115,55 140,48 150,70 
           C 160,90 152,110 142,115 
           C 132,120 120,118 115,110 
           C 122,115 130,125 133,135
           C 138,150 135,168 123,180
           C 120,183 121,178 123,174
           C 132,155 131,138 122,122
           C 118,115 113,116 115,122
           C 122,135 120,152 110,165
           C 105,172 101,178 103,180
           C 104,181 106,177 108,174
           C 118,158 122,140 118,122
           C 114,105 125,95 138,88
           C 145,84 148,78 142,72
           C 132,60 112,65 100,70
           Z" 
        fill={isLight ? "#ffffff" : "url(#logo-blue-ribbon)"} 
        opacity={isLight ? 0.9 : 1}
      />

      {/* THE INNER LOGO SYMBOLS (I & S/D droplet) */}
      {/* 1. Left Vertical Column 'I' */}
      <path
        d="M 84,82
           C 80,82 78,84 78,88
           L 78,112
           C 78,116 80,118 84,118
           L 88,118
           C 92,118 94,116 94,112
           L 94,88
           C 94,84 92,82 88,82
           Z"
        fill={isLight ? "#ffffff" : "url(#logo-inner-green)"}
        opacity={isLight ? 0.95 : 1}
      />
      {/* Inner detailing of I column to make it look 3D and stylized */}
      <path
        d="M 81,87
           L 81,113
           C 81,115 82,116 84,116
           L 85,116
           L 85,84
           C 85,83 83,85 81,87 Z"
        fill={isLight ? "rgba(0,0,0,0.1)" : "#ffffff"}
        opacity="0.35"
      />

      {/* 2. Right Crescent Droplet 'S/D' */}
      <path
        d="M 100,82
           C 112,82 122,90 122,100
           C 122,110 112,118 100,118
           C 95,118 92,115 92,110
           C 92,102 98,92 100,82
           Z"
        fill={isLight ? "#ffffff" : "url(#logo-inner-blue)"}
        opacity={isLight ? 0.95 : 1}
      />
      {/* White inner light sweep on the droplet for premium corporate aesthetic */}
      <path
        d="M 103,88
           C 110,92 115,97 114,103
           C 113,108 109,112 105,113
           C 103,113 103,111 104,109
           C 107,105 107,98 103,91
           C 102,89 102,88 103,88 Z"
        fill={isLight ? "rgba(0,0,0,0.15)" : "#ffffff"}
        opacity="0.4"
      />
    </svg>
  );
}
