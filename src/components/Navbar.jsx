'use client'
import { authClient, useSession} from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {data:session,isPending}=authClient.useSession()
  const user=session?.user;

   const handleSignOut = async () => {
    try {
      await authClient.signOut();

      toast.success('Sign out successful');
    
    } catch (error) {
      toast.error('Something went wrong');
    }

  }
   
  return (
    <nav className="w-full bg-gradient-to-r from-[#020712] via-[#020117] to-[#030a18] text-white border-b border-indigo-950/50 px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Section: Brand Name (Icon Removed) */}
        <div className="flex items-center cursor-pointer group">
          <Link href={'/'}>
          <span className="font-extrabold text-4xl tracking-tight bg-gradient-to-br from-[#8A63D2] via-[#E84393] to-[#D63031] bg-clip-text text-transparent transform group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(145,70,255,0.3)]">
            Fable
          </span>
          </Link>
        </div>

        {/* Desktop Navigation (Big Screens) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href={'/'}><button className="px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-sm font-medium hover:bg-indigo-900/50 hover:border-indigo-500/60 transition-all duration-300 backdrop-blur-sm">
            Home
          </button></Link>
          <Link href={'/books'}><button className="px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-sm font-medium hover:bg-indigo-900/50 hover:border-indigo-500/60 transition-all duration-300 backdrop-blur-sm">
            Browse Books
          </button></Link>

          <div className="h-5 w-[1px] bg-indigo-500/30"></div>
             {
             user?
             <>
             <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
             </>
             :
             <>
             <Link href={'/signin'}><button className="text-sm font-medium text-indigo-200 hover:text-[#00F2FE] transition-colors duration-300">
            Sign In
          </button></Link>

          <Link href={'/signup'}><button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#9146FF] to-[#FF007A] text-white text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(145,70,255,0.4)] transition-all duration-300">
            Get Started
          </button></Link>
             </>
         }


        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-indigo-200 hover:text-white focus:outline-none p-2 transition-colors"
          >
            {isOpen ? (
              // Cross Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Menu Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#0F172A]/95 backdrop-blur-md border-b border-indigo-950 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        <div className="px-6 py-5 flex flex-col space-y-4">

          <Link href='/'><button className="w-full text-left px-4 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-950/40 text-sm font-medium hover:bg-indigo-900/40 transition-all">
            Home
          </button></Link>
          <Link href='/books'><button className="w-full text-left px-4 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-950/40 text-sm font-medium hover:bg-indigo-900/40 transition-all">
            Browse Books
          </button></Link>
          
          <div className="w-full h-[1px] bg-indigo-500/20"></div>
          
          {
            user?
            <>
             <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
            </>:
            <>
             <Link href={'/signin'}><button className="w-full text-left px-4 py-2 text-sm font-medium text-indigo-200 hover:text-[#00F2FE] transition-colors">
            Sign In
          </button></Link>

          <Link href={'/signup'}><button className="w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#9146FF] to-[#FF007A] text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md">
            Get Started
          </button></Link>
            </>
          }
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;