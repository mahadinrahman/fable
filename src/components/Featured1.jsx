import { getPayment } from '@/lib/api/payment';
import { Avatar } from '@heroui/react';
import React from 'react';

const badgeStyles = [
    { bg: 'bg-amber-500', border: 'border-amber-400/60' },
    { bg: 'bg-slate-400', border: 'border-slate-300/60' },
    { bg: 'bg-amber-700', border: 'border-amber-600/60' },
];

const Featured1 = async () => {
    const payments = (await getPayment()) || [];
    const writerSalesMap = {};

    payments.forEach((payment) => {
        if (payment.paymentStatus === 'paid' && payment.sellerEmail) {
            const email = payment.sellerEmail;
            const saleAmount = parseFloat(payment.amount || 0);

            if (!writerSalesMap[email]) {
                writerSalesMap[email] = {
                    name: email.split('@')[0],
                    email,
                    totalSales: 0,
                    // DB থেকে ইমেজ কালেকশন ফিল্ড চেক করুন
                    avatarUrl: payment.sellerImage || null,
                };
            }
            writerSalesMap[email].totalSales += saleAmount;
        }
    });

    const topWriters = Object.values(writerSalesMap)
        .sort((a, b) => b.totalSales - a.totalSales)
        .slice(0, 3);

    return (
        <div className="w-full p-6 bg-[#02040a]/60 border border-indigo-950/40 rounded-2xl backdrop-blur-xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Top Writers
            </h3>

            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-6">
                {topWriters.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-6 col-span-3">
                        No sales data recorded yet.
                    </p>
                ) : (
                    topWriters.map((writer, index) => {
                        const bd = badgeStyles[index] || { bg: 'bg-zinc-700', border: 'border-zinc-600' };
                        const firstLetter = writer.name ? writer.name[0].toUpperCase() : 'U';
                 console.log('writer',writer);
                        return (
                            <div
                                key={writer.email}
                                className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center p-4 sm:p-5 rounded-xl bg-[#0d0e15]/40 border border-slate-900/40 hover:border-indigo-950/60 transition-all duration-300 group"
                            >
                                {/* 🛡️ Native Circle Avatar - 100% Server Safe */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 ring-4 ring-indigo-500/30 overflow-hidden flex items-center justify-center bg-zinc-800 relative shadow-inner">
                                       
                                        <Avatar className="w-24 h-24 ring-4 ring-zinc-800/40 shadow-inner">
                                            <Avatar.Image alt="User Image" src={writer?.avatarUrl
                                            } className="object-cover" />
                                            <Avatar.Fallback className="text-3xl font-bold bg-zinc-800 text-zinc-300">
                                                {writer?.name ?writer.name[0].toUpperCase() : "U"}
                                            </Avatar.Fallback>
                                        </Avatar>

                                       
                                    </div>

                                    {/* র্যাংক ব্যাজ */}
                                    <div className={`absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 ${bd.bg} ${bd.border} border-2 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black text-white shadow-lg z-20`}>
                                        {index + 1}
                                    </div>
                                </div>

                                {/* রাইটার ডিটেইলস */}
                                <div className="flex-1 sm:flex-none min-w-0 sm:w-full">
                                    <p className="font-semibold text-slate-200 capitalize text-base truncate sm:text-center group-hover:text-white transition-colors">
                                        {writer.name}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate sm:text-center mt-0.5">
                                        {writer.email}
                                    </p>
                                </div>

                                {/* সেলস রেভিনিউ */}
                                <div className="text-right sm:text-center sm:w-full sm:pt-3 sm:border-t sm:border-slate-900/60">
                                    <span className="text-[10px] font-bold text-indigo-400 block uppercase tracking-widest mb-0.5">
                                        Sales
                                    </span>
                                    <span className="font-bold text-emerald-400 text-base sm:text-lg">
                                        ${writer.totalSales.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Featured1;