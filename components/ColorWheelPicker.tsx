'use client';

import { useEffect, useRef, useState } from 'react';
import { useOutlineColor } from '@/lib/OutlineColorContext';

const PRESET_COLORS = [
  { hex: '#000BD0', label: 'Blue' },
  { hex: '#33D522', label: 'Green' },
  { hex: '#D73C1A', label: 'Red' },
  { hex: '#C941AE', label: 'Pink' },
  { hex: '#00D6D3', label: 'Cyan' },
  { hex: '#FFFFFF', label: 'White' },
];

const CANVAS_PX = 192;

interface ColorWheelPickerProps {
  onClose: () => void;
}

export default function ColorWheelPicker({ onClose }: ColorWheelPickerProps) {
  const { outlineColor, setOutlineColor } = useOutlineColor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pickerPos, setPickerPos] = useState<{ x: number; y: number } | null>(null);

  // Draw color wheel once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = CANVAS_PX / 2;
    const cy = CANVAS_PX / 2;
    const r = CANVAS_PX / 2 - 2;

    for (let angle = 0; angle < 360; angle++) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `hsl(${angle}, 0%, 100%)`);
      g.addColorStop(0.5, `hsl(${angle}, 100%, 50%)`);
      g.addColorStop(1, `hsl(${angle}, 100%, 5%)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, ((angle - 1) * Math.PI) / 180, ((angle + 1) * Math.PI) / 180);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
    }

    const dark = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    dark.addColorStop(0, 'rgba(0,0,0,0.4)');
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

    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_PX / rect.width;
    const scaleY = CANVAS_PX / rect.height;
    const px = Math.max(0, Math.min(CANVAS_PX - 1, (clientX - rect.left) * scaleX));
    const py = Math.max(0, Math.min(CANVAS_PX - 1, (clientY - rect.top) * scaleY));

    const d = ctx.getImageData(px, py, 1, 1).data;
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
  const dotTop = pickerPos ? `${pickerPos.y * 100}%` : '50%';

  return (
    <div
      ref={popupRef}
      className="fixed z-[200] right-3 sm:right-6 md:right-8"
      style={{
        top: '76px',
        width: 'min(calc(100vw - 24px), 340px)',
      }}
    >
      <div className="w-full p-5 sm:p-6 bg-zinc-950 rounded-[10px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.80)] outline outline-1 outline-offset-[-1px] outline-white/5 backdrop-blur-[6px] flex flex-col justify-start items-start gap-5 sm:gap-6 overflow-hidden">

        {/* Header */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="inline-flex flex-col justify-start items-start">
            <span className="justify-center text-zinc-500 text-xs font-bold font-['JetBrains_Mono'] uppercase leading-5 tracking-[2.40px]">
              OUTLINE_COLOR
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-4 h-4 relative overflow-hidden flex items-center justify-center cursor-pointer group"
            aria-label="Close color picker"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1L9 9M1 9L9 1" stroke="#888" strokeWidth="1.5" strokeLinecap="round"
                className="group-hover:stroke-white transition-colors" />
            </svg>
          </button>
        </div>

        {/* Color Wheel Canvas */}
        <div className="w-full py-1 sm:py-2 inline-flex justify-center items-center">
          <div
            className="relative w-[55%] max-w-[192px] aspect-square rounded-full overflow-hidden cursor-crosshair flex-shrink-0"
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
                className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: dotLeft,
                  top: dotTop,
                  backgroundColor: outlineColor,
                  boxShadow: `0 1px 2px rgba(0,0,0,0.15)`,
                  border: '2px solid white',
                }}
              />
            )}
          </div>
        </div>

        {/* Selected color display */}
        <div className="self-stretch inline-flex justify-start items-center gap-3 sm:gap-4">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-[5px] flex-shrink-0 transition-colors duration-150"
            style={{ backgroundColor: outlineColor }}
          />
          <div className="inline-flex flex-col justify-start items-start">
            <span className="text-zinc-500 text-[8px] font-normal font-['JetBrains_Mono'] uppercase leading-4 sm:leading-5 tracking-wider">
              SELECTED
            </span>
            <span className="text-white text-sm sm:text-base font-bold font-['JetBrains_Mono'] uppercase leading-6 sm:leading-7">
              {outlineColor.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Presets */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2 sm:gap-3">
          <span className="text-zinc-500 text-[10px] font-normal font-['JetBrains_Mono'] uppercase leading-5 tracking-wider">
            PRESETS
          </span>
          <div className="self-stretch inline-flex justify-between items-start gap-1.5 sm:gap-2">
            {PRESET_COLORS.map(({ hex, label }) => (
              <button
                key={hex}
                title={label}
                onClick={() => setOutlineColor(hex)}
                className="flex-1 aspect-square max-w-[40px] rounded-[5px] transition-all duration-150 cursor-pointer border-2"
                style={{
                  backgroundColor: hex,
                  borderColor: outlineColor.toUpperCase() === hex.toUpperCase() ? 'white' : 'transparent',
                  boxShadow: outlineColor.toUpperCase() === hex.toUpperCase() ? `0 0 10px ${hex}99` : 'none',
                  transform: outlineColor.toUpperCase() === hex.toUpperCase() ? 'scale(1.08)' : 'scale(1)',
                }}
                aria-label={`Select ${label}`}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="self-stretch pt-1 sm:pt-2 flex flex-col justify-start items-start">
          <div className="self-stretch inline-flex justify-start items-start gap-2 sm:gap-3">
            <button
              onClick={() => setOutlineColor('#00F0FF')}
              className="flex-[0_0_auto] px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex justify-center items-center cursor-pointer hover:outline-white/25 transition-all"
            >
              <span className="text-center text-zinc-500 text-[11px] sm:text-xs font-bold font-['JetBrains_Mono'] leading-4 tracking-wider">
                RESET
              </span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg inline-flex justify-center items-center cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: outlineColor }}
            >
              <span className="text-center text-neutral-950 text-[11px] sm:text-xs font-bold font-['JetBrains_Mono'] leading-4 tracking-wider">
                APPLY
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
