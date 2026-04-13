'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from 'framer-motion';
import { projectsData, type Project } from '@/lib/projectsData';

/* ─── Constants ──────────────────────────────────────────────────── */
const SWIPE_THRESHOLD = 60;
const CARD_W = 896;
const CARD_H = 560;
const IMG_W = 384;   // w-96
const PAD_R = 48;    // p-12 right panel
// Ghost cards: 3 layers behind active (closest → farthest)
const GHOSTS = [
  { px: 16, opacity: 0.80, zIndex: 20, tabLeft: 289, text: 'FILE_02', borderA: 0.30, bgA: 0.6, textColor: 'rgb(240,249,255)' },
  { px: 32, opacity: 0.50, zIndex: 10, tabLeft: 145, text: 'FILE_03', borderA: 0.20, bgA: 0.5, textColor: 'rgba(240,249,255,0.7)' },
  { px: 48, opacity: 0.30, zIndex: 5, tabLeft: 1, text: 'FILE_04', borderA: 0.10, bgA: 0.4, textColor: 'rgba(240,249,255,0.5)' },
] as const;
// Extra top space for ghost overflow + tab above ghost
const GHOST_OVERFLOW = 48 + 32; // 48px (deepest ghost offset) + 32px (tab height)

/* ─── Hook: dynamic card scale ──────────────────────────────────── */
function useCardScale() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const compute = () => {
      const avail = el.clientWidth;
      setScale(Math.min(1, avail / CARD_W));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { wrapRef, scale };
}

/* ─── Ghost Tab ──────────────────────────────────────────────────── */
function GhostTab({
  leftPx, text, textColor, borderA, bgA,
}: { leftPx: number; text: string; textColor: string; borderA: number; bgA: number }) {
  return (
    <div style={{ position: 'absolute', left: leftPx, top: -31, width: 128, height: 32, zIndex: 2 }}>
      <svg width="100%" height="100%" viewBox="0 0 128 32" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {/* Black backing */}
        <polygon points="0,32 0,0 112,0 128,32" fill="#000" />
        {/* Zinc background */}
        <polygon points="0,32 0,0 112,0 128,32" fill={`rgba(39,39,42,${bgA})`} />
        {/* Cyan border (Left, Top, Sloped Right) */}
        <polyline points="0,32 0,0 112,0 128,32" fill="none" stroke={`rgba(0,240,255,${borderA})`} strokeWidth="2" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        padding: '0 16px',
        display: 'flex', alignItems: 'center',
      }}>
        <span style={{
          color: textColor, fontSize: 9,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 400, letterSpacing: '0.025em',
        }}>{text}</span>
      </div>
    </div>
  );
}

