import { getAllBooks } from '@/lib/api/books';
import BooksCard from '@/components/BooksCard'; // আপনার সঠিক পাথ অনুযায়ী ইম্পোর্ট করুন
import React from 'react';
import FilteredBooks from '@/components/FilterBooks';

const ALlBooksPage = async ({searchParams}) => {
    // API থেকে ডেটা ফেচ করা হচ্ছে (await ব্যবহার করতে হবে)
    const books = await getAllBooks(); 
    const resolvedParams = await searchParams;
    const search = resolvedParams?.search || "";
    const genre = resolvedParams?.genre || "";

    // API theke shorasori shob boiyer data r global array hishebe ana hocche
    const allBooks = await getAllBooks() || []; 

    // Client filter-e pathanor jonno object
    const activeFilters = { search, genre };
    return (
        <div className="bg-[#0a0a0a] min-h-screen py-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-white mb-8">All Books</h1>
               <FilteredBooks books={allBooks} filters={activeFilters}></FilteredBooks>
                {/* Responsive Grid Layout */}
                {/* {books && books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
                        {books.map((book) => (
                            <BooksCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-10">No books found.</p>
                )} */}
            </div>
        </div>
    );
};

export default ALlBooksPage;