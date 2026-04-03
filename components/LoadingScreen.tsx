'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
      window.scrollTo(0, 0); // Reset scroll position to top
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-[#0A0A0A] flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Robot Mascot with Glitch floating effect */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                filter: [
                  'drop-shadow(0 0 10px rgba(0,240,255,0.2))',
                  'drop-shadow(0 0 25px rgba(0,240,255,0.8))',
                  'drop-shadow(0 0 10px rgba(0,240,255,0.2))'
                ]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative w-32 h-32 md:w-40 md:h-40 mb-8"
            >
              <Image 
                src="/assets/PXL_20260330_185353841 1.png"
                alt="System Mascot"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Initializing Text */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="text-white text-lg md:text-xl font-bold font-sans tracking-[0.2em] uppercase text-center relative">
                <span className="absolute -left-[2px] text-brand-cyan mix-blend-screen opacity-50 animate-pulse">SYSTEM_BOOT_SEQUENCE</span>
                SYSTEM_BOOT_SEQUENCE
              </h2>
              <p className="text-brand-stone/50 font-space text-[10px] md:text-xs tracking-widest uppercase">
                Loading Digital Fugitive OS...
              </p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 w-64 md:w-80 h-1.5 bg-white/5 rounded-full overflow-hidden border border-brand-cyan/20"
            >
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "circOut" }}
                className="h-full bg-brand-cyan shadow-[0_0_10px_#00F0FF]"
              />
            </motion.div>

            {/* Console Status Lines */}
            <div className="mt-6 h-12 flex flex-col items-center justify-start overflow-hidden">
              <motion.div
                animate={{ y: [0, -16, -32, -48] }}
                transition={{ duration: 2, times: [0, 0.4, 0.8, 1], type: "keyframes" }}
                className="flex flex-col items-center text-[9px] md:text-[10px] font-space text-brand-cyan/70 tracking-widest uppercase"
              >
                <span className="h-4 leading-4">&gt; Establishing Connection...</span>
                <span className="h-4 leading-4">&gt; Decrypting Assets...</span>
                <span className="h-4 leading-4">&gt; Interpolating Viewport...</span>
                <span className="h-4 leading-4">&gt; Bypass Complete. Welcome.</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
