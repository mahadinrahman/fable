import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4 selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* 📦 Main Card Container */}
      <div className="bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-2xl max-w-md w-full text-center border border-zinc-800/80 shadow-2xl shadow-black/50">
        
        {/* 🛡️ Premium Lock / Shield Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative bg-zinc-900 p-5 rounded-full text-amber-500 border border-zinc-800 shadow-inner group">
            <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
            <svg 
              className="w-12 h-12 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              ></path>
            </svg>
          </div>
        </div>

        {/* 📝 Typography */}
        <h1 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight uppercase">
          Access Denied / <span className="text-amber-400 font-extrabold">Page Not Found</span>
        </h1>
        
        <p className="text-zinc-400 text-sm font-medium mb-8 leading-relaxed px-2">
          🔒 We could not find the page you were looking for, or you do not have permission to view it. Please check the URL or log in.
        </p>

        {/* 🔘 Action Buttons */}
        <div className="flex flex-col gap-3.5">
          <Link 
            href="/signin" 
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 px-6 rounded-xl transition active:scale-[0.98] duration-150 text-sm text-center shadow-lg shadow-amber-500/10"
          >
            Log In to FABLE
          </Link>
          
          <Link 
            href="/" 
            className="w-full bg-zinc-900 text-zinc-300 font-semibold py-3 px-6 rounded-xl hover:bg-zinc-800/70 transition active:scale-[0.98] duration-150 text-sm text-center border border-zinc-800"
          >
            Go Back Home
          </Link>
        </div>

      </div>

      {/* 📑 Footer Text */}
      <footer className="mt-8 text-xs text-zinc-600 tracking-wider">
        FABLE &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}