'use client';

import { useEffect, useRef, useState } from 'react';
import { useOutlineColor } from '@/lib/OutlineColorContext';

const PRESET_COLORS = [
  { hex: '#69FEFF', label: 'Cyan'   },
  { hex: '#6091FF', label: 'Blue'   },
  { hex: '#7FFF6F', label: 'Green'  },
  { hex: '#BF4B26', label: 'Ember'  },
  { hex: '#5F3CFF', label: 'Violet' },
  { hex: '#FFFFFF', label: 'White'  },
];

const CANVAS_PX = 192;

interface ColorWheelPickerProps {
  onClose: () => void;
}

export default function ColorWheelPicker({ onClose }: ColorWheelPickerProps) {
  const { outlineColor, setOutlineColor } = useOutlineColor();
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const popupRef   = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pickerPos,  setPickerPos]  = useState<{ x: number; y: number } | null>(null);

  // Draw color wheel once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = CANVAS_PX / 2;
    const cy = CANVAS_PX / 2;
    const r  = CANVAS_PX / 2 - 2;

    for (let angle = 0; angle < 360; angle++) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0,   `hsl(${angle}, 0%, 100%)`);
      g.addColorStop(0.5, `hsl(${angle}, 100%, 50%)`);
      g.addColorStop(1,   `hsl(${angle}, 100%, 5%)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, ((angle - 1) * Math.PI) / 180, ((angle + 1) * Math.PI) / 180);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
    }

    const dark = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    dark.addColorStop(0,   'rgba(0,0,0,0.4)');
    dark.addColorStop(0.7, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = dark;
    ctx.fill();
  }, []);

  // Init picker dot to centre
  useEffect(() => {
    setPickerPos({ x: CANVAS_PX / 2, y: CANVAS_PX / 2 });
  }, []);

  // Sample color from canvas
  const sampleColor = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect   = canvas.getBoundingClientRect();
    const scaleX = CANVAS_PX / rect.width;
    const scaleY = CANVAS_PX / rect.height;
    const px = Math.max(0, Math.min(CANVAS_PX - 1, (clientX - rect.left) * scaleX));
    const py = Math.max(0, Math.min(CANVAS_PX - 1, (clientY - rect.top)  * scaleY));

    const d   = ctx.getImageData(px, py, 1, 1).data;
    const hex = '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join('');
    setOutlineColor(hex);
    // Store as fraction of canvas CSS size
    setPickerPos({ x: (clientX - rect.left) / rect.width, y: (clientY - rect.top) / rect.height });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    sampleColor(e.clientX, e.clientY);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) sampleColor(e.clientX, e.clientY);
  };
  const handlePointerUp = () => setIsDragging(false);

  // Close on outside click / touch
  useEffect(() => {
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e instanceof TouchEvent ? e.touches[0]?.target : e.target;
      if (popupRef.current && !popupRef.current.contains(target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close, { passive: true });
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [onClose]);

  // Picker dot position as percentage of rendered canvas area
  const dotLeft = pickerPos ? `${pickerPos.x * 100}%` : '50%';
  const dotTop  = pickerPos ? `${pickerPos.y * 100}%` : '50%';

  return (
    // fixed — always anchored below the navbar on all screen sizes
    // top: navbar is pt-4(16px) + py-3(12px) + ~20px content ≈ 48px, plus 12px gap = 60px
    // Using 76px gives a comfortable 12–16px gap below the navbar on all breakpoints
    <div
      ref={popupRef}
      className="fixed z-[200] right-4 sm:right-8"
      style={{
        top: '76px',
        width: 'min(calc(100vw - 32px), 288px)',
        filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.9))',
      }}
    >
      <div className="w-full relative bg-zinc-950 rounded-[10px] overflow-hidden border border-white/10">
        {/* Ambient glow BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-full bg-black" />
          <div
            className="absolute w-[469px] h-[462px] -right-28 -top-48 rounded-full"
            style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232,222,197,0.15) 0%, rgba(205,198,180,0) 100%)' }}
          />
          <div
            className="absolute w-[523px] h-[515px] -left-48 bottom-0 rounded-full"
            style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232,222,197,0.15) 0%, rgba(205,198,180,0) 100%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center gap-4 sm:gap-5">

          {/* Header */}
          <div className="w-full flex items-center justify-between">
            <span className="text-[9px] font-space tracking-[0.25em] uppercase text-white/40">
              OUTLINE_COLOR
            </span>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition-colors p-0.5"
              aria-label="Close color picker"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Color Wheel Canvas */}
          <div
            className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden cursor-crosshair flex-shrink-0"
            style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 0 20px ${outlineColor}33` }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_PX}
              height={CANVAS_PX}
              className="w-full h-full block"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />
            {pickerPos && (
              <div
                className="absolute w-5 h-5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: dotLeft,
                  top:  dotTop,
                  backgroundColor: outlineColor,
                  boxShadow: `0 0 0 2px white, 0 0 8px ${outlineColor}`,
                }}
              />
            )}
          </div>

          {/* Current color hex display */}
          <div className="w-full flex items-center gap-3">
            <div
              className="w-9 h-8 rounded-[3px] border border-white/20 flex-shrink-0 transition-colors duration-150"
              style={{ backgroundColor: outlineColor, boxShadow: `0 0 12px ${outlineColor}66` }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] text-white/30 font-space tracking-[0.2em] uppercase">Selected</span>
              <span className="text-[11px] text-white font-space font-bold tracking-wider uppercase truncate">
                {outlineColor.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Preset swatches */}
          <div className="w-full flex flex-col gap-2">
            <span className="text-[8px] text-white/30 font-space tracking-[0.2em] uppercase">Presets</span>
            <div className="flex gap-1.5 sm:gap-2">
              {PRESET_COLORS.map(({ hex, label }) => (
                <button
                  key={hex}
                  title={label}
                  onClick={() => setOutlineColor(hex)}
                  className="flex-1 h-7 rounded-[3px] border transition-all duration-150 min-w-0"
                  style={{
                    backgroundColor: hex,
                    borderColor: outlineColor === hex ? 'white' : 'rgba(255,255,255,0.15)',
                    boxShadow:   outlineColor === hex ? `0 0 10px ${hex}99` : 'none',
                    transform:   outlineColor === hex ? 'scale(1.05)' : 'scale(1)',
                  }}
                  aria-label={`Select ${label}`}
                />
              ))}
            </div>
          </div>

          {/* Apply / Reset */}
          <div className="w-full flex gap-2">
            <button
              onClick={() => setOutlineColor('#00F0FF')}
              className="flex-1 py-2 text-[9px] font-space tracking-[0.2em] uppercase text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 rounded-[3px] transition-all"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 text-[9px] font-space tracking-[0.2em] uppercase text-black font-bold rounded-[3px] transition-all"
              style={{ backgroundColor: outlineColor, boxShadow: `0 0 12px ${outlineColor}66` }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
