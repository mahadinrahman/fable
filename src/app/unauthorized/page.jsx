"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center p-6 antialiased selection:bg-red-500 selection:text-white">
      <div className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl p-8 text-center transition-all hover:border-slate-700">
        
        {/* Animated Visual/Shield Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-950/40 border border-red-900/30 mb-6 animate-pulse">
          <svg
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* Error Messaging */}
        <span className="text-xs font-semibold tracking-widest text-red-400 uppercase bg-red-950/50 border border-red-900/40 px-3 py-1 rounded-full">
          Error 401
        </span>
        
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
          Access Denied
        </h1>
        
        <p className="mt-3 text-base text-slate-400 leading-relaxed">
          You do not have the required permissions to view this dashboard. Please switch to an authorized account or contact support.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-95"
          >
            Sign In
          </Link>
          
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 shadow-sm hover:bg-slate-700 transition-all active:scale-95"
          >
            Go Back
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-8 border-t border-slate-800 pt-5">
          <Link href="/" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            ← Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}