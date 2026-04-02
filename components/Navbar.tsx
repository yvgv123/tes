'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '#dashboard', label: 'DASHBOARD' },
    { href: '#dossier',   label: 'DOSSIER'   },
    { href: '#projects',  label: 'PROJECTS'  },
    { href: '#comm_link', label: 'COMM_LINK' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full pt-4 sm:pt-6 flex justify-center px-4 md:px-8 z-50">
      <nav className="w-full max-w-5xl px-4 md:px-8 py-3 bg-neutral-900/40 rounded-full shadow-[0px_0px_15px_0px_rgba(0,240,255,0.10)] outline outline-1 outline-offset-[-1px] outline-cyan-400/30 backdrop-blur-md flex justify-between items-center gap-4 transition-all">

        {/* Left Logo */}
        <Image
          src="/assets/G%20latter%20red%202.svg"
          alt="Brand Logo"
          width={33}
          height={15}
          className="flex-shrink-0"
        />

        {/* Desktop Links */}
        <div className="hidden sm:flex flex-1 justify-center items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          {links.map(({ href, label }) => (
            <div key={label} className="inline-flex flex-col justify-start items-start group">
              <a
                href={href}
                className="justify-center text-stone-200/60 group-hover:text-[#00F0FF] group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all text-[10px] md:text-xs font-normal font-['Space_Grotesk'] uppercase leading-4 tracking-wider cursor-pointer"
              >
                {label}
              </a>
            </div>
          ))}
        </div>

        {/* Right: hamburger (mobile) + dot (desktop) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-1.5 text-brand-stone/60 hover:text-brand-cyan transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Desktop right dot */}
          <div className="hidden sm:flex p-2 rounded-full flex-col justify-center items-center">
            <div className="w-5 h-5 bg-cyan-400"></div>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-[72px] left-4 right-4 bg-neutral-900/95 backdrop-blur-md rounded-2xl outline outline-1 outline-cyan-400/30 overflow-hidden">
          {links.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-stone-200/60 hover:text-brand-cyan hover:bg-white/5 transition-all text-[11px] font-['Space_Grotesk'] uppercase tracking-widest border-b border-white/5 last:border-b-0"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
