'use client';

import Image from 'next/image';
import { useOutlineColor } from '@/lib/OutlineColorContext';

export default function OperatorDossier() {
  const { outlineColor } = useOutlineColor();

  // Hex → rgba helper
  const hex2rgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <section
      id="dossier"
      className="w-full max-w-[95%] lg:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[60px] pb-20 lg:pb-28 mt-20 lg:mt-28 pt-0"
    >
      {/* Header */}
      <div className="w-full flex items-center gap-4 mb-8 md:mb-12">
        <span className="text-[#f0abfc] text-sm md:text-base font-space font-bold tracking-widest">02_</span>
        <h2 className="text-brand-stone text-xl md:text-3xl font-sans font-bold uppercase tracking-wider">OPERATOR_DOSSIER</h2>
        {/* Header divider line — color follows outlineColor */}
        <div
          className="h-px flex-1 ml-2 md:ml-4 transition-all duration-500"
          style={{ background: `linear-gradient(to right, ${hex2rgba(outlineColor, 0.35)}, ${hex2rgba(outlineColor, 0.08)}, transparent)` }}
        />
      </div>

      {/* Dossier Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">

        {/* Left Photo Card */}
        <div className="w-full relative rounded-[10px] flex flex-col justify-start items-start self-stretch lg:col-span-5 xl:col-span-5 group">
          <div className="w-full h-full absolute top-0 left-0 opacity-20 bg-sky-100/10 rounded-full blur-[32px] pointer-events-none"></div>

          <div className="w-full relative rounded-[10px] flex flex-col justify-start items-start self-stretch" style={{ minHeight: 'clamp(400px, 60vw, 660px)' }}>
            <div className="w-full h-full absolute top-0 left-0 opacity-20 bg-sky-100/10 rounded-full blur-[32px] pointer-events-none"></div>

            {/* Main photo container — dynamic border + shadow */}
            <div
              className="w-full h-full self-stretch p-2 relative bg-neutral-900/60 rounded-[10px] backdrop-blur-[10px] flex flex-col justify-center items-start overflow-hidden transition-all duration-500"
              style={{
                minHeight: 'clamp(400px, 60vw, 660px)',
                outline: `1px solid ${hex2rgba(outlineColor, 0.4)}`,
                outlineOffset: '-1px',
                boxShadow: `0 0 20px 0 rgba(235,178,255,0.05), inset 0 0 15px 1px ${hex2rgba(outlineColor, 0.10)}`,
              }}
            >

              <div className="w-full h-full absolute inset-0 opacity-80 mix-blend-screen bg-blend-saturation bg-white overflow-hidden rounded-[8px]">
                <img
                  className="w-full h-full object-cover object-top absolute z-0 grayscale mix-blend-multiply"
                  src="/assets/media__1774962022927.png"
                  alt="Operator Dossier"
                />
              </div>

              {/* Inner border */}
              <div className="absolute inset-[1px] md:inset-[2px] rounded-lg border border-sky-100/20 pointer-events-none z-10"></div>

              {/* Corner TL — dynamic color */}
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-[6%] left-[7%] z-20 pointer-events-none transition-all duration-500"
                style={{ borderLeft: `2px solid ${hex2rgba(outlineColor, 0.7)}`, borderTop: `2px solid ${hex2rgba(outlineColor, 0.7)}` }}
              />

              {/* Corner BR — dynamic color */}
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute bottom-[10%] right-[7%] z-20 pointer-events-none transition-all duration-500"
                style={{ borderRight: `2px solid ${hex2rgba(outlineColor, 0.7)}`, borderBottom: `2px solid ${hex2rgba(outlineColor, 0.7)}` }}
              />

              {/* Horizontal scan line — dynamic glow color */}
              <div
                className="w-[94%] left-[3%] top-1/2 absolute h-px bg-sky-100/30 z-20 pointer-events-none group-hover:top-[52%] transition-all duration-1000 ease-in-out"
                style={{ boxShadow: `0 0 10px 0 ${outlineColor}` }}
              />

              {/* TOP SECRET stamp */}
              <img
                className="w-48 sm:w-56 md:w-72 lg:w-80 absolute top-[-5%] md:top-[-6%] right-[-8%] md:right-[-12%] origin-top-left rotate-[6.94deg] mix-blend-multiply brightness-[0.85] contrast-125 z-30 pointer-events-none"
                src="/assets/media__1774962022968.png"
                alt="TOP SECRET"
              />

              {/* Coordinates */}
              <div className="absolute bottom-[5%] left-[5%] flex flex-col justify-start items-start gap-1 z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="text-sky-100 text-[10px] font-normal font-space leading-4 uppercase">COORD_X: [ REDACTED ]</div>
                <div className="text-sky-100 text-[10px] font-normal font-space leading-4 uppercase">COORD_Y: [ REDACTED ]</div>
                <div className="text-sky-100 text-[10px] font-normal font-space leading-4 uppercase">PROXY_BOUNCE: 14ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex-1 flex flex-col gap-6 lg:gap-8 lg:col-span-7 xl:col-span-7">

          {/* Main Data Box — dynamic border + shadow */}
          <div
            className="w-full h-auto p-5 md:p-8 relative bg-black/40 rounded-[10px] backdrop-blur-[10px] flex flex-col justify-start items-start gap-6 md:gap-8 transition-all duration-500"
            style={{
              border: `1px solid ${hex2rgba(outlineColor, 0.20)}`,
              boxShadow: `0 0 20px rgba(235,178,255,0.05), inset 0 0 15px ${hex2rgba(outlineColor, 0.10)}`,
            }}
          >

            {/* Top Border Line — dynamic gradient */}
            <div
              className="w-11/12 h-[2px] absolute top-0 left-4 transition-all duration-500"
              style={{ background: `linear-gradient(to right, ${hex2rgba(outlineColor, 0.35)}, transparent)` }}
            />

            {/* Origin Node */}
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="w-full text-sky-100 text-[13px] md:text-sm font-space leading-5 tracking-wider uppercase">[ ORIGIN NODE ]</div>
              <div className="w-full flex flex-col gap-4">
                <div className="text-stone-200/80 text-sm md:text-base font-sans leading-relaxed">
                  <span className="font-bold">2022 – 2025 :</span> SMK Negeri 1 Pundong (Computer Network &amp; Telecommunication Engineering).
                </div>
                <div className="text-stone-200/80 text-sm md:text-base font-sans leading-relaxed">
                  <span className="font-bold">2025 – PRES :</span> Institut Seni Indonesia (ISI) Yogyakarta (D4 Desain Media). Status: Active deployment in bridging network logic with visual communications.
                </div>
              </div>
            </div>

            {/* Software Stack */}
            <div className="w-full flex flex-col justify-start items-start gap-4 flex-1">
              <div className="w-full text-[#f0abfc] text-[13px] md:text-sm font-space leading-5 tracking-wider uppercase mb-1 drop-shadow-[0_0_5px_rgba(240,171,252,0.3)]">[ SOFTWARE_STACK ]</div>
              <div className="w-full flex flex-col gap-4 overflow-hidden">
                {[
                  { exe: 'figma.exe', status: 'ACTIVE', active: true },
                  { exe: 'adobe_illustrator.exe', status: 'ACTIVE', active: true },
                  { exe: 'adobe_photoshop.exe', status: 'ACTIVE', active: true },
                  { exe: 'coreldraw_suite.exe', status: 'STANDBY', active: false },
                  { exe: 'generative_ai_modules', status: 'ACTIVE', active: true },
                  { exe: 'google_antigravity.exe', status: 'ACTIVE', active: true },
                ].map(({ exe, status, active }) => (
                  <div key={exe} className="w-full flex items-end justify-between gap-2 group/row cursor-default">
                    <div className="text-stone-200/50 group-hover/row:text-stone-200 transition-colors text-[10px] md:text-xs font-space whitespace-nowrap uppercase">&gt; execute: {exe}</div>
                    {/* Dotted separator — changes color on hover using outlineColor */}
                    <div
                      className="flex-1 border-b border-dotted border-brand-stone/10 mb-1 mx-2 transition-colors duration-200 group-hover/row:border-opacity-100"
                      style={{ '--hover-color': hex2rgba(outlineColor, 0.4) } as React.CSSProperties}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = active ? hex2rgba(outlineColor, 0.4) : 'rgba(255,255,255,0.25)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
                    />
                    {/* Status badge — glow color follows outlineColor for active items */}
                    <div
                      className={`transition-all text-[10px] md:text-xs font-space tracking-widest whitespace-nowrap uppercase font-bold ${active ? 'text-sky-100' : 'text-brand-stone/40'}`}
                      onMouseEnter={e => {
                        if (active) {
                          e.currentTarget.style.color = outlineColor;
                          e.currentTarget.style.filter = `drop-shadow(0 0 5px ${outlineColor})`;
                        } else {
                          e.currentTarget.style.color = 'rgba(228,228,231,1)';
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.filter = '';
                      }}
                    >
                      [ {status} ]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extract CV Button */}
          <a
            href="/assets/CV kreatif_Galih Rangga Saputro.pdf"
            download="CV kreatif_Galih Rangga Saputro.pdf"
            className="w-full md:w-fit self-start px-8 md:px-10 py-4 bg-[#E09DF8] hover:bg-[#F0ABFC] text-black font-space font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] transition-all rounded-[2px] shadow-[0_0_20px_rgba(224,157,248,0.2)] flex items-center justify-center gap-3 active:scale-95 group/btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover/btn:-mt-1 transition-all">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            EXTRACT_CV_DATA
          </a>

        </div>
      </div>
    </section>
  );
}
