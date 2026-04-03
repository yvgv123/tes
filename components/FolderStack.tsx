'use client';

import { useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from 'framer-motion';
import { projectsData, type Project } from '@/lib/projectsData';

/* ─── Config ─────────────────────────────────────────────────────── */
const SWIPE_THRESHOLD = 80;

// Cards are rendered with a max width and scale for responsive sizing
const DEPTH_CONFIG = [
  { scale: 1,    y: 0,   opacity: 1,   zIndex: 30 },
  { scale: 0.95, y: -20, opacity: 0.8, zIndex: 20 },
  { scale: 0.90, y: -40, opacity: 0.5, zIndex: 10 },
];

/* ─── CSS string → React.CSSProperties ──────────────────────────── */
function parseCss(css: string): React.CSSProperties {
  return Object.fromEntries(
    css.split(';').filter(Boolean).map((s) => {
      const [k, ...v] = s.split(':');
      return [k.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()), v.join(':').trim()];
    })
  ) as React.CSSProperties;
}

const DEFAULT_IMG_CSS  = 'position:absolute;left:-10%;top:5%;width:90%;height:90%;object-fit:contain;z-index:1;';
// Uniform title: always 22px, bold, uppercase — ignores per-project font-size overrides
const UNIFORM_TITLE_STYLE: React.CSSProperties = {
  color: '#fff',
  fontSize: 22,
  fontWeight: 700,
  fontFamily: "'Space Grotesk', sans-serif",
  lineHeight: 1.2,
  textTransform: 'uppercase',
  marginBottom: 10,
};

