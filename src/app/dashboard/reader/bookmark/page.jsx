import { getBookmark } from '@/lib/api/bookmark';
import React from 'react';
import Link from 'next/link';
import { getUserSession } from '@/lib/core/session';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BookmarkPage = async () => {
    const user = await getUserSession();
    const loggedInEmail = user?.email;

    let myBookmarks = [];
    if (loggedInEmail) {
        const res = await getBookmark(loggedInEmail);
        if (res && Array.isArray(res)) {
            myBookmarks = res;
        }
    }

    if (myBookmarks.length === 0) {
        return (
            <div className="min-h-screen bg-[#0c0c0c] text-zinc-500 flex flex-col items-center justify-center p-4 gap-3 text-center">
                <div className="w-16 h-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 text-2xl mb-1">
                    🔖
                </div>
                <p className="text-base font-medium">
                    No bookmarks found for <span className="text-zinc-300 break-all">{loggedInEmail || "your account"}</span>!
                </p>
                <Link href="/books" className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-blue-400 hover:text-blue-300 transition text-sm font-medium shadow-md">
                    Explore Books
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-300 p-4 sm:p-6 md:p-8 font-sans antialiased">
            <div className="max-w-7xl mx-auto">
                
                {/* সুন্দর ডার্ক থিম হেডিং সেকশন */}
                <div className="mb-6 md:mb-8">
                    <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-xl">🔖</span>
                        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-100">
                            My Bookmarks
                        </h1>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-500 font-medium">
                        Manage your curated collection of favorite books and saved reads.
                    </p>
                </div>

                {/* Main Table/Container - ছবির মতো ফুল ব্ল্যাক-ডার্ক প্যানেল */}
                <div className="bg-[#0f0f11] rounded-xl border border-zinc-900/80 overflow-hidden shadow-2xl">
                    
                    {/* Table Header - অবিকল ছবির টেক্সট ও স্পেসিং */}
                    <div className="hidden md:grid grid-cols-[3fr_2fr_1.5fr_1.5fr] items-center px-6 py-4 bg-[#0a0a0c] border-b border-zinc-900/80 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                        <div>BOOK</div>
                        <div>GENRE</div>
                        <div>PRICE</div>
                        <div className="text-right pr-4">ACTIONS</div>
                    </div>

                    {/* Table / Card Body List */}
                    <div className="divide-y divide-zinc-900/50 bg-[#0c0c0e]">
                        {myBookmarks.map((item) => (
                            <div 
                                key={item._id} 
                                className="flex flex-col md:grid md:grid-cols-[3fr_2fr_1.5fr_1.5fr] md:items-center p-5 md:px-6 md:py-4 hover:bg-[#141417]/60 transition duration-150 gap-4 md:gap-0"
                            >
                                {/* ১. Book Info Section - ইমেজের ডানপাশে এক লাইনে শুধু টাইটেল */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-800/40">
                                        <img 
                                            src={item.coverImageUrl} 
                                            alt={item.title || "Book Cover"} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                        <h3 className="font-medium text-zinc-100 text-sm tracking-wide truncate">
                                            {item.title || "Untitled Book"}
                                        </h3>
                                    </div>
                                </div>

                                {/* মোবাইল রেসপন্সিভ ব্যালেন্সার */}
                                <div className="flex items-center justify-between md:contents border-t border-zinc-900/30 pt-3 md:pt-0">
                                    
                                    {/* ২. Genre Badge - ছবির মতো রাউন্ডেড বর্ডার থিম */}
                                    <div className="md:block">
                                        <span className="inline-block bg-[#111c34] text-[#3b82f6] text-[11px] px-3 py-1 rounded-full border border-[#1e3a8a]/60 font-medium truncate max-w-[150px]">
                                            {item.genre || "General"}
                                        </span>
                                    </div>

                                    {/* ৩. Price - ছবির মতো বোল্ড ফন্ট */}
                                    <div className="font-semibold text-zinc-100 text-sm md:block">
                                        ${item.price || "0"}
                                    </div>

                                    {/* ৪. Actions - ছবির মতো আইকন স্টাইলিং */}
                                    <div className="flex items-center justify-end text-zinc-400 md:block text-right md:pr-2">
                                        <Link 
                                            href={`/books/${item.bookId}`} 
                                            className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 rounded-lg transition"
                                            title="View Details"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookmarkPage;