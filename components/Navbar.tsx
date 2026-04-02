'use client';

import Link from 'next/link';
import Image from 'next/image';
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full pt-6 flex justify-center px-4 md:px-8 z-50">
      <nav className="w-full max-w-5xl px-4 md:px-8 py-3 bg-neutral-900/40 rounded-full shadow-[0px_0px_15px_0px_rgba(0,240,255,0.10)] outline outline-1 outline-offset-[-1px] outline-cyan-400/30 backdrop-blur-md flex justify-between items-center gap-4 transition-all">

        {/* Left Logo */}
        <Image 
          src="/assets/G%20latter%20red%202.svg" 
          alt="Brand Logo" 
          width={33} 
          height={15} 
          className="flex-shrink-0"
        />

        {/* Links Container */}
        <div className="flex flex-1 justify-center items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          {[
            { href: '#dashboard', label: 'DASHBOARD' },
            { href: '#dossier',   label: 'DOSSIER'   },
            { href: '#projects',  label: 'PROJECTS'  },
            { href: '#comm_link', label: 'COMM_LINK' },
          ].map(({ href, label }) => (
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

        {/* Right Figma Shape */}
        <div className="p-2 rounded-full inline-flex flex-col justify-center items-center flex-shrink-0">
          <div className="w-5 h-5 bg-cyan-400"></div>
        </div>
      </nav>
    </div>
  );
}
