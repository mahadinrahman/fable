import { getAllBooks } from '@/lib/api/books';
import Link from 'next/link';
import React from 'react';
import BooksCard from './BooksCard';
import { ArrowRight } from 'lucide-react';

const FeaturedBooks = async () => {
    const books = await getAllBooks() || [];
    
    // Sobar sheshe add kora 6ta boi ber korar jonno array take reverse kore slice kora holo
    const latestBooks = [...books.data].slice(0, 6);

    return (
        <section className="py-12 max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold ">Featured Books</h2>
                {/* View All Button */}
                <Link 
                    href="/books" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200 flex justify-center items-center gap-1"
                >
                    View All Books<ArrowRight></ArrowRight>
                </Link>
            </div>

            {/* Books Grid */}
            {latestBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {latestBooks.map((book) => (
                        <BooksCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-10">No books found.</p>
            )}
        </section>
    );
};

export default FeaturedBooks;