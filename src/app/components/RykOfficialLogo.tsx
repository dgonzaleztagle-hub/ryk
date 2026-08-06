import React from 'react';

interface RykLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function RykOfficialLogo({ className = 'h-10', variant = 'dark' }: RykLogoProps) {
  // Colores oficiales extraídos de la marca oficial
  const orange = '#E25C13'; // Naranja corporativo RYK
  const purple = variant === 'dark' ? '#2A1A4E' : '#FFFFFF'; // Morado oscuro / blanco para modo oscuro

  return (
    <div className={`inline-flex flex-col items-stretch select-none ${className}`}>
      {/* Marco Principal del Logo */}
      <div className="flex items-stretch border-2 border-[#E25C13] rounded-sm overflow-hidden bg-white p-0.5 shadow-md transition-transform duration-300 hover:scale-105">
        
        {/* Isotipo Izquierdo (Caja Naranja con Ícono Blanco) */}
        <div className="bg-[#E25C13] p-2 flex items-center justify-center min-w-[42px] min-h-[42px]">
          <svg viewBox="0 0 100 100" className="w-7 h-7 text-white fill-current">
            {/* RYK Monograma estilizado */}
            <path
              d="M20 20 H50 C65 20 65 45 50 45 H32 V80 H20 V20 Z M32 32 V35 H48 C55 35 55 32 48 32 H32 Z"
              fill="currentColor"
            />
            {/* Barra Diagonal y K */}
            <path
              d="M15 75 L75 15 L83 23 L23 83 Z"
              fill="currentColor"
            />
            <path
              d="M55 55 L80 80 H65 L48 63 Z"
              fill="currentColor"
            />
            <path
              d="M65 35 L80 20 H68 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Texto RYK Superior Derecho */}
        <div className="bg-white px-3 flex items-center justify-center flex-1">
          <span 
            className="font-black text-2xl tracking-[0.25em] text-[#2A1A4E] font-display uppercase"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            RYK
          </span>
        </div>
      </div>

      {/* Texto Inferior: CONSTRUCCIONES */}
      <div className="text-center pt-1">
        <span
          className={`block text-[10px] font-black tracking-[0.38em] uppercase ${
            variant === 'dark' ? 'text-[#2A1A4E]' : 'text-white'
          }`}
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          CONSTRUCCIONES
        </span>
      </div>
    </div>
  );
}