/* ─── Ghost tab at card top ──────────────────────────────────────── */
function GhostTab({ offsetPct, text, borderOpacity, bgAlpha, color }: {
  offsetPct: string; text: string; borderOpacity: string; bgAlpha: string; color: string;
}) {
  return (
    <div style={{ position: 'absolute', left: offsetPct, top: '-31px', width: '120px', height: '32px', zIndex: 2 }}>
      <div style={{ position: 'absolute', inset: 0, background: '#000' }} />
      <div style={{
        position: 'absolute', inset: 0, padding: '8px 12px',
        background: `rgba(39,39,42,${bgAlpha})`,
        borderLeft:  `1px solid rgba(0,240,255,${borderOpacity})`,
        borderRight: `1px solid rgba(0,240,255,${borderOpacity})`,
        borderTop:   `1px solid rgba(0,240,255,${borderOpacity})`,
        display: 'flex', alignItems: 'center',
      }}>
        <span style={{ color, fontSize: '9px', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.05em', lineHeight: '12px' }}>{text}</span>
      </div>
    </div>
  );
}

/* ─── Single card ────────────────────────────────────────────────── */
function FolderCard({
  project, index, tabText, exitX, onSwipe, onOpenModal,
}: {
  project: Project;
  index: number;
  tabText: string;
  exitX: number;
  onSwipe: (dir: number) => void;
  onOpenModal: (p: Project) => void;
}) {
  const cfg    = DEPTH_CONFIG[Math.min(index, DEPTH_CONFIG.length - 1)];
  const isFront = index === 0;

  const x      = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-8, 0, 8]);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) onSwipe(info.offset.x > 0 ? 1 : -1);
  }

  return (
    <motion.div
      key={project.id}
      custom={exitX}
      variants={{
        initial: { y: cfg.y + 220, opacity: 0, scale: cfg.scale },
        animate: { y: cfg.y,       opacity: cfg.opacity, scale: cfg.scale,
                   transition: { type: 'spring', stiffness: 260, damping: 28, delay: index * 0.1 } },
        exit: (ex: number) => ({
          x: ex, opacity: 0,
          transition: { duration: 0.28, ease: 'easeIn' },
        }),
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        zIndex: cfg.zIndex,
        x:      isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        cursor: isFront ? 'grab' : 'default',
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={isFront ? handleDragEnd : undefined}
      whileDrag={isFront ? { cursor: 'grabbing' } : undefined}
    >
      {/* ── Ghost card body ── */}
      {!isFront && (
        <>
          <GhostTab
            offsetPct={index === 1 ? '35%' : '18%'}
            text={tabText}
            borderOpacity={index === 1 ? '0.30' : '0.20'}
            bgAlpha={index === 1 ? '0.6' : '0.5'}
            color={index === 1 ? 'rgb(240,249,255)' : 'rgba(240,249,255,0.7)'}
          />
          <div style={{
            width: '100%', height: '100%',
            background: `rgba(39,39,42,${index === 1 ? 0.6 : 0.5})`,
            boxShadow: 'inset 0 0 20px 1px rgba(0,240,255,0.20)',
            outline: `1px solid rgba(0,240,255,${index === 1 ? 0.30 : 0.20})`,
            outlineOffset: '-1px',
            backdropFilter: 'blur(10px)',
          }} />
        </>
      )}

      {/* ── Active front card body ── */}
      {isFront && (
        <>
          {/* Fuchsia active tab */}
          <div style={{ position: 'absolute', left: '52%', top: '-32px', width: '120px', height: '32px', background: '#c026d3', zIndex: 5 }} />

          <div style={{ width: '100%', height: '100%', display: 'flex', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)' }}>

            {/* LEFT: Artwork panel */}
            <div style={{ flex: 1, alignSelf: 'stretch', position: 'relative', overflow: 'hidden', background: project.leftPanelBg }}>
              <motion.img
                key={`art-${project.id}`}
                src={project.image}
                alt={project.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5, ease: 'easeOut' }}
                style={parseCss(project.customImgCss || DEFAULT_IMG_CSS)}
              />
              {/* DECRYPTED badge */}
              <div style={{ position: 'absolute', left: 16, bottom: 16, zIndex: 2 }}>
                <div style={{ padding: '3px 10px', background: '#22d3ee', display: 'inline-flex', alignItems: 'center' }}>
                  <span style={{ color: '#0f766e', fontSize: 9, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    DECRYPTED_ASSET
                  </span>
                </div>
              </div>
            </div>

              {/* RIGHT: Data panel */}
              <div style={{ flex: 1, alignSelf: 'stretch', padding: 'clamp(16px, 3vw, 40px)', background: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'hidden' }}>

                {/* ID + Lock */}
                <motion.div
                  key={`id-${project.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexShrink: 0 }}
                >
                  <span style={{ color: '#67e8f9', fontSize: 11, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.05em' }}>
                    ID: {project.id}
                  </span>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <rect x="1" y="8" width="14" height="11" rx="1" stroke="#67e8f9" strokeWidth="1.5" />
                    <path d="M4 8V5.5a4 4 0 0 1 8 0V8" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* Title — uniform size across all cards */}
                <motion.div
                  key={`title-${project.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.17, duration: 0.4, ease: 'easeOut' }}
                  style={UNIFORM_TITLE_STYLE}
                  dangerouslySetInnerHTML={{ __html: project.title }}
                />

                {/* Description */}
                <motion.div
                  key={`desc-${project.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.4 }}
                  style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: "'Inter',sans-serif", lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', flexShrink: 0 }}
                >
                  {project.desc}
                </motion.div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* CTA button — flexShrink:0 prevents clipping */}
                <div style={{ paddingTop: 12, flexShrink: 0 }}>
                  <motion.button
                    id="card-explore-btn"
                    onClick={() => onOpenModal(project)}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(240,171,252,0.75)', backgroundColor: '#e879f9' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{ padding: '10px 24px', background: '#f0abfc', border: 'none', cursor: 'pointer', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}
                  >
                    <span style={{ color: '#0f766e', fontSize: 11, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.05em', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      EXPLORE_ARCHIVE
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    );
  }

/* ─── Main exported component ────────────────────────────────────── */
export default function FolderStack({ onOpenModal }: { onOpenModal: (p: Project) => void }) {
  const [projects, setProjects] = useState(() => [...projectsData]);
  const [exitX,    setExitX]    = useState(0);

  function handleSwipe(dir: number) {
    setExitX(dir * 800);
    setProjects(prev => {
      const next = [...prev];
      next.push(next.shift()!);
      return next;
    });
  }

  const visible = projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="w-full max-w-[95%] lg:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[60px] pb-20 lg:pb-28 mt-0 lg:mt-4 pt-0 relative flex flex-col items-center"
    >
      {/* Section header */}
      <div className="w-full flex items-center justify-center gap-4 mb-12 md:mb-20">
        <span className="text-[#f0abfc] text-sm md:text-base font-space font-bold tracking-widest">03_</span>
        <h2 className="text-white text-2xl md:text-4xl font-black font-sans tracking-widest uppercase relative">
          <span className="absolute -left-1 text-brand-cyan mix-blend-screen opacity-50">ENCRYPTED_FILES</span>
          <span className="relative">ENCRYPTED_FILES</span>
        </h2>
      </div>

      {/* Card stack */}
      <div className="relative w-full max-w-[90vw] sm:max-w-[680px] mx-auto">
        {/* Fixed height on mobile, aspect-ratio on sm+ */}
        <div
          className="relative sm:hidden"
          style={{ height: '360px', overflow: 'visible' }}
        >
          <div className="absolute inset-0" style={{ overflow: 'visible' }}>
            <AnimatePresence initial={true} custom={exitX}>
              {visible.map((project, index) => (
                <FolderCard
                  key={project.id}
                  project={project}
                  index={index}
                  tabText={project.id}
                  exitX={exitX}
                  onSwipe={handleSwipe}
                  onOpenModal={onOpenModal}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div
          className="relative hidden sm:block"
          style={{ paddingTop: '62%', overflow: 'visible' }}
        >
          <div className="absolute inset-0" style={{ overflow: 'visible' }}>
            <AnimatePresence initial={true} custom={exitX}>
              {visible.map((project, index) => (
                <FolderCard
                  key={project.id}
                  project={project}
                  index={index}
                  tabText={project.id}
                  exitX={exitX}
                  onSwipe={handleSwipe}
                  onOpenModal={onOpenModal}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Swipe hint */}
      <div className="mt-8 md:mt-16 text-center text-brand-stone/40 font-mono text-xs md:text-sm flex flex-col items-center gap-2">
        <motion.div
          animate={{ x: [0, 12, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="text-brand-cyan text-lg"
        >
          ⟵ ⟶
        </motion.div>
        <span>[ DRAG LEFT OR RIGHT TO CYCLE DOSSIERS ]</span>
      </div>
    </section>
  );
}
