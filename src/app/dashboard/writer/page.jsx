import { getUserSession } from '@/lib/core/session';
import React from 'react';

const WriterHomePage = async () => {
  const user = await getUserSession();

  // ডার্ক মোড স্ট্যাটস এবং ফিচার কার্ড ডাটা
  const featureCards = [
    { 
      label: 'Total Ebooks', 
      value: '12 Books', 
      desc: 'Your total uploaded creations on Fable.',
      icon: '📚', 
      color: 'from-violet-600/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400' 
    },
    { 
      label: 'Live Visibility', 
      value: '9 Published', 
      desc: 'Ebooks currently active and readable by users.',
      icon: '🚀', 
      color: 'from-emerald-600/20 to-teal-600/10 border-emerald-500/30 text-emerald-400' 
    },
    { 
      label: 'Total Earnings', 
      value: '$340.00', 
      desc: 'Secured revenue generated from ebook sales.',
      icon: '💰', 
      color: 'from-purple-600/20 to-pink-600/10 border-purple-500/30 text-purple-400' 
    },
    { 
      label: 'Reader Bookmarks', 
      value: '45 Saves', 
      desc: 'Total times readers shortlisted your books.',
      icon: '🔖', 
      color: 'from-amber-600/20 to-orange-600/10 border-amber-500/30 text-amber-400' 
    },
    { 
      label: 'Verification Status', 
      value: 'Verified Writer', 
      desc: 'One-time payment completed. Full system access granted.',
      icon: '🛡️', 
      color: 'from-blue-600/20 to-cyan-600/10 border-blue-500/30 text-blue-400' 
    },
    { 
      label: 'Global Audience', 
      value: '2.4k Views', 
      desc: 'Estimated reach and interaction analytics.',
      icon: '🌐', 
      color: 'from-fuchsia-600/20 to-rose-600/10 border-fuchsia-500/30 text-fuchsia-400' 
    }
  ];

  return (
    <div className="p-6 bg-[#02040a] min-h-screen text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Header Section */}
      <div className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent">
          Welcome back, {user?.name || 'Writer'}! 👋
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base max-w-xl">
          Manage your digital library, track your performance features, and monitor your global reach from your Fable command center.
        </p>
      </div>

      {/* Feature & Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {featureCards.map((card, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden bg-gradient-to-br ${card.color} border p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group`}
          >
            {/* Glow Effect Top Left */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all"></div>
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {card.label}
                </p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {card.value}
                </h3>
              </div>
              <div className="text-2xl bg-slate-950/40 p-2.5 rounded-xl border border-white/5 shadow-inner">
                {card.icon}
              </div>
            </div>

            {/* Divider line */}
            <div className="h-[1px] w-full bg-white/5 my-3"></div>

            {/* Description Text */}
            <p className="text-xs text-slate-400 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default WriterHomePage;