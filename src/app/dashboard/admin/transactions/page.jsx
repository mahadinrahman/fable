import { getPayment } from '@/lib/api/payment';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const TransactionsPage = async () => {
    const user = await getUserSession();
    const allPayments = await getPayment() || [];

    return (
        <div className="min-h-screen bg-[#090a0f] text-slate-100 p-6 selection:bg-indigo-500">
            <div className="max-w-7xl mx-auto bg-[#02040a]/60 border border-indigo-950/40 rounded-xl backdrop-blur-xl p-6 shadow-2xl">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                            View All Transactions
                        </h2>
                        
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto border border-indigo-950/30 rounded-xl">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-indigo-950 text-xs uppercase tracking-wider text-slate-400 font-semibold bg-[#0d0e15]/60">
                                <th className="py-4 px-4">Book Details</th>
                                <th className="py-4 px-4">Type</th>
                                <th className="py-4 px-4">User / Writer Email</th>
                                <th className="py-4 px-4">Amount</th>
                                <th className="py-4 px-4 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-950/30 bg-[#02040a]/20">
                            {allPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-slate-500">
                                        No transactions found in the system.
                                    </td>
                                </tr>
                            ) : (
                                allPayments.map((payment) => {
                                    // Type নির্ধারণের লজিক
                                    const isPublishingFee = payment.buyerEmail === payment.sellerEmail;
                                    const transactionType = isPublishingFee ? 'Publishing Fee' : 'Purchase';
                                    
                                    // তারিখ ফরম্যাট করা
                                    const formattedDate = new Date(payment.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    });

                                    return (
                                        <tr key={payment._id} className="hover:bg-[#0d0e15]/40 transition-colors group">
                                            
                                            {/* 📚 Book Details (Image + Title) */}
                                            <td className="py-4 px-4 flex items-center gap-3 max-w-sm">
                                                <img 
                                                    src={payment.bookImageIcon || 'https://via.placeholder.com/150'} 
                                                    alt={payment.bookTitle || 'Book Cover'} 
                                                    className="w-10 h-14 object-cover rounded bg-slate-900 border border-indigo-950/50 shadow-md shrink-0"
                                                />
                                                <div className="truncate">
                                                    <h4 className="font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
                                                        {payment.bookTitle || 'Untitled Book'}
                                                    </h4>
                                                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                                                        ID: {payment.bookId ? payment.bookId.substring(0, 8) : 'N/A'}...
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                                                    isPublishingFee 
                                                        ? 'bg-amber-950/30 text-amber-400 border-amber-900/40' 
                                                        : 'bg-emerald-950/30 text-emerald-400 border-emerald-900/40'
                                                }`}>
                                                    {transactionType}
                                                </span>
                                            </td>

                                            {/* User / Writer Email */}
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-200 font-medium">{payment.buyerEmail}</span>
                                                    {!isPublishingFee && (
                                                        <span className="text-[10px] text-slate-500">Seller: {payment.sellerEmail}</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="py-4 px-4 font-semibold text-indigo-300">
                                                ${parseFloat(payment.amount || 0).toFixed(2)}
                                            </td>

                                            {/* Date */}
                                            <td className="py-4 px-4 text-right text-slate-400 text-xs font-medium">
                                                {formattedDate}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default TransactionsPage;