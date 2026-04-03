'use client';

import { useEffect, useRef } from 'react';
import { Project } from '@/lib/projectsData';

interface DossierModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

export default function DossierModal({ isOpen, project, onClose }: DossierModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !project) return;
    const gsap = (window as any).gsap;
    if (!gsap) return;

    document.body.style.overflow = 'hidden';
    gsap.fromTo(modalRef.current, { backgroundColor: 'rgba(0,0,0,0)' }, { backgroundColor: 'rgba(0,0,0,0.85)', duration: 0.3 });
    gsap.fromTo(contentRef.current, { scale: 0.95, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)', delay: 0.1 });

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, project]);

  function handleClose() {
    const gsap = (window as any).gsap;
    if (!gsap) { onClose(); return; }
    gsap.to(contentRef.current, { scale: 0.95, opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' });
    gsap.to(modalRef.current, {
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 0.3,
      delay: 0.1,
      onComplete: () => onClose(),
    });
  }

  if (!isOpen || !project) return null;

  return (
    <div
      ref={modalRef}
      onClick={(e) => { if (e.target === modalRef.current) handleClose(); }}
      className="fixed inset-0 z-[100] backdrop-blur-[6px] flex justify-center items-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0)' }}
    >
      <div
        ref={contentRef}
        id="dossier-modal-content"
        className="w-[848px] h-auto md:h-[566.8px] max-w-full bg-neutral-700/40 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 backdrop-blur-[10px] flex flex-col justify-start items-start transform overflow-hidden lg:overflow-visible relative"
        style={{ opacity: 0 }}
      >
        {/* Mobile-only floating close button — top-right corner */}
        <button
          onClick={handleClose}
          className="sm:hidden absolute top-3 right-3 z-20 p-2 bg-neutral-500/40 hover:bg-neutral-500/70 transition-colors flex justify-center items-center group cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-fuchsia-300 group-hover:text-white transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Header Bar */}
        <div className="w-full p-4 bg-neutral-900/75 border-b border-gray-700/30 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex justify-start items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-col justify-start items-start">
              <div className="w-4 h-5 border-[1.5px] border-stone-200 flex flex-col justify-center items-center gap-[2px]">
                <div className="w-2.5 h-[1.5px] bg-stone-200"></div>
                <div className="w-2.5 h-[1.5px] bg-stone-200"></div>
                <div className="w-2 h-[1.5px] bg-stone-200 mr-0.5"></div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="text-fuchsia-300 text-[10px] uppercase font-space tracking-wide">
                DOSSIER_ID: <span>{project.id}</span>
              </div>
              <div className="text-stone-200 text-lg sm:text-xl font-bold font-space leading-6 sm:leading-7">
                PROJECT: {project.title.replace(/<br>/gi, ' ')}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex justify-start items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <div className="flex justify-start items-start gap-2">
              <div className="px-2 pt-[3px] pb-1 bg-neutral-700 outline outline-1 outline-offset-[-1px] outline-sky-100/20 flex flex-col justify-start items-start">
                <div className="text-sky-100 text-[9px] font-space leading-3 uppercase">STATUS: {project.status}</div>
              </div>
              <div className="px-2 pt-[3px] pb-1 bg-neutral-700 outline outline-1 outline-offset-[-1px] outline-gray-700/20 flex flex-col justify-start items-start">
                <div className="text-zinc-400 text-[9px] font-space leading-3 uppercase">REV: {project.rev}</div>
              </div>
            </div>
            {/* Close Button — desktop only (mobile close is absolute top-right) */}
            <button
              onClick={handleClose}
              className="p-2 bg-neutral-500/30 hover:bg-neutral-500/50 transition-colors flex flex-col justify-center items-center group cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-fuchsia-300 group-hover:text-white transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="w-full flex-1 flex flex-col md:flex-row justify-start items-start overflow-y-auto md:overflow-hidden">

          {/* Left Artwork */}
          <div className="w-full md:flex-1 h-[300px] md:h-full relative bg-zinc-950/95 flex justify-center items-center overflow-hidden border-b md:border-b-0 border-gray-700/30">
            <img
              src={project.image}
              alt={project.title.replace(/<br>/gi, ' ')}
              className="w-[80%] md:w-[512px] h-[80%] md:h-[512px] object-contain relative z-10"
            />
            <div className="absolute inset-0 px-8 py-8 opacity-20 bg-cover mix-blend-screen pointer-events-none"
              style={{ backgroundImage: `url('https://placehold.co/448x560/222/222?text=topo')` }}
            ></div>
          </div>

          {/* Right Metadata */}
          <div className="w-full md:w-64 h-full p-4 sm:p-6 bg-neutral-900 border-l border-gray-700/30 flex flex-col justify-start items-start gap-4 sm:gap-6 overflow-y-auto">
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <div className="text-zinc-500 text-[10px] font-space tracking-wider uppercase leading-4">METADATA_ANALYSIS</div>
              <div className="w-full flex flex-col justify-start items-start gap-2 mt-2">
                <div className="w-full pb-1 border-b border-gray-700/20 flex justify-between items-start">
                  <div className="text-zinc-400 text-[9px] font-sans uppercase leading-3">CREATED:</div>
                  <div className="text-stone-200 text-[9px] font-sans leading-3">{project.created}</div>
                </div>
                <div className="w-full pb-1 border-b border-gray-700/20 flex justify-between items-start">
                  <div className="text-zinc-400 text-[9px] font-sans uppercase leading-3">AUTHOR:</div>
                  <div className="text-fuchsia-300 text-[9px] font-semibold font-sans leading-3 uppercase">{project.author}</div>
                </div>
                <div className="w-full pb-1 border-b border-gray-700/20 flex justify-between items-start">
                  <div className="text-zinc-400 text-[9px] font-sans uppercase leading-3">ASSET_TYPE:</div>
                  <div className="text-sky-100 text-[9px] font-sans leading-3 uppercase text-right w-1/2">{project.type}</div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-2 mt-4">
              <div className="text-zinc-500 text-[10px] font-space tracking-wider uppercase leading-4">DECRYPTED_SEGMENT</div>
              <p className="text-zinc-400 text-[10px] font-sans leading-4 text-justify mt-1">{project.detailDesc}</p>
            </div>

            {project.id === 'ARCHIVE_FILE_02' && (
              <div className="w-full flex-1 flex flex-col justify-end items-center min-h-[50px] mt-8 md:mt-auto pt-6">
                <a
                  href="/assets/E-Book Nini Thowong.pdf"
                  download="E-Book Nini Thowong.pdf"
                  className="w-full py-2.5 sm:py-3 outline outline-1 outline-offset-[-1px] outline-sky-100/40 hover:bg-sky-100/10 transition-colors flex justify-center items-center"
                >
                  <span className="text-sky-100 text-[10px] font-space uppercase leading-4 tracking-widest">[ VIEW_HIGH_RES ]</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
