'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  HardHat, 
  Layers, 
  Send, 
  MapPin,
  Menu,
  X,
  Leaf,
  Construction,
  Sparkles,
  Zap,
  Hammer,
  BarChart3,
  Calendar,
  Activity,
  Users,
  Compass
} from 'lucide-react';
import { GrainTexture } from '@/components/premium/GrainTexture';
import { ClipPathReveal } from '@/components/premium/ClipPathReveal';
import { Magnetic } from '@/components/premium/Magnetic';
import { SpotlightCard } from '@/components/premium/SpotlightCard';
import RykOfficialLogo from './components/RykOfficialLogo';

// -------------------------------------------------------------
// COMPONENTE: CAD Grid Background (RYK Dark / Gold Mode + Mouse Tracker)
// -------------------------------------------------------------
const CADGridBackgroundDark = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const size = 60;
      const width = canvas.width;
      const height = canvas.height;

      // Suavizar movimiento del cursor
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;



      // Dibujar grilla
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Intersecciones (cruces naranja RYK)
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.12)';
      ctx.lineWidth = 1;
      const crossSize = 3;
      for (let x = size; x < width; x += size) {
        for (let y = size; y < height; y += size) {
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
        }
      }

      // Dibujar miras (crosshairs) del cursor interactivo
      const { x, y } = mouseRef.current;
      if (x > 0 && x < width && y > 0 && y < height) {
        // Círculo del radar
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.15)';
        ctx.stroke();

        // Líneas de mira infinitas pero sutiles
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.06)';
        ctx.stroke();

        // Pequeño centro
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#F97316';
        ctx.fill();

        // Coordenadas flotantes
        ctx.fillStyle = 'rgba(249, 115, 22, 0.7)';
        ctx.font = '10px monospace';
        ctx.fillText(`X: ${Math.round(x)} Y: ${Math.round(y)}`, x + 10, y - 10);
        ctx.fillText(`COORDS: -23.65 / -70.39`, x + 10, y + 15);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    
    let animId = requestAnimationFrame(function loop() {
      draw();
      animId = requestAnimationFrame(loop);
    });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block z-0" />;
};

