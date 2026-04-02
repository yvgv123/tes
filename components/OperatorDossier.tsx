import Image from 'next/image';

export default function OperatorDossier() {
  return (
    <section
      id="dossier"
      className="w-full max-w-[95%] lg:max-w-[1600px] mx-auto px-[60px] pb-32 mt-24 lg:mt-40 pt-16 lg:pt-20"
    >
      {/* Header */}
      <div className="w-full flex items-center gap-4 mb-8 md:mb-12">
        <span className="text-[#f0abfc] text-sm md:text-base font-space font-bold tracking-widest">02_</span>
        <h2 className="text-brand-stone text-xl md:text-3xl font-sans font-bold uppercase tracking-wider">OPERATOR_DOSSIER</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-[#f0abfc]/30 via-brand-cyan/10 to-transparent ml-2 md:ml-4"></div>
      </div>

      {/* Dossier Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">

        {/* Left Photo Card */}
        <div className="w-full rounded-[10px] border border-sky-100/20 bg-brand-matte/50 p-[3px] flex flex-col relative overflow-hidden group lg:col-span-5 xl:col-span-5 shadow-[0_0_30px_rgba(0,240,255,0.02)]">
          <div className="w-full min-h-[420px] lg:min-h-[480px] relative rounded-[8px] border border-white/5 bg-[#171717] overflow-hidden flex flex-col justify-between">

            {/* Scanline BG */}
            <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(transparent_96%,rgba(255,255,255,0.15)_100%)] bg-[length:100%_45px]"></div>

            {/* Profile Photo */}
            <img
              src="/assets/media__1774962022927.png"
              alt="Operator Profile"
              className="absolute inset-0 w-full h-full object-cover object-top z-0 grayscale opacity-90"
            />

            {/* TOP SECRET Stamp */}
            <div className="absolute top-8 right-4 md:top-12 md:right-8 z-20 rotate-[12deg] pointer-events-none origin-center">
              <img
                src="/assets/media__1774962022968.png"
                alt="TOP SECRET"
                className="w-36 md:w-48 opacity-90 mix-blend-multiply brightness-[0.85] contrast-125"
              />
            </div>

            {/* Cyan Scanline */}
            <div className="absolute top-1/2 left-0 w-full z-10 flex items-center group-hover:top-[48%] transition-all duration-700 ease-in-out">
              <div className="w-full h-[1px] bg-brand-cyan/70 shadow-[0_0_10px_#00F0FF]"></div>
            </div>
            <div className="absolute top-[46%] left-4 w-12 h-[8%] border-l-[3px] border-brand-cyan/60 z-10 group-hover:top-[44%] transition-all duration-700"></div>
            <div className="absolute top-[46%] right-4 w-12 h-[8%] border-r-[3px] border-brand-cyan/60 z-10 group-hover:top-[44%] transition-all duration-700"></div>

            {/* Coordinates Box */}
            <div className="relative z-20 flex flex-col gap-1.5 bottom-0 left-0 bg-brand-matte/80 backdrop-blur-md p-4 md:p-5 rounded-tr-[10px] border-t border-r border-sky-100/10 mt-auto self-start">
              <span className="text-sky-100/60 text-[8px] md:text-[9.5px] font-space tracking-widest font-medium">COORD_X: [REDACTED]</span>
              <span className="text-sky-100/60 text-[8px] md:text-[9.5px] font-space tracking-widest font-medium">COORD_Y: [REDACTED]</span>
              <span className="text-brand-stone/70 text-[8px] md:text-[9.5px] font-space tracking-widest font-light mt-1">PROXY_BOUNCE: <span className="text-white font-medium">14ms</span></span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex-1 flex flex-col gap-6 lg:gap-8 lg:col-span-7 xl:col-span-7">

          {/* Main Data Box */}
          <div className="w-full h-auto p-6 md:p-8 relative bg-black/40 rounded-[10px] shadow-[0_0_20px_rgba(235,178,255,0.05),inset_0_0_15px_rgba(0,240,255,0.10)] border border-cyan-400/20 backdrop-blur-[10px] flex flex-col justify-start items-start gap-8">

            {/* Top Border Line */}
            <div className="w-11/12 h-[2px] absolute top-0 left-4 bg-gradient-to-r from-cyan-400/30 to-transparent"></div>

            {/* Origin Node */}
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="w-full text-sky-100 text-[13px] md:text-sm font-space leading-5 tracking-wider uppercase">[ ORIGIN NODE ]</div>
              <div className="w-full flex flex-col gap-4">
                <div className="text-stone-200/80 text-sm md:text-base font-sans leading-relaxed">
                  <span className="font-bold">2022 – 2025 :</span> SMK Negeri 1 Pundong (Teknik Jaringan Komputer &amp; Telekomunikasi).
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
                  { exe: 'figma.exe',                 status: 'ACTIVE',   active: true },
                  { exe: 'adobe_illustrator.exe',     status: 'ACTIVE',   active: true },
                  { exe: 'adobe_photoshop.exe',       status: 'ACTIVE',   active: true },
                  { exe: 'coreldraw_suite.exe',       status: 'STANDBY',  active: false },
                  { exe: 'generative_ai_modules',     status: 'ACTIVE',   active: true },
                  { exe: 'google_antigravity.exe',    status: 'ACTIVE',   active: true },
                ].map(({ exe, status, active }) => (
                  <div key={exe} className="w-full flex items-end justify-between gap-2 group cursor-default">
                    <div className="text-stone-200/50 group-hover:text-stone-200 transition-colors text-[10px] md:text-xs font-space whitespace-nowrap uppercase">&gt; execute: {exe}</div>
                    <div className={`flex-1 border-b border-dotted ${active ? 'border-brand-stone/10 group-hover:border-[#00F0FF]/40' : 'border-brand-stone/10 group-hover:border-stone-200/40'} transition-colors mb-1 mx-2`}></div>
                    <div className={`${active ? 'text-sky-100 group-hover:text-[#00F0FF] group-hover:drop-shadow-[0_0_5px_#00F0FF]' : 'text-brand-stone/40 group-hover:text-stone-200'} transition-all text-[10px] md:text-xs font-space tracking-widest whitespace-nowrap uppercase font-bold`}>[ {status} ]</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extract CV Button */}
          <button className="w-full md:w-fit self-start px-8 md:px-10 py-4 bg-[#E09DF8] hover:bg-[#F0ABFC] text-black font-space font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] transition-all rounded-[2px] shadow-[0_0_20px_rgba(224,157,248,0.2)] flex items-center justify-center gap-3 active:scale-95 group/btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover/btn:-mt-1 transition-all">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            EXTRACT_CV_DATA
          </button>

        </div>
      </div>
    </section>
  );
}
