import React from 'react';
import { authClient } from "@/lib/auth-client";
import { BookOpen, Bookmark, Clock, Trophy, Flame, Compass } from "lucide-react";
import Link from 'next/link';
import { getUserSession } from '@/lib/core/session';
import { getPayment } from '@/lib/api/payment';
import { getBookmark } from '@/lib/api/bookmark';

const ReaderDashboardHome = async () => {
    // ১. প্রথমে ইউজার সেশন ও ইমেইল গেট করা হলো (বাগ ফিক্সড)
    const user = await getUserSession();
    const loggedInEmail = user?.email;

    // ২. বুকমার্ক ডেটা ডাইনামিকালি ফেচ করা
    let myBookmarks = [];
    if (loggedInEmail) {
        const res = await getBookmark(loggedInEmail);
        if (res && Array.isArray(res)) {
            myBookmarks = res;
        }
    }

    // ৩. পেমেন্ট ও পারচেজড বইয়ের ডেটা ফিল্টার করা
    const allPayments = await getPayment();
    const puchaseBooks = Array.isArray(allPayments)
        ? allPayments.filter(payment => loggedInEmail === payment?.buyerEmail)
        : [];

    // ৪. ডাইনামিক ডেটা সেট করার জন্য লেটেস্ট বুক বের করা
    const latestBook =
        puchaseBooks.length > 0
            ? puchaseBooks[puchaseBooks.length - 1]
            : null;

    // ৫. স্ট্যাটস গ্রিড ডেটা ডাইনামিক করা হলো
    const stats = [
        {
            id: 1,
            title: "Books Purchased",
            value: puchaseBooks.length.toString(), // ডাইনামিক পারচেজ কাউন্ট
            icon: BookOpen,
            desc: "Ready to read anytime"
        },
        {
            id: 2,
            title: "Saved Bookmarks", // বুকমার্ক অনুযায়ী ডাইনামিক করা হলো
            value: myBookmarks.length.toString(), // ডাইনামিক বুকমার্ক কাউন্ট
            icon: Bookmark,
            desc: "Books you saved to read later"
        },
        {
            id: 3,
            title: "Current Streak",
            value: "7 Days", // স্ট্যাটিক
            icon: Flame,
            desc: "Daily reading goal met"
        },
        {
            id: 4,
            title: "Achievements",
            value: "5 Badges", // স্ট্যাটিক
            icon: Trophy,
            desc: "Unlocked from milestones"
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10">
            <div className="max-w-5xl mx-auto">

                {/* স্বাগতম বার্তা */}
                <div className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Welcome Back, <span className="bg-gradient-to-r from-[#9146FF] to-[#FF007A] bg-clip-text text-transparent">{user?.name || "Reader"}</span>! 👋
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Your personal library is ready. What are we reading today?
                    </p>
                </div>

                {/* স্ট্যাটস গ্রিড সেকশন (ডাইনামিক কার্ডস) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl backdrop-blur-sm shadow-xl hover:border-zinc-700/50 transition duration-200"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        {stat.title}
                                    </span>
                                    <div className="p-2 rounded-xl bg-gradient-to-r from-[#9146FF]/10 to-[#FF007A]/10 text-[#FF007A]">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1">
                                    {stat.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* নিচের সেকশন */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* বর্তমানে পড়ছেন বা লেটেস্ট কেনা বই (Dynamic) */}
                    <div className="md:col-span-2 bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-[#9146FF]" />
                            <h3 className="font-bold text-zinc-200">
                                {latestBook ? "Currently Reading (Latest)" : "No Books Found"}
                            </h3>
                        </div>

                        {latestBook ? (
                            <div className="flex flex-col sm:flex-row gap-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-900">
                                <img
                                    src={latestBook.bookImageIcon || latestBook.coverImageUrl || "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=150"}
                                    alt={latestBook.bookTitle || "Book Cover"}
                                    className="w-20 h-28 object-cover rounded-lg mx-auto sm:mx-0 border border-zinc-800"
                                />
                                <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                                    <div>
                                        <h4 className="font-semibold text-zinc-200 line-clamp-1">{latestBook.bookTitle || "Untitled Book"}</h4>
                                        <p className="text-xs text-[#FF007A] font-medium mt-0.5">{latestBook.bookGenre || "General"}</p>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                        <div className="flex justify-between text-xs text-zinc-400 mb-1">
                                            <span>Progress</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                            <div className="bg-gradient-to-r from-[#9146FF] to-[#FF007A] h-full w-[45%] rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center bg-zinc-950/40 border border-dashed border-zinc-800 rounded-xl p-4">
                                <p className="text-sm text-zinc-500">You have not purchased any books yet.</p>
                                <Link href="/books" className="text-xs text-[#9146FF] hover:underline mt-2">Explore Store</Link>
                            </div>
                        )}
                    </div>

                    {/* গাইডলাইন সেকশন */}
                    <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Compass className="w-5 h-5 text-[#FF007A]" />
                                <h3 className="font-bold text-zinc-200">Discover Fable</h3>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                Explore unique and original premium ebooks uploaded directly by rising global writers. Support literature by adding them to your collectors vault!
                            </p>
                        </div>
                        <Link href={'/books'}>
                            <button className="w-full mt-6 bg-gradient-to-r from-[#9146FF] to-[#FF007A] text-white text-xs font-semibold py-2.5 rounded-xl transition duration-300 opacity-90 hover:opacity-100 shadow-md">
                                Browse Ebooks
                            </button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ReaderDashboardHome;