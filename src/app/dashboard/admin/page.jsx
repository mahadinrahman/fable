import AdminDashboardClient from '@/components/AdminDashboardClient';
import { getAllBooks } from '@/lib/api/books';
import { getPayment } from '@/lib/api/payment';
import { getUsers } from '@/lib/api/users';
import React from 'react';

const AdminHomePage = async () => {
  // সার্ভার সাইড থেকে ডেটা ফেচ করা হচ্ছে
  const users = (await getUsers()) || [];
  const allPayment = (await getPayment()) || [];
  const books = (await getAllBooks()) || [];

  // ১. ইউজার রোল ভিত্তিক ক্যালকুলেশন
  const totalUsers = users.length;
  const totalWriters = users.filter(user => user.role === 'writer').length;
  const totalReaders = users.filter(user => user.role === 'reader').length;
  const totalAdmins = users.filter(user => user.role === 'admin').length;

  // ২. টোটাল ইবুক বিক্রি এবং মোট রেভিনিউ ক্যালকুলেশন
  const paidPayments = allPayment.filter(payment => payment.paymentStatus === 'paid');
  const totalEbooksSold = paidPayments.length;
  const totalRevenue = paidPayments.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);

  // ৩. চার্টের জন্য ডেটা ফরম্যাটিং (Genre ভিত্তিক Pie Chart)
  const genreCounts = {};
  paidPayments.forEach(payment => {
    const genre = payment.bookGenre || 'Unknown';
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });
  
  const pieChartData = Object.keys(genreCounts).map(genre => ({
    name: genre,
    value: genreCounts[genre]
  }));

  return (
    <div className="bg-[#0b0b0f] min-h-screen text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Dashboard Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time platform metrics and book sales analytics.</p>
        </div>

        {/* ─── ANALYTICS CARDS OVERVIEW ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
          
          {/* Card 1: Total Users */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Users</span>
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totalUsers}</h3>
          </div>

          {/* Card 2: Total Readers */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Readers</span>
              <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totalReaders}</h3>
          </div>

          {/* Card 3: Total Writers */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Writers</span>
              <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totalWriters}</h3>
          </div>

          {/* Card 4: Total Admins */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Admins</span>
              <div className="p-2 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totalAdmins}</h3>
          </div>

          {/* Card 5: Ebooks Sold */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ebooks Sold</span>
              <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totalEbooksSold}</h3>
          </div>

          {/* Card 6: Total Revenue */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue</span>
              <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                <span className="font-bold text-xs">$</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>

        </div>

        {/* ─── CHARTS SECTION (Client Component) ─── */}
        <div className="max-w-md mx-auto lg:mx-0">
          <AdminDashboardClient pieChartData={pieChartData} />
        </div>

      </div>
    </div>
  );
};

export default AdminHomePage;