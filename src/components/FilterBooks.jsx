'use client';

import React, { useState, useMemo, useEffect } from 'react';
import BooksCard from '@/components/BooksCard';
import { useRouter } from 'next/navigation';

const fixedGenres = ['All', 'Fiction', 'Self-Update', 'Self-help', 'Story', 'Romantic'];

const FilteredBooks = ({ books = [], filters }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(filters?.search || '');
  const [selectedGenre, setSelectedGenre] = useState(filters?.genre || 'All');

  const filteredBooks = useMemo(() => {
    if (!Array.isArray(books)) return [];

    return books.filter((book) => {
      if (!book) return false;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || book.title?.toLowerCase().includes(query);

      const currentGenre = book.genre?.toLowerCase() || '';
      const matchesGenre = selectedGenre === 'All' || currentGenre === selectedGenre.toLowerCase();

      return matchesSearch && matchesGenre;
    });
  }, [books, searchQuery, selectedGenre]);

  const totalItems = filteredBooks.length;

  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) sp.set('search', searchQuery);
    if (selectedGenre !== 'All') sp.set('genre', selectedGenre);

    const path = `?${sp.toString()}`;
    router.push(path, { scroll: false });
  }, [router, selectedGenre, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedGenre !== 'All';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
  };

  return (
    <>
      {/* Dropdown option styles injected globally */}
      <style>{`
        .genre-select option {
          background-color: #1e1b2e;
          color: #c4b5fd;
          font-size: 14px;
          padding: 8px 12px;
        }
        .genre-select option:hover,
        .genre-select option:checked {
          background-color: #4c1d95;
          color: #ede9fe;
        }
        .genre-select:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.25);
        }
        .search-input:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.25);
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4">

        {/* ─── SEARCH & GENRE FILTER ROW ─── */}
        <div className="flex flex-row items-center gap-3 mb-6 w-full">

          {/* Search Input */}
          <div className="relative flex-1 min-w-[150px]">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: '#7c3aed' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>

            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full rounded-xl pl-10 pr-10 py-3 text-sm h-11 transition-all"
              style={{
                backgroundColor: '#13111e',
                border: '1px solid #2e2a45',
                color: '#e2d9f3',
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#6d5fa0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                onMouseLeave={e => e.currentTarget.style.color = '#6d5fa0'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative w-40 sm:w-48 shrink-0">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="genre-select w-full appearance-none rounded-xl pl-4 pr-10 py-3 text-sm h-11 cursor-pointer transition-all"
              style={{
                backgroundColor: '#13111e',
                border: '1px solid #2e2a45',
                color: '#c4b5fd',
              }}
            >
              {fixedGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: '#7c3aed' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ─── RESULTS SUMMARY ─── */}
        <div className="flex items-center justify-between mb-5 min-h-[24px]">
          <p className="text-xs" style={{ color: '#6d5fa0' }}>
            <span className="font-medium" style={{ color: '#a78bfa' }}>{totalItems}</span>{' '}
            {totalItems === 1 ? 'book' : 'books'} found
            {hasActiveFilters && (
              <span className="font-medium" style={{ color: '#a78bfa' }}> · filtered</span>
            )}
          </p>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors"
              style={{
                color: '#a78bfa',
                backgroundColor: 'rgba(124, 58, 237, 0.08)',
                borderColor: 'rgba(124, 58, 237, 0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#c4b5fd';
                e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#a78bfa';
                e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.08)';
              }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>

        {/* ─── BOOKS RENDERING GRID ─── */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mb-8">
            {filteredBooks.map((book) => {
              if (!book?._id) return null;
              return <BooksCard key={book._id} book={book} />;
            })}
          </div>
        ) : (
          /* Empty State */
          <div
            className="text-center py-20 rounded-2xl"
            style={{
              border: '1px dashed #2e2a45',
              backgroundColor: 'rgba(19, 17, 30, 0.3)',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(124, 58, 237, 0.08)',
                  border: '1px solid #2e2a45',
                }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: '#6d5fa0' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: '#e2d9f3' }}>No books found</p>
                <p className="text-xs mt-1" style={{ color: '#6d5fa0' }}>
                  Try adjusting your title search or category selection
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-2 text-xs underline underline-offset-2 transition-colors"
                  style={{ color: '#a78bfa' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilteredBooks;