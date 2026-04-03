'use client';

import Image from 'next/image';
import { useOutlineColor } from '@/lib/OutlineColorContext';

export default function HeroDashboard() {
  const { outlineColor } = useOutlineColor();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContact = () => {
    document.getElementById('comm_link')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main
      id="dashboard"
      className="w-full max-w-[95%] lg:max-w-[1600px] mx-auto"
      style={{ minHeight: '100svh', paddingTop: '80px', paddingLeft: 'clamp(16px, 4vw, 60px)', paddingRight: 'clamp(16px, 4vw, 60px)', paddingBottom: '20px', boxSizing: 'border-box' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch w-full h-full" style={{ minHeight: 'calc(100svh - 100px)' }}>

        {/* Card 1: System Info (Left Card) */}
        <div
          className="w-full lg:min-h-0 bg-gradient-to-l from-neutral-900 via-neutral-900/0 to-neutral-900/0 rounded-[10px] p-4 lg:p-5 flex flex-col relative overflow-hidden group backdrop-blur-md lg:col-span-7 xl:col-span-8 min-h-[70svh] transition-all duration-500"
          style={{
            border: `1px solid ${outlineColor}33`,
            boxShadow: `0 0 30px ${outlineColor}0D, 0 0 60px ${outlineColor}08, inset 0 0 20px ${outlineColor}05`,
          }}
        >

          {/* Hero Portrait Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-end opacity-90 pointer-events-none mix-blend-screen overflow-hidden">
            <Image
              src="/assets/ascii-art.png"
              alt="Operator Portrait"
              fill
              className="object-cover object-right"
              priority
            />
          </div>

          {/* Bottom Fading Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-matte via-brand-matte/60 to-transparent z-0 pointer-events-none"></div>

          {/* Spacer */}
          <div className="flex-1 z-10 relative"></div>

          {/* Bottom text block */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-stone shadow-[0_0_8px_#E5E2E1] rounded-[1px]"></span>
              <span className="text-[9px] text-brand-stone/60 tracking-[0.25em] font-space uppercase">Identity_Verified</span>
            </div>

            <h1 className="text-[52px] sm:text-[72px] lg:text-[90px] xl:text-[108px] font-black font-sans leading-[0.85] tracking-tighter uppercase relative w-fit">
              <span className="absolute -left-1 top-0 text-brand-cyan mix-blend-screen select-none">LOGIC<br />INTO ART</span>
              <span className="relative text-brand-stone select-none">LOGIC<br />INTO ART</span>
            </h1>

            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3 mt-1">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-brand-stone/50 tracking-[0.2em] font-space uppercase">Operator Identification</span>
                <span className="text-base lg:text-xl font-bold font-sans text-brand-stone uppercase tracking-wide">Galih Rangga S.</span>
                <span className="text-[8px] text-brand-stone/30 tracking-[0.2em] font-space font-light uppercase">0X7F_PROTOCOL_INITIATED</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scrollToProjects}
                  className="px-4 sm:px-5 py-2.5 bg-[#E09DF8] hover:bg-[#F0ABFC] text-black transition-all text-[9px] tracking-[0.2em] uppercase font-bold shadow-[0_0_15px_rgba(224,157,248,0.2)] rounded-[2px]"
                >
                  View_Archives
                </button>
                <button
                  onClick={scrollToContact}
                  className="px-4 sm:px-5 py-2.5 bg-transparent border border-brand-stone/20 hover:border-brand-stone/50 text-brand-stone hover:text-white transition-all text-[9px] tracking-[0.2em] uppercase font-bold backdrop-blur-sm rounded-[2px]"
                >
                  Establish_Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Wrapper */}
        <div className="w-full flex flex-col gap-3 lg:col-span-5 xl:col-span-4 lg:h-full">

          {/* Top Right Card: Current Node */}
          <div
            className="w-full flex-1 p-4 bg-[#171717]/60 rounded-[10px] backdrop-blur-md flex flex-col justify-between gap-2 relative overflow-hidden group transition-all duration-500"
            style={{
              border: `1px solid ${outlineColor}33`,
              boxShadow: `0 0 20px rgba(235,178,255,0.05), inset 0 0 15px ${outlineColor}1A`,
            }}
          >
            <div className="w-full flex justify-between items-start">
              <div className="text-brand-stone text-[9px] font-space leading-[1.8] tracking-[0.15em] uppercase">
                CURRENT_NODE : YOGYAKARTA, ID<br />
                DIRECTIVE&nbsp;&nbsp;&nbsp;&nbsp;: D4 MEDIA DESIGN (ISI YK)<br />
                CLEARANCE&nbsp;&nbsp;&nbsp;&nbsp;: INTERNSHIP &amp; FREELANCE
              </div>
              <div className="text-brand-cyan animate-pulse drop-shadow-[0_0_8px_#00F0FF] opacity-80 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
              </div>
            </div>
            <div className="w-full text-brand-stone/60 text-[11px] md:text-xs font-space leading-relaxed flex-1 mt-2">
              Combining advanced AI automation with precision UI/UX architecture. An operator who masters algorithmic tools to accelerate the creative process and build intuitive, human-centered interfaces.
            </div>
            <div className="w-full flex items-center gap-4 mt-auto">
              <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full shadow-[0_0_10px_#22C55E] animate-pulse shrink-0 relative mt-[1px]"></div>
              <div className="text-brand-stone text-[10px] md:text-xs tracking-[5px] uppercase font-space">STATUS: OPEN TO WORK</div>
            </div>
          </div>

          {/* Bottom Right Card: Technical Arsenal */}
          <div
            className="w-full flex-1 p-5 bg-[#171717]/60 rounded-[10px] backdrop-blur-[10px] flex flex-col justify-start items-start overflow-hidden group transition-all duration-500"
            style={{
              border: `1px solid ${outlineColor}33`,
              boxShadow: `0 0 20px rgba(235,178,255,0.05), inset 0 0 15px ${outlineColor}1A`,
            }}
          >
            <div className="w-full pb-4 flex flex-col justify-start items-start">
              <div className="w-full inline-flex justify-start items-center gap-3">
                <div className="inline-flex flex-col justify-start items-start">
                  <div className="w-2.5 h-2.5 bg-[#f0abfc] shadow-[0_0_8px_#f0abfc] rounded-sm animate-pulse"></div>
                </div>
                <div className="text-[#f0abfc] text-[11px] md:text-xs font-space font-bold uppercase tracking-wider drop-shadow-[0_0_5px_rgba(240,171,252,0.5)]">TECHNICAL_ARSENAL</div>
              </div>
            </div>

            <div className="w-full flex-1 relative flex flex-col justify-start items-start gap-4 mt-2">
              {[
                { label: 'INTERFACE_ENGINEERING', level: 'EXPERT' },
                { label: 'VECTOR_&_IMAGING', level: 'ADVANCED' },
                { label: 'NEURAL_PROMPTING', level: 'ADVANCED' },
                { label: 'SPATIAL_DYNAMICS', level: 'PROFICIENT' },
                { label: 'SYSTEM_ARCHITECTURE', level: 'PROFICIENT' },
              ].map(({ label, level }) => (
                <div key={label} className="w-full pb-3 border-b border-white/5 inline-flex justify-between items-end group/skill hover:border-[#f0abfc]/40 transition-colors cursor-default">
                  <div className="text-brand-stone/60 group-hover/skill:text-brand-stone transition-colors text-[10px] md:text-[11px] font-space uppercase">{label}</div>
                  <div className="text-sky-100 group-hover/skill:text-[#f0abfc] group-hover/skill:drop-shadow-[0_0_5px_#f0abfc] transition-all text-[10px] md:text-[11px] font-space uppercase font-bold tracking-widest">[ {level} ]</div>
                </div>
              ))}
              <div className="w-full mt-4 flex flex-col justify-start items-start">
                <div className="w-full text-sky-100/20 text-[8px] font-space tracking-[0.4em] font-light leading-snug break-all uppercase">
                  101010110100101010101010101000101010101010101111110010101010101010101010101101010101010101010101010101010101010101010
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
