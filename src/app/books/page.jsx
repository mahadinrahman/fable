import { getAllBooks } from '@/lib/api/books';
import BooksCard from '@/components/BooksCard';
import React from 'react';
import FilteredBooks from '@/components/FilterBooks';
import { Pagination } from '@heroui/react';
import Link from 'next/link';

const ALlBooksPage = async ({ searchParams }) => {
    const params = await searchParams;

    // API theke shorasori shob boiyer data ana hocche
    const booksData = await getAllBooks(params.page) || [];

    // Notun add kora boigula age dekharnor jonno array-ti ke reverse kora holo
    const allBooks = [...booksData.data];

    const search = params?.search || "";
    const genre = params?.genre || "";

    // Client filter-e pathanor jonno object
    const activeFilters = { search, genre };
   
    // pagination........................

    const page=booksData.page;
    const totalPage=booksData.totalPage;
    const pages=[];
    for(let i=1;i<=totalPage;i++)
    {
        pages.push(i)
    }
    console.log(pages);

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

                <Pagination size="sm">
                    
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={page === 1}
                            >
                                <Link className='flex' href={`/books?page=${page-1}`}>
                                <Pagination.PreviousIcon />
                                Prev </Link>
                            </Pagination.Previous>
                        </Pagination.Item>

                        {pages.map((p) => (
                            <Pagination.Item key={p}>
                                <Link href={`/books?page=${p}`}>
                                <Pagination.Link isActive={p === page} >
                                    {p}
                                </Pagination.Link>
                                </Link>
                            </Pagination.Item>
                        ))}
                        <Pagination.Item >
                            <Pagination.Next
                                isDisabled={page === totalPage}
                              
                            >
                         <Link className='flex' href={`/books?page=${page+1}`}> Next<Pagination.NextIcon /></Link>
                            </Pagination.Next>
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    );
};

export default ALlBooksPage;