export default function RYKConstruccionesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formComments, setFormComments] = useState('');

  // 1. Servicios de la Diapositiva 6 a 10
  const servicios = [
    {
      id: 0,
      number: '01',
      title: 'Obras Civiles',
      desc: 'Ejecutamos obras civiles generales con equipos y personal especializado para cada etapa del proyecto.',
      image: '/prospectos/ryk/page_6_img_1_Image38.jpg',
      bullets: [
        'Movimientos de tierra masivos y excavaciones técnicas.',
        'Construcción de fundaciones robustas y muros de contención.',
        'Pavimentos industriales de hormigón y mezclas asfálticas.',
        'Servicios de especialidades completas para obras de urbanización.'
      ],
      icon: Construction,
      gridSpan: 'lg:col-span-8'
    },
    {
      id: 1,
      number: '02',
      title: 'Terminaciones de Arquitectura',
      desc: 'Realizamos todo tipo de trabajos de terminaciones bajo los más altos estándares de construcción.',
      image: '/prospectos/ryk/page_7_img_1_Image41.jpg',
      bullets: [
        'Instalación de pisos de porcelanatos y cerámicos.',
        'Revestimientos técnicos, ventanas, puertas y cielos.',
        'Coordinación integral con especialidades de clima, electricidad y mecánica.'
      ],
      icon: Hammer,
      gridSpan: 'lg:col-span-4'
    },
    {
      id: 2,
      number: '03',
      title: 'Pisos de Hormigón',
      desc: 'Pavimentos de hormigón allanados y regleados mecánicamente, ideales para naves industriales, fábricas y galpones.',
      image: '/prospectos/ryk/page_8_img_1_Image44.jpg',
      bullets: [
        'Endurecedor no metálico para alta resistencia a la abrasión.',
        'Fibras de polipropileno para mitigar contracción.',
        'Curado químico optimizado de última generación.'
      ],
      icon: Layers,
      gridSpan: 'lg:col-span-4'
    },
    {
      id: 3,
      number: '04',
      title: 'Pulido de Pisos',
      desc: 'El pulido responde a una necesidad productiva: mejora la imagen y evita pérdidas por desgaste.',
      image: '/prospectos/ryk/page_9_img_1_Image47.jpg',
      bullets: [
        'Superficie altamente reflectiva y resistente.',
        'Proceso ambientalmente amigable y de nulo residuo.',
        'Ideal para aeropuertos, centros de acopio y oficinas.'
      ],
      icon: Sparkles,
      gridSpan: 'lg:col-span-4'
    },
    {
      id: 4,
      number: '05',
      title: 'Revestimientos Epóxicos',
      desc: 'Sistema epóxico de dos componentes, 100% sólido y libre de solventes para máxima protección química.',
      image: '/prospectos/ryk/page_7_img_1_Image41.jpg', // Reutilizando porcelanato/obra
      bullets: [
        'Apto para pisos de hormigón de exigencia pesada.',
        'Uso en talleres, almacenes y garajes industriales.',
        'Terminación impermeable y antideslizante certificada.'
      ],
      icon: Zap,
      gridSpan: 'lg:col-span-4'
    }
  ];

  // 2. Proyectos Realizados de la Diapositiva 11 a 17
  const proyectos = [
    {
      title: 'Laboratorio Kaltire',
      mandante: 'Ricardo Claps Jara',
      desc: 'Habilitación integral de infraestructura científica y operacional mediante obras civiles y terminaciones arquitectónicas.',
      bullets: [
        'Ejecución de obras civiles basales.',
        'Tabiquerías de aislación técnica, colocación de porcelanatos, instalación de ventanas y puertas.',
        'Climatización e instalación y puesta en marcha de Campana Extractora de Humos.'
      ],
      images: [
        '/prospectos/ryk/page_11_img_1_Image52.jpg',
        '/prospectos/ryk/page_11_img_2_Image53.jpg'
      ]
    },
    {
      title: 'Construcción Sala Eléctrica',
      mandante: 'Ricardo Claps Jara',
      desc: 'Diseño estructural y montaje para contención física de equipamientos de media y alta tensión.',
      bullets: [
        'Obras civiles para fundaciones pesadas y pavimentos de soporte estructural.',
        'Obra gruesa ejecutada en bloques de hormigón armado sismorresistente.',
        'Terminaciones de estuco técnico, empastado y pinturas de protección.'
      ],
      images: [
        '/prospectos/ryk/page_12_img_1_Image56.jpg',
        '/prospectos/ryk/page_12_img_2_Image57.jpg'
      ]
    },
    {
      title: 'Galpones Industriales Portezuelo',
      mandante: 'MSCO – Rep.: Enrique Orellana',
      desc: 'Infraestructura masiva de almacenamiento logístico y acopio con urbanización y pavimentos.',
      bullets: [
        'Muros de contención perimetrales y fundaciones especiales.',
        'Superficie construida total de 10,000 m².',
        'Urbanización eléctrica subterránea y pavimentos asfálticos pesados.'
      ],
      images: [
        '/prospectos/ryk/page_13_img_1_Image65.jpg',
        '/prospectos/ryk/page_13_img_2_Image66.jpg',
        '/prospectos/ryk/page_13_img_3_Image67.jpg'
      ]
    },
    {
      title: 'Losa Poder Judicial',
      mandante: 'Eduardo Antonio Silveira Lemos',
      desc: 'Pavimentación de hormigón de alta planitud y resistencia con terminación de pulido espejo.',
      bullets: [
        'Extendido de hormigón en losas con acabado platachado mecánico.',
        'Tratamiento de pulido brillante y corte de juntas con disco diamantado.'
      ],
      images: [
        '/prospectos/ryk/page_14_img_1_Image70.jpg'
      ]
    },
    {
      title: 'Hospital Regional Antofagasta',
      mandante: 'SACYR Chile S.A. – Rep.: Antonio F. Belmonte Sánchez',
      desc: 'Especialidades de pavimentos, cubiertas técnicas y acabados para el complejo de salud.',
      bullets: [
        'Acabado de cubiertas con aislapol, membrana separadora y hormigón platachado.',
        'Corte de losetas de hormigón, desbaste, pulido de radieres y colocación de cerámicas.'
      ],
      images: [
        '/prospectos/ryk/page_15_img_1_Image73.jpg'
      ]
    },
    {
      title: 'Edificación Sol Mejillones',
      mandante: 'Constructora LOGA S.A. – Rep.: Roberto Luengo Núñez',
      desc: 'Instalación de obra gruesa basal, radieres y losas de soporte para edificación habitacional.',
      bullets: [
        'Emplantillado e instalación de armaduras de acero estructural.',
        'Hormigonado de muros y fundaciones con pulido mecánico de losas.'
      ],
      images: [
        '/prospectos/ryk/page_16_img_1_Image76.jpg'
      ]
    },
    {
      title: 'Obras Generales B2B',
      mandante: 'GEOTEC / GEOASSAY / FARGROUP',
      desc: 'Remodelaciones de oficinas técnicas, montaje de galpones y servicios técnicos mineros.',
      bullets: [
        'Remodelación de Oficinas GEOTEC Antofagasta.',
        'Galpones, bodegas de acopio y oficinas GEOASSAY Calama.',
        'Galpones estructurales y obras civiles generales para FARGROUP.'
      ],
      images: [
        '/prospectos/ryk/page_17_img_1_Image79.jpg',
        '/prospectos/ryk/page_17_img_2_Image80.jpg'
      ]
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    
    const msg = `Hola RYK Construcciones. Me llamo *${formName}*${formCompany ? ` de la empresa *${formCompany}*` : ''}.\nEmail: ${formEmail}\n\n*Mensaje:* ${formComments}`;
    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/56935722795?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#FAF9F5] selection:bg-[#E5A93C] selection:text-[#0B0D0E] font-[family-name:var(--font-outfit)] antialiased overflow-x-hidden relative">
      
      {/* Texture film sutil (Awwwards design) */}
      <GrainTexture opacity={0.04} animated={true} blendMode="overlay" className="pointer-events-none fixed inset-0 z-20" />

      {/* Background interactivo CAD en versión oscura */}
      <CADGridBackgroundDark />

      {/* -------------------------------------------------------------
          1. HEADER (Marca unificada)
          ------------------------------------------------------------- */}
      <nav className="fixed w-full top-0 z-50 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo RYK Construcciones Oficial */}
          <Magnetic>
             <a href="#hero" className="flex items-center cursor-pointer group">
                <img 
                  src="/logo_oficial.jpeg" 
                  onError={(e) => { e.currentTarget.src = "/prospectos/ryk/logo_oficial.jpeg"; }}
                  alt="RYK Construcciones Logo Oficial" 
                  className="h-10 w-auto object-contain bg-white/90 p-1 rounded-sm shadow-md transition-transform duration-300 group-hover:scale-105" 
                />
             </a>
          </Magnetic>
          
          {/* Links Principales (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-bold text-xs tracking-[0.2em] text-slate-300 uppercase">
            <Magnetic><a href="#nosotros" className="hover:text-[#F97316] transition-colors">Empresa</a></Magnetic>
            <Magnetic><a href="#valores" className="hover:text-[#F97316] transition-colors">Valores</a></Magnetic>
            <Magnetic><a href="#servicios" className="hover:text-[#F97316] transition-colors">Servicios</a></Magnetic>
            <Magnetic><a href="#proyectos" className="hover:text-[#F97316] transition-colors">Proyectos</a></Magnetic>
            <Magnetic><a href="#contacto" className="hover:text-[#F97316] transition-colors">Contacto</a></Magnetic>
          </div>
          
          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Magnetic>
                 <a href="#contacto" className="bg-[#F97316] text-white hover:bg-white hover:text-[#0F172A] font-bold text-xs px-6 py-3.5 uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#F97316]/20">
                   Cotizar Obras
                 </a>
              </Magnetic>
            </div>
            
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 text-slate-300 hover:text-[#F97316] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden w-full bg-[#0F172A] border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-6 py-8 px-6 font-bold text-xs tracking-[0.25em] text-slate-200 uppercase">
                <a href="#nosotros" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 border-b border-white/10 hover:text-[#F97316]">Empresa</a>
                <a href="#valores" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 border-b border-white/10 hover:text-[#F97316]">Valores</a>
                <a href="#servicios" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 border-b border-white/10 hover:text-[#F97316]">Servicios</a>
                <a href="#proyectos" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 border-b border-white/10 hover:text-[#F97316]">Proyectos</a>
                <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 border-b border-white/10 hover:text-[#F97316]">Contacto</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* -------------------------------------------------------------
          2. HERO SECTION
          ------------------------------------------------------------- */}
      <section id="hero" className="relative z-10 min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#0F172A] opacity-90" />
        
        {/* Imagen del gran galpón industrial en background */}
        <div className="absolute inset-0 z-[-1] opacity-35 grayscale contrast-125">
          <img 
            src="/prospectos/ryk/page_1_img_1_Image6.jpg" 
            alt="Fondo Obra Galpón Industrial RYK" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col text-left">
            
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] font-mono text-xs font-bold tracking-[0.25em] uppercase w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              Perfil de Empresa // Obras Civiles & Edificación
            </div>

            <div className="overflow-hidden mb-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase">
                RYK <br />
                <span className="text-[#F97316]">CONSTRUCCIONES</span>
              </h1>
            </div>

            <p className="text-slate-200 text-base sm:text-xl max-w-2xl font-light leading-relaxed mb-8">
              Servicios de Obras Civiles, Urbanizaciones, Pavimentación Industrial y Terminaciones de Alta Especificación Técnica. Experiencia certificada en la minería y gran industria del norte de Chile.
            </p>

            <div className="flex flex-wrap gap-3 font-mono text-xs font-bold text-slate-300 uppercase">
              <span className="px-3.5 py-1.5 border border-white/10 bg-white/5">Urbanización</span>
              <span className="px-3.5 py-1.5 border border-white/10 bg-white/5">Edificación</span>
              <span className="px-3.5 py-1.5 border border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316]">Pavimentos Industriales</span>
              <span className="px-3.5 py-1.5 border border-white/10 bg-white/5">Obras Civiles</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#proyectos" className="bg-[#F97316] text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 text-center hover:bg-white hover:text-[#0F172A] transition-all duration-300 shadow-lg shadow-[#F97316]/20">
                Ver Proyectos Ejecutados
              </a>
              <a href="#contacto" className="border border-white/20 hover:border-white text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 text-center bg-white/5 transition-all duration-300">
                Contacto Directo
              </a>
            </div>

          </div>

          {/* Tarjeta de Telemetría Industrial */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="border border-white/15 bg-[#0F172A]/90 backdrop-blur-md p-7 font-mono relative shadow-2xl">
              <div className="absolute top-0 right-0 w-3 h-3 bg-[#F97316]" />
              
              <div className="text-xs text-slate-300 font-bold uppercase tracking-widest mb-6 flex justify-between items-center border-b border-white/10 pb-3">
                <span>ESTATUS OPERACIONAL</span>
                <Activity className="w-4 h-4 text-[#F97316] animate-pulse" />
              </div>
              
              <div className="space-y-5 text-xs">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase">Incidentes de Seguridad</div>
                    <div className="text-white font-bold text-base mt-0.5">0% INCIDENTES</div>
                  </div>
                  <Shield className="w-5 h-5 text-emerald-400 mb-0.5" />
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase">Capacidad Operativa</div>
                    <div className="text-white font-bold text-base mt-0.5">10.000 m² CONSTRUIDOS</div>
                  </div>
                  <Construction className="w-5 h-5 text-[#F97316] mb-0.5" />
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase">Cobertura Territorial</div>
                    <div className="text-white font-bold text-sm mt-0.5">ANTOFAGASTA / MEJILLONES / CALAMA</div>
                  </div>
                  <MapPin className="w-5 h-5 text-slate-300 mb-0.5" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase">Especialidades Activas</div>
                    <div className="text-[#F97316] font-bold text-sm mt-0.5">OBRAS CIVILES / PAVIMENTOS</div>
                  </div>
                  <Layers className="w-5 h-5 text-[#F97316] mb-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. NUESTRA EMPRESA & PROPÓSITO (#nosotros - Swiss Layout Naranjo/Negro/Gris)
          ------------------------------------------------------------- */}
      <section id="nosotros" className="py-24 bg-[#0F172A] text-white border-b border-white/10 relative z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quiénes Somos - Col 6 (Gris Grafito / Black Theme) */}
          <div className="lg:col-span-6 border border-white/15 p-8 md:p-12 flex flex-col justify-between relative bg-[#1E293B] shadow-2xl">
            <div className="absolute top-0 right-0 w-20 h-20 border-b border-l border-white/10 pointer-events-none"></div>
            <div className="absolute top-5 right-5 font-mono text-sm font-bold text-[#F97316] tracking-widest uppercase">01 // QUIÉNES SOMOS</div>
            
            <div className="flex flex-col gap-6 text-left">
              <span className="text-[#F97316] font-mono text-sm tracking-[0.25em] uppercase font-bold">Responsabilidad & Disciplina</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">
                Nuestra Empresa
              </h2>
              <div className="w-20 h-1.5 bg-[#F97316]"></div>
              <p className="text-slate-100 text-base md:text-lg font-normal leading-relaxed">
                <strong className="text-white font-bold">RYK CONSTRUCCIONES</strong> (Gloria Pizarro E.I.R.L) es una contratista especializada en Obras Civiles, Urbanizaciones, Pavimentación Industrial y Terminaciones de Alta Especificación.
              </p>
              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
                Contamos con un equipo altamente capacitado y motivado para operaciones de gran escala en la minería e industria pesada de Antofagasta, Mejillones y Calama.
              </p>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 text-left font-mono text-sm text-slate-300 leading-relaxed">
              ⚡ Basamos nuestro trabajo en la responsabilidad, la disciplina y la perseverancia, enfocados en satisfacer los requerimientos técnicos de nuestros clientes.
            </div>
          </div>

          {/* Propósito / Compromiso - Col 6 (Vivid Orange Brand Theme) */}
          <div className="lg:col-span-6 border border-[#F97316] p-8 md:p-12 flex flex-col justify-between relative bg-[#F97316] text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-20 h-20 border-b border-l border-white/20 pointer-events-none"></div>
            <div className="absolute top-5 right-5 font-mono text-sm font-bold text-white/90 tracking-widest uppercase bg-black/30 px-3 py-1">02 // COMPROMISO</div>
            
            <div className="flex flex-col gap-6 text-left">
              <span className="text-white/90 font-mono text-sm tracking-[0.25em] uppercase font-bold">Nuestra Visión</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">
                Propósito de Marca
              </h2>
              <div className="w-20 h-1.5 bg-white"></div>
              
              <div className="bg-[#0F172A] border-l-4 border-white p-6 md:p-8 italic text-slate-100 text-base md:text-xl font-serif leading-relaxed shadow-2xl">
                “Entregar servicios de construcción y pavimentación industrial con cero desvíos técnicos, integrando la máxima disciplina operativa con un estándar impecable de seguridad y compromiso ambiental.”
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/20 text-left flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
              <span className="font-mono text-xs md:text-sm tracking-wider text-white uppercase font-bold">OBRAS RYK // SIEMPRE A SU SERVICIO</span>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          4. VALORES
          ------------------------------------------------------------- */}
      <section id="valores" className="relative z-10 py-24 bg-[#0B0D0E] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="font-mono text-[#F97316] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              // LO QUE NOS DEFINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Nuestros Valores
            </h2>
            <div className="w-16 h-1 bg-[#F97316] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <SpotlightCard className="border border-white/10 bg-[#0F172A]/80 p-8 flex flex-col text-left group hover:border-[#F97316]/50 transition-all duration-300">
              <div className="font-mono text-4xl font-black text-[#F97316]/50 group-hover:text-[#F97316] transition-colors mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase">Disciplina</h3>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Nuestra principal carta de presentación: puntualidad extrema, rigor en seguir el plan de ingeniería acordado y enfoque en alcanzar los objetivos sin desviaciones.
              </p>
            </SpotlightCard>

            <SpotlightCard className="border border-white/10 bg-[#0F172A]/80 p-8 flex flex-col text-left group hover:border-[#F97316]/50 transition-all duration-300">
              <div className="font-mono text-4xl font-black text-[#F97316]/50 group-hover:text-[#F97316] transition-colors mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase">Responsabilidad</h3>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Cumplimos fielmente con nuestras obligaciones contractuales y operativas, centrándonos en el impacto de cada decisión técnica tomada en terreno.
              </p>
            </SpotlightCard>

            <SpotlightCard className="border border-white/10 bg-[#0F172A]/80 p-8 flex flex-col text-left group hover:border-[#F97316]/50 transition-all duration-300">
              <div className="font-mono text-4xl font-black text-[#F97316]/50 group-hover:text-[#F97316] transition-colors mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase">Proactividad</h3>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Aprovechamos cada oportunidad para mejorar la calidad del servicio, reaccionando de forma rápida, eficiente y eficaz ante cualquier imprevisto en obra.
              </p>
            </SpotlightCard>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          5. BENTO GRID DE SERVICIOS (Todas las fotos expuestas)
          ------------------------------------------------------------- */}
      <section id="servicios" className="relative z-10 py-24 bg-[#0F172A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-left mb-16">
            <div className="font-mono text-[#F97316] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              // SERVICIOS TÉCNICOS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Áreas de Especialidad
            </h2>
            <div className="w-20 h-1.5 bg-[#F97316] mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {servicios.map((serv) => {
              const IconComponent = serv.icon;
              return (
                <div 
                  key={serv.id}
                  className={`border border-white/10 bg-[#1E293B]/90 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-[#F97316]/50 transition-all duration-300 ${serv.gridSpan}`}
                >
                  <div className="p-8 text-left">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm font-bold text-[#F97316]">{serv.number}</span>
                      <IconComponent className="w-6 h-6 text-[#F97316] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">{serv.title}</h3>
                    <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed mb-6">{serv.desc}</p>
                    
                    <ul className="space-y-3">
                      {serv.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-xs md:text-sm text-slate-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Foto técnica visible directamente */}
                  <div className="w-full aspect-[21/9] overflow-hidden border-t border-white/10 relative">
                    <img 
                      src={serv.image} 
                      alt={serv.title} 
                      className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          6. PREVENCIÓN DE RIESGOS Y MEDIO AMBIENTE
          ------------------------------------------------------------- */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 lg:px-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Imagen de compromiso ambiental */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="border border-white/15 p-2 bg-[#0F172A] relative group shadow-2xl">
              <div className="absolute bottom-4 right-4 font-mono text-xs font-bold text-[#F97316] z-10 bg-black/90 px-3 py-1.5 border border-[#F97316]/30">
                COMPROMISO AMBIENTAL // RYK
              </div>
              <img 
                src="/prospectos/ryk/page_5_img_1_Image35.jpg" 
                alt="Edificio Sustentable RYK" 
                className="w-full aspect-[4/3] object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col text-left">
            <div className="font-mono text-[#F97316] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              // SEGURIDAD Y ENTORNO
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6 uppercase">
              Prevención de Riesgos & Medio Ambiente
            </h2>
            <div className="w-20 h-1.5 bg-[#F97316] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Prevención */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm uppercase text-[#F97316] tracking-wider">
                  <HardHat className="w-5 h-5" />
                  Seguridad Ocupacional
                </div>
                <p className="text-slate-300 text-xs md:text-sm font-normal leading-relaxed">
                  Lo más importante es el cuidado de las personas. Operamos de acuerdo a la normativa legal vigente chilena:
                </p>
                <ul className="text-slate-200 text-xs md:text-sm space-y-2.5 list-none font-mono">
                  <li>• Reglamento Interno D.S. 40</li>
                  <li>• Obligación de Informar (ODI) D.S. 40</li>
                  <li>• Condiciones sanitarias D.S. 594</li>
                  <li>• Ley 20.123 (Subcontratación)</li>
                  <li>• Plan de Emergencia Activo</li>
                </ul>
              </div>

              {/* Medio Ambiente */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm uppercase text-[#F97316] tracking-wider">
                  <Leaf className="w-5 h-5" />
                  Compromiso Ambiental
                </div>
                <p className="text-slate-300 text-xs md:text-sm font-normal leading-relaxed">
                  Consideramos la conservación y protección del medio ambiente, sumándonos a estrategias de normalización internacional:
                </p>
                <ul className="text-slate-200 text-xs md:text-sm space-y-2.5 list-none font-mono">
                  <li>• Alineación a legislación nacional</li>
                  <li>• Calidad ambiental según el cliente</li>
                  <li>• Gestión activa de residuos de obra</li>
                  <li>• Políticas preventivas claras</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          7. SHOWCASE DE PROYECTOS (FOTOS TOTALMENTE EXPUESTAS)
          ------------------------------------------------------------- */}
      <section id="proyectos" className="relative z-10 py-24 bg-[#0B0D0E] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-left mb-16">
            <div className="font-mono text-[#F97316] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              // EXPERIENCIA EN TERRENO
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Proyectos Realizados
            </h2>
            <div className="w-20 h-1.5 bg-[#F97316] mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {proyectos.map((proj, idx) => (
              <div 
                key={idx}
                className="border border-white/10 bg-[#0F172A]/90 p-7 rounded-sm text-left flex flex-col justify-between hover:border-[#F97316]/50 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <span className="font-mono text-xs font-bold text-[#F97316] uppercase">OBRA REALIZADA // RYK</span>
                    <h3 className="text-xl font-black text-white mt-1 uppercase tracking-tight">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-slate-200 text-sm font-normal leading-relaxed mb-5">
                    {proj.desc}
                  </p>

                  <h4 className="font-bold text-xs text-[#F97316] uppercase tracking-wider mb-3">
                    Alcance técnico:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-xs md:text-sm text-slate-300 font-normal leading-relaxed">
                        <span className="text-[#F97316] font-mono font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fila de fotos reales expuestas sin interacción oculta */}
                <div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {proj.images.map((img, i) => (
                      <div 
                        key={i} 
                        className={`border border-white/15 p-1 bg-black rounded-sm aspect-[4/3] overflow-hidden group ${
                          proj.images.length === 1 ? 'col-span-2 aspect-[21/9]' : ''
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${proj.title} registro ${i + 1}`} 
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          8. CONTACTO & FORMULARIO
          ------------------------------------------------------------- */}
      <section id="contacto" className="relative z-10 py-24 bg-[#0F172A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 flex flex-col text-left justify-between">
            <div>
              <div className="font-mono text-[#F97316] text-xs font-bold tracking-[0.25em] uppercase mb-4">
                // ANTECEDENTES Y CONTACTO
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6 uppercase">
                Hablemos de tu Proyecto
              </h2>
              <div className="w-20 h-1.5 bg-[#F97316] mb-8" />
              <p className="text-slate-300 text-base font-normal leading-relaxed mb-8">
                Completa tus datos para agendar una evaluación técnica o contáctanos directamente a nuestra casilla oficial. Respondemos en un plazo máximo de 2 horas hábiles.
              </p>
            </div>

            {/* Ficha Técnica RUT / Legal */}
            <div className="border border-white/15 bg-[#1E293B] p-6 rounded-sm font-mono text-xs text-slate-300 space-y-4 shadow-xl">
              <div className="text-xs text-[#F97316] font-bold uppercase tracking-widest border-b border-white/10 pb-2">
                FICHA REGISTRO CONTRATISTA
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-slate-400 uppercase text-xs font-bold">Empresa</span>
                <span className="col-span-2 text-white font-bold">Servicios Obras Civiles Gloria Pizarro E.I.R.L</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-slate-400 uppercase text-xs font-bold">N° ROL ÚNICO</span>
                <span className="col-span-2 text-white font-bold">77.031.674-K</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-slate-400 uppercase text-xs font-bold">Representante</span>
                <span className="col-span-2 text-white font-bold">Gloria Pizarro Pérez</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-slate-400 uppercase text-xs font-bold">Domicilio Legal</span>
                <span className="col-span-2 text-slate-200">René Perí Fragerström #8876, Antofagasta</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-400 uppercase text-xs font-bold">E-Mail</span>
                <span className="col-span-2 text-[#F97316] font-bold select-all">rykserviciosobrasciviles@outlook.cl</span>
              </div>
            </div>
          </div>

          {/* Formulario a WhatsApp */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-5 text-left border border-white/15 bg-[#1E293B] p-8 rounded-sm relative shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#F97316]" />
                  
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Nombre de Contacto</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Juan Pérez" 
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/15 text-sm p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316] rounded-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Email Corporativo</label>
                    <input 
                      type="email" 
                      placeholder="ejemplo@empresa.cl" 
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/15 text-sm p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316] rounded-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Empresa / Mandante</label>
                    <input 
                      type="text" 
                      placeholder="Nombre de la compañía" 
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/15 text-sm p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316] rounded-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Detalles del Proyecto</label>
                    <textarea 
                      placeholder="Ubicación, alcances del movimiento de tierra, requerimientos de pavimentación..." 
                      rows={4}
                      value={formComments}
                      onChange={(e) => setFormComments(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/15 text-sm p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316] rounded-sm font-sans"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#F97316] hover:bg-white hover:text-[#0F172A] text-white font-black text-xs p-4.5 uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 mt-4 rounded-sm shadow-lg shadow-[#F97316]/20"
                  >
                    Enviar Solicitud de Obras
                    <Send className="w-4 h-4" />
                  </button>

                </motion.form>
              ) : (
                <motion.div 
                  key="submitted"
                  className="w-full h-full flex flex-col items-center justify-center text-center p-12 gap-4 border border-white/15 bg-[#1E293B] rounded-sm shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-xl uppercase tracking-tight text-white">¡SOLICITUD REDIRIGIDA!</h4>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                    Estimado {formName}, hemos redirigido tu solicitud a nuestro canal de WhatsApp para iniciar la evaluación del proyecto de inmediato.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 text-center font-mono text-xs tracking-wider uppercase border-t border-white/10 pt-8">
          <span className="text-slate-400">© 2026 RYK CONSTRUCCIONES ® // GLORIA PIZARRO E.I.R.L // </span>
          <a 
            href="https://www.hojacero.cl/casos/ryk-construcciones" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 opacity-35 hover:opacity-100 transition-all tracking-widest inline-block"
            title="HojaCero | Software de control de obras y sitios web a medida en Chile"
            aria-label="HojaCero - Ingeniería de Software, Infraestructura Digital y Soluciones SaaS de alto performance. Contacto: contacto@hojacero.cl"
          >
            BY HOJACERO.CL
          </a>
        </div>
      </section>

    </main>
  );
}
