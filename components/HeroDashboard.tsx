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
              <div className="text-brand-cyan animate-pulse drop-shadow-[0_0_8px_#00F0FF] opacity-80 shrink-0 flex justify-center items-center">
                <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-auto">
                  <path d="M3.65625 17.6875C2.53125 16.5417 1.64062 15.2135 0.984375 13.7031C0.328125 12.1927 0 10.5729 0 8.84375C0 7.09375 0.328125 5.46354 0.984375 3.95312C1.64062 2.44271 2.53125 1.125 3.65625 0L5.4375 1.78125C4.52083 2.69792 3.80208 3.76042 3.28125 4.96875C2.76042 6.17708 2.5 7.46875 2.5 8.84375C2.5 10.2396 2.76042 11.5417 3.28125 12.75C3.80208 13.9583 4.52083 15.0104 5.4375 15.9062L3.65625 17.6875ZM7.1875 14.1562C6.52083 13.4688 5.98958 12.6719 5.59375 11.7656C5.19792 10.8594 5 9.88542 5 8.84375C5 7.78125 5.19792 6.79688 5.59375 5.89062C5.98958 4.98438 6.52083 4.19792 7.1875 3.53125L8.96875 5.3125C8.51042 5.77083 8.15104 6.30208 7.89062 6.90625C7.63021 7.51042 7.5 8.15625 7.5 8.84375C7.5 9.53125 7.63021 10.1771 7.89062 10.7812C8.15104 11.3854 8.51042 11.9167 8.96875 12.375L7.1875 14.1562ZM12.5 11.3438C11.8125 11.3438 11.224 11.099 10.7344 10.6094C10.2448 10.1198 10 9.53125 10 8.84375C10 8.15625 10.2448 7.56771 10.7344 7.07812C11.224 6.58854 11.8125 6.34375 12.5 6.34375C13.1875 6.34375 13.776 6.58854 14.2656 7.07812C14.7552 7.56771 15 8.15625 15 8.84375C15 9.53125 14.7552 10.1198 14.2656 10.6094C13.776 11.099 13.1875 11.3438 12.5 11.3438ZM17.8125 14.1562L16.0312 12.375C16.4896 11.9167 16.849 11.3854 17.1094 10.7812C17.3698 10.1771 17.5 9.53125 17.5 8.84375C17.5 8.15625 17.3698 7.51042 17.1094 6.90625C16.849 6.30208 16.4896 5.77083 16.0312 5.3125L17.8125 3.53125C18.4792 4.19792 19.0104 4.98438 19.4062 5.89062C19.8021 6.79688 20 7.78125 20 8.84375C20 9.88542 19.8021 10.8594 19.4062 11.7656C19.0104 12.6719 18.4792 13.4688 17.8125 14.1562ZM21.3438 17.6875L19.5625 15.9062C20.4792 14.9896 21.1979 13.9271 21.7188 12.7188C22.2396 11.5104 22.5 10.2188 22.5 8.84375C22.5 7.44792 22.2396 6.14583 21.7188 4.9375C21.1979 3.72917 20.4792 2.67708 19.5625 1.78125L21.3438 0C22.4688 1.125 23.3594 2.44271 24.0156 3.95312C24.6719 5.46354 25 7.09375 25 8.84375C25 10.5729 24.6719 12.1927 24.0156 13.7031C23.3594 15.2135 22.4688 16.5417 21.3438 17.6875Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="w-full text-brand-stone/60 text-[11px] md:text-xs font-space leading-relaxed flex-1 mt-2">
              Ketertertarikan saya pada bidang Desain Teknologi, yang menghubungkan antara logika teknis dan estetika visual secara seimbang. Kegemaran utama saya adalah desain antarmuka, di mana saya memadukan pemahaman mendalam tentang teknologi sistem dengan kreativitas untuk membangun antarmuka yang fungsional, intuitif, dan berpusat pada pengguna.
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
                  <div className="w-2.5 h-2.5 drop-shadow-[0_0_8px_#f0abfc] animate-pulse flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 7V3.5H7V7H3.5ZM4.66667 5.83333H5.83333V4.66667H4.66667V5.83333ZM3.5 10.5V9.33333H2.33333C2.0125 9.33333 1.73785 9.2191 1.50937 8.99063C1.2809 8.76215 1.16667 8.4875 1.16667 8.16667V7H0V5.83333H1.16667V4.66667H0V3.5H1.16667V2.33333C1.16667 2.0125 1.2809 1.73785 1.50937 1.50937C1.73785 1.2809 2.0125 1.16667 2.33333 1.16667H3.5V0H4.66667V1.16667H5.83333V0H7V1.16667H8.16667C8.4875 1.16667 8.76215 1.2809 8.99063 1.50937C9.2191 1.73785 9.33333 2.0125 9.33333 2.33333V3.5H10.5V4.66667H9.33333V5.83333H10.5V7H9.33333V8.16667C9.33333 8.4875 9.2191 8.76215 8.99063 8.99063C8.76215 9.2191 8.4875 9.33333 8.16667 9.33333H7V10.5H5.83333V9.33333H4.66667V10.5H3.5ZM8.16667 8.16667V2.33333H2.33333V8.16667H8.16667Z" fill="#EBB2FF"/>
                    </svg>
                  </div>
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
