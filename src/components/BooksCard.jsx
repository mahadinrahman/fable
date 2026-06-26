'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

/* ─── PREMIUM MOTION VARIANTS (Linear & Vercel Inspired) ─── */
// কাস্টম কিউবিক বেজিয়ার ইজিং যা অত্যন্ত স্মুথ মোশন দেয়
const ultraSmoothEasing = [0.16, 1, 0.3, 1]; 

export const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 24,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.55, 
      ease: ultraSmoothEasing 
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: ultraSmoothEasing, delay: 0.1 }
  }
};

const BooksCard = ({ book }) => {
  const {
    _id,
    title,
    genre,
    price,
    coverImageUrl,
    shortDescription,
    userName,
    status,
  } = book;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }} // স্ক্রোল রিভিল অ্যানিমেশন
      whileHover="hover"
      className="group relative bg-[#0d0d11] text-white rounded-xl overflow-hidden border border-zinc-800/80 flex flex-col justify-between h-full shadow-md will-change-transform"
    >
      {/* Stripe-inspired subtle gradient overlay on card hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Book Cover Image with Hardware Accelerated Zoom */}
        <div className="relative w-full h-68 overflow-hidden bg-zinc-950 border-b border-zinc-800/50">
          <motion.img
            src={coverImageUrl || 'https://via.placeholder.com/150'}
            alt={title}
            className="w-full h-full object-cover object-center will-change-transform"
            variants={{
              hover: { 
                scale: 1.05,
                transition: { duration: 0.6, ease: ultraSmoothEasing }
              }
            }}
          />
          {/* Subtle vignette layer on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
        </div>

        {/* Book Details */}
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-zinc-100 group-hover:text-purple-400 transition-colors duration-300 line-clamp-1 tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-zinc-400 font-medium">by {userName || 'Unknown'}</p>
          </div>

          <p className="text-sm text-zinc-400 line-clamp-2 h-10 leading-relaxed font-normal">
            {shortDescription}
          </p>

          {/* Genre & Price */}
          <div className="flex items-center justify-between pt-2">
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] px-2.5 py-1 rounded-md font-medium tracking-wide shadow-inner">
              {genre}
            </span>
            <span className="text-base font-bold text-zinc-100 tracking-tight">${price}</span>
          </div>

          {/* Status Badge with delayed staggered fade-in */}
          <div className="pt-1 h-6">
            {status === 'published' && (
              <motion.span 
                variants={badgeVariants}
                className="inline-flex items-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-0.5 rounded-full font-semibold capitalize tracking-wider"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                {status}
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button Area with Vercel-style Micro-interactions */}
      <div className="p-5 pt-0 relative z-10">
        <Link href={`/books/${_id}`} className="w-full block">
          <motion.div
            variants={{
              hover: { y: -2 },
              initial: { y: 0 }
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium py-2.5 rounded-lg transition-all duration-300 group-hover:border-purple-500/40 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]">
              View Details
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default BooksCard;