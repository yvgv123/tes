'use client';

import { useEffect, useRef, useState } from 'react';
import { projectsData, Project } from '@/lib/projectsData';

interface ProjectStackProps {
  onOpenModal: (project: Project) => void;
}

export default function ProjectStack({ onOpenModal }: ProjectStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentActiveRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Ghost tab helper
  const ghostTab = (leftPx: number, text: string, color: string, borderOpacity: string, bgAlpha: string) => (
    <div style={{ position: 'absolute', left: `${leftPx}px`, top: '-31px', width: '128px', height: '32px', zIndex: 2 }}>
      <div style={{ position: 'absolute', inset: 0, background: '#000' }}></div>
      <div style={{
        position: 'absolute', inset: 0, padding: '8px 16px',
        background: `rgba(39,39,42,${bgAlpha})`,
        borderLeft: `1px solid rgba(0,240,255,${borderOpacity})`,
        borderRight: `1px solid rgba(0,240,255,${borderOpacity})`,
        borderTop: `1px solid rgba(0,240,255,${borderOpacity})`,
        display: 'flex', alignItems: 'center',
      }}>
        <span style={{ color, fontSize: '9px', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.05em', lineHeight: '12px' }}>{text}</span>
      </div>
    </div>
  );

  const project = projectsData[activeIndex];

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    const total = projectsData.length;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: 'center center',
      end: `+=${total * 150}px`,
      scrub: true,
      onUpdate: (self: any) => {
        let idx = Math.floor(self.progress * (total - 1));
        idx = Math.max(0, Math.min(idx, total - 1));
        if (idx !== currentActiveRef.current) {
          currentActiveRef.current = idx;
          setActiveIndex(idx);
        }
      },
    });

    return () => st.kill();
  }, []);

  const defaultImgStyle = "position:absolute;left:-32px;top:24px;width:512px;height:512px;object-fit:contain;z-index:1;";
  const defaultTitleStyle = "color:#fff;font-size:48px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:48px;text-transform:uppercase;";

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full max-w-[95%] lg:max-w-[1600px] mx-auto px-[60px] pb-32 mt-24 lg:mt-40 pt-16 relative flex flex-col items-center"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-center gap-4 mb-16 md:mb-24">
        <span className="text-[#f0abfc] text-sm md:text-base font-space font-bold tracking-widest">03_</span>
        <h2 className="text-white text-2xl md:text-4xl font-black font-sans tracking-widest uppercase relative">
          <span className="absolute -left-1 text-brand-cyan mix-blend-screen opacity-50">ENCRYPTED_FILES</span>
          <span className="relative">ENCRYPTED_FILES</span>
        </h2>
      </div>

      {/* Stack Container */}
      <div className="relative w-full max-w-[1000px] mx-auto" id="project-stack" style={{ height: '640px', cursor: 'grab' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* 896×560 card frame, anchored to bottom-center */}
          <div id="card-frame" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '896px', height: '560px' }}>

            {/* Ghost Card 3 */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', left: '48px', top: '-48px', opacity: 0.3, background: 'rgba(39,39,42,0.4)', boxShadow: 'inset 0 0 20px 1px rgba(0,240,255,0.20)', outline: '1px solid rgba(0,240,255,0.10)', outlineOffset: '-1px', backdropFilter: 'blur(10px)' }}>
              {ghostTab(1, 'FILE_04', 'rgba(240,249,255,0.5)', '0.10', '0.4')}
            </div>

            {/* Ghost Card 2 */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', left: '32px', top: '-32px', opacity: 0.5, background: 'rgba(39,39,42,0.5)', boxShadow: 'inset 0 0 20px 1px rgba(0,240,255,0.20)', outline: '1px solid rgba(0,240,255,0.20)', outlineOffset: '-1px', backdropFilter: 'blur(10px)' }}>
              {ghostTab(145, 'FILE_03', 'rgba(240,249,255,0.7)', '0.20', '0.5')}
            </div>

            {/* Ghost Card 1 */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', left: '16px', top: '-16px', opacity: 0.8, background: 'rgba(39,39,42,0.6)', boxShadow: 'inset 0 0 20px 1px rgba(0,240,255,0.20)', outline: '1px solid rgba(0,240,255,0.30)', outlineOffset: '-1px', backdropFilter: 'blur(10px)' }}>
              {ghostTab(289, 'FILE_02', 'rgb(240,249,255)', '0.30', '0.6')}
            </div>

            {/* Active Front Card */}
            <div id="active-front-card" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)' }}>

              {/* Active Tab (fuchsia) */}
              <div style={{ position: 'absolute', left: '432px', top: '-32px', width: '128px', height: '32px', background: '#c026d3', zIndex: 5 }}></div>

              {/* Left Panel: Artwork */}
              <div id="card-left-panel" style={{ flex: 1, alignSelf: 'stretch', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden', background: project.leftPanelBg }}>

                {/* Artwork */}
                <img
                  id="card-artwork"
                  src={project.image}
                  alt="Artwork"
                  style={Object.fromEntries(
                    (project.customImgCss || defaultImgStyle)
                      .split(';')
                      .filter(Boolean)
                      .map(s => {
                        const [k, ...v] = s.split(':');
                        return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v.join(':').trim()];
                      })
                  ) as React.CSSProperties}
                />

                {/* DECRYPTED_ASSET Badge */}
                <div style={{ position: 'absolute', left: '24px', top: '518px', zIndex: 2 }}>
                  <div style={{ padding: '3px 12px', background: '#22d3ee', display: 'inline-flex', alignItems: 'center' }}>
                    <span style={{ color: '#0f766e', fontSize: '10px', fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '16px' }}>DECRYPTED_ASSET</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Data Block */}
              <div style={{ flex: 1, alignSelf: 'stretch', padding: '48px', background: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                {/* Top info block */}
                <div style={{ position: 'relative', width: '100%', height: '256px' }}>

                  {/* ID + Lock Icon */}
                  <div style={{ position: 'absolute', left: 0, top: 0, width: '320px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span id="card-id" style={{ color: '#67e8f9', fontSize: '12px', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.05em', lineHeight: '16px' }}>ID: {project.id}</span>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '1px' }}>
                      <rect x="1" y="8" width="14" height="11" rx="1" stroke="#67e8f9" strokeWidth="1.5" />
                      <path d="M4 8V5.5a4 4 0 0 1 8 0V8" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Title */}
                  <div style={{ position: 'absolute', left: 0, top: '48px', width: '320px' }}>
                    <div
                      id="card-title"
                      style={Object.fromEntries(
                        (project.customTitleCss || defaultTitleStyle)
                          .split(';')
                          .filter(Boolean)
                          .map(s => {
                            const [k, ...v] = s.split(':');
                            return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v.join(':').trim()];
                          })
                      ) as React.CSSProperties}
                      dangerouslySetInnerHTML={{ __html: project.title }}
                    />
                  </div>

                  {/* Description */}
                  <div style={{ position: 'absolute', left: 0, top: '167px', width: '320px', paddingBottom: '1px' }}>
                    <div id="card-desc" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontFamily: "'Inter',sans-serif", lineHeight: '24px', height: '96px', overflow: 'hidden' }}>
                      {project.desc}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div style={{ width: '100%', paddingTop: '32px' }}>
                  <button
                    id="card-explore-btn"
                    onClick={() => onOpenModal(project)}
                    style={{ padding: '16px 32px', background: '#f0abfc', border: 'none', cursor: 'pointer', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', transition: 'background 0.2s' }}
                  >
                    <span style={{ color: '#0f766e', fontSize: '12px', fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.05em', lineHeight: '16px', textAlign: 'center', width: '128px', display: 'block' }}>
                      EXPLORE_ARCHIVE
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="mt-16 text-center text-brand-stone/40 font-mono text-xs md:text-sm flex flex-col items-center gap-2 justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span>[ GESER KE KIRI ATAU KANAN UNTUK MENGGANTI DOSSIERS ]</span>
      </div>
    </section>
  );
}
