import { getPayment } from '@/lib/api/payment';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import Link from 'next/link';

const PurchaseBooks = async () => {
  
  const user = await getUserSession();
  const allPayments = await getPayment();
  console.log(allPayments);
  const sellerSales = Array.isArray(allPayments) 
    ? allPayments.filter(payment => user?.email === payment?.buyerEmail)
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header সেকশন */}
        <div className="mb-8">
          <h3 className="text-xl font-bold tracking-tight text-zinc-100">Purchase Books</h3>
          <p className="text-sm text-zinc-500 mt-1">Track and manage your purchased books collection.</p>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto bg-zinc-900/40 rounded-xl border border-zinc-800/80 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-semibold tracking-wider text-zinc-400 uppercase bg-zinc-900/60">
                <th className="py-4 px-6">Book / Image</th>
                <th className="py-4 px-6">Genre</th>
                <th className="py-4 px-6 text-right pr-8">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {sellerSales.length > 0 ? (
                sellerSales.map((sale) => (
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

                    {/* Details Link Action কলাম */}
                    <td className="py-4 px-6 text-right pr-6">
                      <Link 
                        href={`/books/${sale.bookId}`} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium text-blue-400 hover:text-blue-300 transition shadow-sm"
                        title="View Details"
                      >
                        Details
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-zinc-500 font-medium">
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

export default PurchaseBooks;