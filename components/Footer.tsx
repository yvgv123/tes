export default function Footer() {
  return (
    <footer
      id="comm_link"
      className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-12 bg-neutral-900 border-t border-cyan-400/10 flex flex-col justify-start items-center mt-0"
    >
      <div className="w-full max-w-[896px] flex flex-col justify-start items-start gap-10">

        {/* Contact Links Block */}
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch flex flex-col justify-start items-center">
            <div className="text-center text-fuchsia-300 text-xs sm:text-sm font-bold font-['Space_Grotesk'] uppercase leading-5 tracking-[4px] sm:tracking-[5.60px]">
              SECURE_COMMUNICATION_LINK
            </div>
          </div>

          {/* Link Buttons */}
          <div className="self-stretch flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">

            {/* Email */}
            <a
              href="mailto:galihranggasaputro@gmail.com"
              className="w-full sm:w-auto px-6 md:px-10 py-4 outline outline-1 outline-offset-[-1px] outline-sky-100/40 hover:outline-sky-100/80 hover:bg-sky-100/5 flex justify-center sm:justify-start items-center gap-3 transition-all group"
            >
              <div className="w-3 h-2.5 bg-sky-100 group-hover:shadow-[0_0_8px_rgba(224,242,254,0.8)] transition-all flex-shrink-0"></div>
              <div className="text-center text-sky-100 text-[10px] sm:text-xs font-normal font-['Space_Grotesk'] leading-4 tracking-wider">
                [ mailto://galihranggasaputro@gmail.com ]
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 md:px-10 py-4 outline outline-1 outline-offset-[-1px] outline-fuchsia-300/40 hover:outline-fuchsia-300/80 hover:bg-fuchsia-300/5 flex justify-center sm:justify-start items-center gap-3 transition-all group"
            >
              <div className="w-3.5 h-3.5 bg-fuchsia-300 group-hover:shadow-[0_0_8px_rgba(240,171,252,0.8)] transition-all flex-shrink-0"></div>
              <div className="text-center text-fuchsia-300 text-[10px] sm:text-xs font-normal font-['Space_Grotesk'] leading-4 tracking-wider">
                [ network://linkedin_profile ]
              </div>
            </a>
          </div>
        </div>

        {/* Legal / Footer Bar */}
        <div className="self-stretch pt-10 border-t border-white/5 flex flex-col justify-start items-start gap-3.5">

          {/* Warning */}
          <div className="self-stretch flex flex-col justify-start items-center">
            <div className="text-center text-stone-200/40 text-[9px] font-normal font-['Space_Grotesk'] leading-3 tracking-widest">
              WARNING: SECURE CONNECTION ESTABLISHED. ALL TRANSMISSIONS ARE ENCRYPTED. // END OF RECORD.
            </div>
          </div>

          {/* Sub-links */}
          <div className="self-stretch inline-flex justify-center items-start gap-4 sm:gap-6">
            {['DEBUG', 'PRIVACY', 'ENCRYPTION_KEY'].map((link) => (
              <div key={link} className="inline-flex flex-col justify-start items-center">
                <div className="text-center text-stone-200/30 text-[9px] font-normal font-['Space_Grotesk'] uppercase leading-3 tracking-wide cursor-pointer hover:text-stone-200/60 transition-colors">{link}</div>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="self-stretch pt-4 flex flex-col justify-start items-center">
            <div className="text-center text-cyan-400 text-[9px] font-normal font-['Space_Grotesk'] uppercase leading-3 tracking-widest">
              © 2026 THE_ARCHIVE_PROTOCOL // ENCRYPTED_STREAMS
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
