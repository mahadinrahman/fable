import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-[#020712] via-[#020117] to-[#030a18]  text-gray-400 py-12 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo, Description and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          
          {/* Brand Column (Takes 2 columns space on larger screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight flex items-center">
              <span className="font-extrabold text-4xl tracking-tight bg-gradient-to-br from-[#8A63D2] via-[#E84393] to-[#D63031] bg-clip-text text-transparent transform group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(145,70,255,0.3)]">Fable</span>
              
            </Link>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed w-70">
              Discover original ebooks from emerging writers, or publish your own masterpiece to a global audience.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <h4 className="text-indigo-500 font-medium text-sm tracking-wide">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Job discovery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Worker AI</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Companies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Salary data</Link></li>
            </ul>
          </div>

          {/* Navigations Column */}
          <div className="space-y-3">
            <h4 className="text-indigo-500 font-medium text-sm tracking-wide">Navigations</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Help center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Career library</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="text-indigo-500 font-medium text-sm tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Brand Guideline</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Newsroom</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Social Icons and Copyright */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Social Icons (Matches image style) */}
          <div className="flex items-center space-x-3">
            {/* Facebook */}
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-zinc-900 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            {/* Custom Icon (Image's purple icon style) */}
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-indigo-600/30 text-indigo-400 rounded-lg hover:bg-indigo-600/50 transition-all border border-indigo-500/20">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.993 3.995-.282 1.195.597 2.17 1.774 2.17 2.128 0 3.768-2.244 3.768-5.48 0-2.864-2.059-4.868-5-4.868-3.408 0-5.409 2.556-5.409 5.197 0 1.03.397 2.134.892 2.733.098.118.111.222.082.34-.09.375-.292 1.189-.331 1.349-.052.21-.173.255-.399.15-1.49-.693-2.422-2.868-2.422-4.614 0-3.757 2.73-7.206 7.868-7.206 4.129 0 7.338 2.942 7.338 6.874 0 4.103-2.587 7.405-6.177 7.405-1.206 0-2.339-.627-2.727-1.365 0 0-.597 2.271-.741 2.827-.269 1.034-1 2.331-1.488 3.125 1.121.341 2.298.531 3.522.531 6.628 0 12-5.372 12-12S18.628 0 12 0z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-zinc-900 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          {/* Copyright & Policy Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-zinc-600 text-center sm:text-right">
            <span>Copyright 2026 — Fable</span>
            <div className="flex items-center space-x-2">
              <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms & Policy</Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Guideline</Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;