/* ─── Active Card Content ────────────────────────────────────────── */
function ActiveCardContent({ project, onOpenModal }: { project: Project; onOpenModal: (p: Project) => void }) {
  return (
    <>
      {/* Active fuchsia tab — moved outside the overflow hidden container to follow the drag */}
      <div style={{
        position: 'absolute', left: 432, top: -31, width: 128, height: 32, zIndex: 10,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 128 32" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
          <polygon points="0,32 0,0 112,0 128,32" fill="#000" />
          <polygon points="0,32 0,0 112,0 128,32" fill="#c026d3" />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', padding: '0 16px'
        }}>
          <span style={{ color: '#fff', fontSize: 9, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.025em' }}>{project.id.replace('ARCHIVE_', '')}</span>
        </div>
      </div>

      <div style={{
        width: '100%', height: '100%',
        background: '#22d3ee', /* activates as cyan BG visible beside image */
        display: 'flex', overflow: 'hidden', position: 'relative',
      }}>
        {/* DECRYPTED_ASSET badge — bottom-left of image panel */}
        <div style={{ position: 'absolute', left: 24, bottom: 24, zIndex: 3 }}>
          <div style={{ padding: '3px 12px', background: '#22d3ee', display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              color: '#0f766e', fontSize: 10, fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase', lineHeight: '16px', letterSpacing: '0.025em',
            }}>DECRYPTED_ASSET</span>
          </div>
        </div>

        {/* LEFT: Project image — w-96 (384px) × full height */}
        <motion.img
          key={`img-${project.id}`}
          src={project.image}
          alt={project.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55, ease: 'easeOut' }}
          style={{ width: IMG_W, height: '100%', objectFit: 'cover', flexShrink: 0 }}
        />

        {/* RIGHT: Info panel — flex-1, p-12, bg-gray-950, justify-between */}
        <div style={{
          flex: 1, alignSelf: 'stretch',
          padding: PAD_R,
          background: '#030712',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', alignItems: 'flex-start',
        }}>

          {/* TOP INFO BLOCK — Flex layout to naturally push down description */}
          <div style={{
            flex: 1, alignSelf: 'stretch',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            containerType: 'inline-size'
          }}>

            {/* ID row */}
            <div style={{
              width: '100%', display: 'flex',
              justifyContent: 'space-between', alignItems: 'flex-start',
              marginBottom: 32,
            }}>
              <motion.span
                key={`id-${project.id}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.10, duration: 0.3 }}
                style={{
                  color: '#67e8f9', fontSize: 12,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400, lineHeight: '16px', letterSpacing: '0.05em',
                }}
              >ID: {project.id}</motion.span>
              {/* Lock icon */}
              <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M2 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5H3C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7ZM2 19H14V9H2V19ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM2 19V9V19Z" fill="#67e8f9"/>
              </svg>
            </div>

            {/* Title */}
            <motion.div
              key={`title-${project.id}`}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: 'easeOut' }}
              style={{
                width: '100%',
                color: '#fff', fontSize: 'clamp(32px, 10cqi, 44px)', fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.1, textTransform: 'uppercase',
                textWrap: 'balance' as any,
                marginBottom: 24,
              }}
              dangerouslySetInnerHTML={{ __html: project.title }}
            />

            {/* Description */}
            <motion.div
              key={`desc-${project.id}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.4 }}
              style={{
                width: '100%',
              }}
            >
              <span style={{
                display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', color: 'rgba(255,255,255,0.8)',
                fontSize: 14, fontFamily: "'Inter', sans-serif",
                fontWeight: 400, lineHeight: '24px',
              }}>{project.desc}</span>
            </motion.div>
          </div>

          {/* CTA BUTTON — pt-8 */}
          <div style={{ paddingTop: 32 }}>
            <motion.button
              id="card-explore-btn"
              onClick={() => onOpenModal(project)}
              whileHover={{ backgroundColor: '#e879f9', boxShadow: '0 0 24px rgba(240,171,252,0.65)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              style={{
                padding: '16px 32px', background: '#f0abfc',
                border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
              }}
            >
              <span style={{
                width: 128, height: 16, textAlign: 'center',
                color: '#0f766e', fontSize: 12, fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: '16px', letterSpacing: '0.05em',
                pointerEvents: 'none',
              }}>EXPLORE_ARCHIVE</span>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Draggable Active Card ──────────────────────────────────────── */
function DraggableCard({
  project, exitDir, onSwipe, onOpenModal,
}: {
  project: Project;
  exitDir: number; // -1 left, 1 right
  onSwipe: (dir: number) => void;
  onOpenModal: (p: Project) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-400, 0, 400], [-10, 0, 10]);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 400) {
      const dir = info.offset.x > 0 || info.velocity.x > 0 ? 1 : -1;
      onSwipe(dir);
    }
  }

  return (
    <motion.div
      key={project.id}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      variants={{
        enter: { opacity: 0, scale: 0.88, y: 18 },
        center: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28, delay: 0.05 } },
        exit: (dir: number) => ({
          x: dir * 1200, opacity: 0, rotate: dir * 14,
          transition: { duration: 0.38, ease: [0.32, 0, 0.67, 0] },
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      custom={exitDir}
      style={{
        position: 'absolute', inset: 0,
        x, rotate, zIndex: 30, cursor: 'grab',
        boxShadow: '0 32px 64px -12px rgba(0,0,0,0.7)',
      }}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <ActiveCardContent project={project} onOpenModal={onOpenModal} />
    </motion.div>
  );
}

/* ─── Full Card Stack (fixed 896×560) ───────────────────────────── */
function CardStack({
  projects, exitDir, isAdvancing, onSwipe, onOpenModal,
}: {
  projects: Project[];
  exitDir: number;
  isAdvancing: boolean;
  onSwipe: (dir: number) => void;
  onOpenModal: (p: Project) => void;
}) {
  return (
    /* The stack root. Active card sits at left=0 top=0.
       Ghost cards overflow upward with negative top px.
       Parent must have overflow:visible. */
    <div style={{ position: 'relative', width: CARD_W, height: CARD_H }}>

      {/* Ghost cards — rendered back to front (deepest first) */}
      {GHOSTS.slice().reverse().map((g, ri) => {
        const realIdx = GHOSTS.length - 1 - ri; // 2 → 1 → 0
        // When advancing: each ghost moves one slot forward
        //   realIdx 0 (→ active slot 0px)  realIdx 1 (→ slot of realIdx 0)  realIdx 2 (→ slot of realIdx 1)
        const advPx = realIdx === 0 ? 0 : GHOSTS[realIdx - 1].px;
        const advOpacity = realIdx === 0 ? 1 : GHOSTS[realIdx - 1].opacity;
        const targetPx = isAdvancing ? advPx : g.px;
        const targetOpacity = isAdvancing ? advOpacity : g.opacity;

        const projIdx = (realIdx + 1) % projects.length;
        const tabText = projects[projIdx].id.replace('ARCHIVE_', '');

        return (
          <motion.div
            key={`ghost-slot-${realIdx}`}
            animate={{ left: targetPx, top: -targetPx, opacity: targetOpacity }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.9 }}
            style={{
              position: 'absolute',
              width: CARD_W, height: CARD_H,
              left: g.px, top: -g.px,   // initial (before first animate)
              zIndex: g.zIndex,
              background: `rgba(39,39,42,${g.bgA})`,
              boxShadow: 'inset 0px 0px 20px 1px rgba(0,240,255,0.20)',
              outline: `1px solid rgba(0,240,255,${g.borderA})`,
              outlineOffset: '-1px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <GhostTab
              leftPx={g.tabLeft}
              text={tabText}
              textColor={g.textColor}
              borderA={g.borderA}
              bgA={g.bgA}
            />
          </motion.div>
        );
      })}

      {/* Active card with AnimatePresence for enter/exit */}
      <AnimatePresence initial={false} custom={exitDir} mode="sync">
        <DraggableCard
          key={projects[0].id}
          project={projects[0]}
          exitDir={exitDir}
          onSwipe={onSwipe}
          onOpenModal={onOpenModal}
        />
      </AnimatePresence>
    </div>
  );
}

/* ─── Exported Section ───────────────────────────────────────────── */
export default function FolderStack({ onOpenModal }: { onOpenModal: (p: Project) => void }) {
  const [projects, setProjects] = useState(() => [...projectsData]);
  const [exitDir, setExitDir] = useState<number>(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const { wrapRef, scale } = useCardScale();

  const handleSwipe = useCallback((dir: number) => {
    setExitDir(dir);
    // Immediately rotate projects  (triggers active card exit via AnimatePresence)
    setIsAdvancing(true);   // ghost cards spring forward
    setProjects(prev => {
      const next = [...prev];
      next.push(next.shift()!);
      return next;
    });
    // After the active card has fully exited + new one is entering,
    // let the ghost cards spring back to their natural resting positions.
    setTimeout(() => setIsAdvancing(false), 420);
  }, []);

  // Visible height of the scaled card stack
  // = (CARD_H + GHOST_OVERFLOW) * scale
  const containerH = (CARD_H + GHOST_OVERFLOW) * scale;

  return (
    <section
      id="projects"
      className="w-full max-w-[95%] lg:max-w-[1600px] mx-auto
                 px-4 sm:px-8 lg:px-[60px]
                 pb-20 lg:pb-28 mt-0 lg:mt-4 pt-0
                 relative flex flex-col items-center"
    >
      {/* ── Section header ── */}
      <div className="w-full h-9 inline-flex justify-start items-center gap-4 mb-12 md:mb-20">
        <div className="inline-flex flex-col justify-start items-start">
          <span className="w-8 h-4 flex items-center justify-center text-fuchsia-300 text-xs font-normal font-['Space_Grotesk'] leading-4 tracking-[3.60px]">03_</span>
        </div>
        <div className="inline-flex flex-col justify-start items-start">
          <h2 className="w-auto h-9 flex items-center justify-center text-stone-200 text-3xl font-bold font-['Space_Grotesk'] uppercase leading-9">ENCRYPTED_FILES</h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-fuchsia-300/40 to-fuchsia-300/0"></div>
      </div>

      {/* ── Responsive card wrapper ── */}
      {/* wrapRef measures its own width to compute scale */}
      <div
        ref={wrapRef}
        style={{
          width: '100%',
          maxWidth: CARD_W,
          /* dynamic height so layout flows correctly at every scale */
          height: containerH,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Scaled inner: transform-origin bottom-center */}
        <div style={{
          position: 'absolute',
          /* push card bottom to sit at container bottom */
          bottom: 0,
          left: '50%',
          /* card natural width centred */
          width: CARD_W,
          marginLeft: -(CARD_W / 2),
          /* total unscaled height (card + ghost overflow above) */
          height: CARD_H + GHOST_OVERFLOW,
          transform: `scale(${scale})`,
          transformOrigin: 'bottom center',
        }}>
          {/* Ghost cards live in the top GHOST_OVERFLOW px; active card at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0,
            width: CARD_W, height: CARD_H,
            overflow: 'visible',
          }}>
            <CardStack
              projects={projects}
              exitDir={exitDir}
              isAdvancing={isAdvancing}
              onSwipe={handleSwipe}
              onOpenModal={onOpenModal}
            />
          </div>
        </div>
      </div>

      {/* ── Swipe hint ── */}
      <div
        className="mt-6 md:mt-10 text-center text-brand-stone/40 font-mono
                   text-xs md:text-sm flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ x: [0, 14, -14, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
          className="text-brand-cyan text-xl"
        >⟵ ⟶</motion.div>
        <span>[ DRAG LEFT OR RIGHT TO CYCLE DOSSIERS ]</span>
      </div>
    </section>
  );
}
