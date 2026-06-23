"use client";

import { addBookmark } from '@/lib/actions/bookmark';
import { getBookmark } from '@/lib/api/bookmark';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BookmarkButtonClient = ({ bookId, book, user }) => {

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const savedBookmarks = await getBookmark();

                if (savedBookmarks && Array.isArray(savedBookmarks)) {
                    const alreadyBookmarked = savedBookmarks.some(
                        b => String(b.bookId) === String(bookId)
                    );
                    if (alreadyBookmarked) {
                        setIsBookmarked(true);
                    }
                } else {
                    console.warn("Expected an array from getBookmark, but received:", savedBookmarks);
                }
            } catch (error) {
                console.error("Error checking bookmark status:", error);
            } finally {
                setChecking(false);
            }
        };

        if (bookId) {
            checkStatus();
        }
    }, [bookId]);

    const handleBookmarkClick = async () => {
        setLoading(true);
        try {

            const bookmarkData = {
                bookId: bookId,
                bookmarkedAt: new Date(),
                
               
                userEmail: user?.email || "unknown@user.com", 
                userName: user?.name || "Anonymous User", 

               
                title: book?.title || "Untitled Book",
                genre: book?.genre || "Unknown Genre",
                price: book?.price || "0.00",
                coverImageUrl: book?.coverImageUrl || "https://via.placeholder.com/150",
                shortDescription: book?.shortDescription || "",
                authorName: book?.userName || "Unknown Author",
                authorEmail: book?.userEmail || "", 
                status: book?.status || "published"
            };

            const response = await addBookmark(bookmarkData);

            if (response && (response.insertedId || response.acknowledged)) {
                setIsBookmarked(true);
                toast.success("Bookmarked successfully! 🎉");
            } else {
                toast.error("Failed to add bookmark.");
            }
        } catch (error) {
            console.error("Bookmark Error:", error);
            toast.error("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleBookmarkClick}
                disabled={loading || isBookmarked || checking}
                className={`w-full font-semibold py-3 px-6 rounded-xl border transition active:scale-[0.99] duration-150 text-center text-sm ${isBookmarked
                        ? 'bg-transparent text-emerald-500 border-emerald-500 cursor-not-allowed'
                        : 'bg-transparent text-zinc-300 border-zinc-700 hover:bg-zinc-900 hover:text-white'
                    }`}
            >
                {checking ? 'Checking...' : loading ? 'Processing...' : isBookmarked ? 'Bookmarked ✓' : 'Bookmark'}
            </button>
        </>
    );
};

export default BookmarkButtonClient;