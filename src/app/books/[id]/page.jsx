import BookmarkButtonClient from '@/components/BookmarkButton';
import { getDetailsBook } from '@/lib/api/books';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const DetailsBookPage = async ({ params }) => {
    const { id } = await params;
    const book = await getDetailsBook(id);
    const user = await getUserSession();
    const isOwnBook = user?.email === book?.userEmail;
    if (!book) {
        return (
            <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
                <div className="text-center py-20 text-zinc-400">
                    <p className="text-xl font-semibold mb-2">Book not found!</p>
                    <p className="text-sm">Please check the URL or try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-6">
            <div className="max-w-4xl w-full flex flex-col md:flex-row gap-10 items-center bg-[#181818] p-8 rounded-2xl shadow-xl">

                {/* Left Side: Simple Square Picture */}
                <div className="w-full md:w-1/2 max-w-[400px] aspect-square rounded-xl overflow-hidden bg-gray-900 border border-zinc-800 shadow-lg">
                    <img
                        src={book.coverImageUrl || "https://via.placeholder.com/150"}
                        alt={book.title || "Book Cover"}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side: Details & Actions */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">

                    {/* Genre & Status Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {book.genre && (
                            <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full font-medium tracking-wide border border-zinc-700 uppercase">
                                {book.genre}
                            </span>
                        )}
                        {book.status === 'published' && (
                            <span className="bg-[#1e3a2f] text-[#4ade80] text-xs px-3 py-1 rounded-full font-semibold tracking-wide border border-[#1e3a2f] capitalize">
                                {book.status}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        {book.title}
                    </h1>

                    <p className="text-sm text-zinc-400 mb-4">
                        by <span className="text-zinc-200 font-medium">{book.userName || "Unknown Author"}</span>
                    </p>

                    <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                        {book.shortDescription}
                    </p>

                    <div className="text-2xl font-bold text-white mb-6">
                        ${book.price}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 w-full max-w-sm">
                        
                            <div className="mt-6">
                                {isOwnBook ? (
                                    
                                    <button
                                        disabled
                                        className="w-full bg-zinc-100 text-zinc-400 font-semibold py-3 px-6 rounded-xl cursor-not-allowed text-center text-sm border border-zinc-200"
                                    >
                                        You are the author of this book ✍️
                                    </button>
                                ) : (
                                   
                                    <form action="/api/checkout_sessions" method="POST">
                                        <input type="hidden" name="bookId" value={book._id} />
                                        <button
                                            type="submit"
                                            role="link"
                                            className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-zinc-200 transition active:scale-[0.99] duration-150 text-sm border border-zinc-300 shadow-sm"
                                        >
                                            Buy Now
                                        </button>
                                    </form>
                                )}
                            </div>
                      

                        <BookmarkButtonClient user={user} book={book} bookId={book._id} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailsBookPage;