import { getPayment } from '@/lib/api/payment';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const SalesHistory = async () => {

  const user = await getUserSession();
  const allPayments = await getPayment();

  const sellerSales = Array.isArray(allPayments)
    ? allPayments.filter(payment => user?.email === payment?.sellerEmail)
    : [];

  // Total Revenue
  const totalSalesAmount = sellerSales.reduce(
    (total, sale) => total + Number(sale.bookPrice || 0),
    0
  );

  // Total Books Sold
  const totalSalesCount = sellerSales.length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h3 className="text-xl font-bold tracking-tight text-zinc-100">
            Sales History
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Track and manage your book sales and revenue.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
              <p className="text-sm text-zinc-400">Total Revenue</p>
              <h2 className="text-3xl font-bold text-green-400 mt-2">
                ${totalSalesAmount.toFixed(2)}
              </h2>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
              <p className="text-sm text-zinc-400">Books Sold</p>
              <h2 className="text-3xl font-bold text-blue-400 mt-2">
                {totalSalesCount}
              </h2>
            </div>
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
                <th className="py-4 px-6 text-right">Price</th>
                <th className="py-4 px-6 text-right">Date</th>
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
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
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

                          <p className="text-xs text-zinc-500 mt-0.5">
                            Buyer: {sale.buyerName || "Anonymous"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Genre */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {sale.bookGenre || "General"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 text-right font-medium text-zinc-200">
                      ${Number(sale.bookPrice || 0).toFixed(2)}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-right text-zinc-500 text-xs font-mono">
                      {sale.createdAt
                        ? new Date(sale.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-12 text-center text-zinc-500 font-medium"
                  >
                    No sales recorded yet. 📦
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

export default SalesHistory;