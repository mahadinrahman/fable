import { getPayment } from '@/lib/api/payment';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const PuchaseHistory = async () => {
  
  const user = await getUserSession();
  const allPayments = await getPayment();
  console.log(allPayments);
  const sellerSales = Array.isArray(allPayments) 
    ? allPayments.filter(payment => user?.email === payment?.buyerEmail)
    : [];

  // মোট স্পেন্ডিং (Total Money Spent) হিসাব করা হচ্ছে
  const totalSpent = sellerSales.reduce((acc, sale) => {
    const price = Number(sale.bookPrice) || 0;
    return acc + price;
  }, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header সেকশন এবং টোটাল ব্যালেন্স কার্ড */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-100">Purchase History</h3>
            <p className="text-sm text-zinc-500 mt-1">Track and manage your purchase history.</p>
          </div>
          
          {/* সুন্দর মিনিমালিস্ট টোটাল অ্যামাউন্ট বক্স */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 px-6 py-3 rounded-xl flex flex-col justify-center min-w-[180px] backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Total Spent</span>
            <span className="text-xl font-bold text-emerald-400 mt-0.5">
              ${totalSpent.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto bg-zinc-900/40 rounded-xl border border-zinc-800/80 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-semibold tracking-wider text-zinc-400 uppercase bg-zinc-900/60">
                <th className="py-4 px-6">Book / Image</th>
                <th className="py-4 px-6">Genre</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Price</th>
                <th className="py-4 px-6 text-right">Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {sellerSales.length > 0 ? (
                sellerSales.map((sale) => {
                  // স্ট্যাটাস লজিক চেক (ডেটাবেজে ছোট হাতের বা বড় হাতের লেখা থাকলে হ্যান্ডেল করার জন্য)
                  const currentStatus = (sale.status || 'paid').toLowerCase();

                  return (
                    <tr 
                      key={sale._id} 
                      className="hover:bg-zinc-900/30 transition duration-150 group"
                    >
                      {/* Book Image & Name */}
                      <td className="py-4 px-6 flex items-center gap-4">
                        <div className="relative h-12 w-9 rounded overflow-hidden bg-zinc-800 border border-zinc-700/50 flex-shrink-0">
                          <img 
                            src={sale.bookImageIcon || "/placeholder-book.jpg"} 
                            alt={sale.bookTitle}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-200 group-hover:text-white transition">
                            {sale.bookTitle}
                          </p>
                        </div>
                      </td>

                      {/* Genre Badge */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">
                          {sale.bookGenre || "General"}
                        </span>
                      </td>

                      {/* Status Badge কলাম */}
                      <td className="py-4 px-6">
                        {currentStatus === 'paid' || currentStatus === 'success' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {sale.paymentStatus || 'Pending'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                             success
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 text-right font-medium text-zinc-200">
                        ${Number(sale.bookPrice).toFixed(2)}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-right text-zinc-500 text-xs font-mono">
                        {new Date(sale.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-zinc-500 font-medium">
                    No purchase recorded yet. 📦
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default PuchaseHistory;