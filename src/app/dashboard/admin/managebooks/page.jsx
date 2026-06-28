'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link'; 
import { motion, AnimatePresence } from 'framer-motion';

import { getUserSession } from '@/lib/core/session';
import { delelteBook, updateBook } from '@/lib/actions/books';
import { getAdminBooks } from '@/lib/api/books';


const EditIcon = () => <svg className="w-5 h-5 cursor-pointer text-slate-400 hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DeleteIcon = () => <svg className="w-5 h-5 cursor-pointer text-slate-400 hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const ViewIcon = () => <svg className="w-5 h-5 text-slate-400 hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

// --- Framer Motion Premium Animation Variants ---
const pageFadeVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } }
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.2 } }
};

const buttonInteraction = {
  hover: { scale: 1.04 },
  tap: { scale: 0.96 }
};

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        const user = await getUserSession();
        if (user) setCurrentUser(user);
        
        const allBooks = await getAdminBooks();

        if (allBooks && Array.isArray(allBooks)) {
          setBooks(allBooks);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books.');
      } finally {
        setLoading(false);
      }
    };
    loadAllBooks();
  }, []);

  const handleStatusToggle = async (bookId, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'unpublished' : 'published';
    setBooks((prev) =>
      prev.map((book) => (book._id === bookId ? { ...book, status: newStatus } : book))
    );
    toast.success(`Book status changed to ${newStatus}`, { autoClose: 1500 });

    try {
      await updateBook(bookId, { status: newStatus });
    } catch (error) {
      console.error('Database sync failed:', error);
      toast.error('Sync failed! Reverting back...');
      setBooks((prev) =>
        prev.map((book) => (book._id === bookId ? { ...book, status: currentStatus } : book))
      );
    }
  };

  const handleDelete = async (bookId) => {
    if (!confirm('Are you sure you want to delete this book permanently?')) return;
    const originalBooks = [...books];
    setBooks((prev) => prev.filter((book) => book._id !== bookId));
    toast.success('Book deleted successfully', { autoClose: 1500 });

    try {
      await delelteBook(bookId);
    } catch (error) {
      toast.error('Failed to delete from server. Restoring...');
      setBooks(originalBooks);
    }
  };

  const openEditModal = (book) => {
    setEditingBook({ ...book });
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB for faster uploads!');
      return;
    }

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY_HERE';
    setImageUploading(true);
    const imageData = new FormData();
    imageData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: imageData,
      });
      const result = await response.json();
      if (result.success) {
        setEditingBook((prev) => ({ ...prev, coverImageUrl: result.data.url }));
        toast.success('New cover image uploaded!');
      }
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setImageUploading(false);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    
    const { _id, title, genre, price, coverImageUrl, shortDescription, content } = editingBook;
    setBooks((prev) =>
      prev.map((b) => (b._id === _id ? { ...b, title, genre, price, coverImageUrl, shortDescription, content } : b))
    );
    setIsModalOpen(false);
    toast.success('Book updated successfully!');

    try {
      await updateBook(_id, { title, genre, price, coverImageUrl, shortDescription, content });
    } catch (error) {
      toast.error('Server update failed. Please refresh.');
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex justify-center items-center text-white font-medium">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}>
          Loading dashboard data...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={pageFadeVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#090a0f] text-slate-100 p-6 selection:bg-indigo-500"
    >
      <div className="max-w-7xl mx-auto bg-[#02040a]/60 border border-indigo-950/40 rounded-xl backdrop-blur-xl p-6 shadow-2xl">
        
        <motion.h2 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400"
        >
          Manage All Ebooks
        </motion.h2> 

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-900 text-xs uppercase tracking-wider text-slate-500 font-semibold bg-[#0d0e15]/40">
                <th className="py-4 px-4">Book</th>
                <th className="py-4 px-4">Genre</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={tableContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-slate-900/60"
            >
              {books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">No books found in the store.</td>
                </tr>
              ) : (
                books.map((book) => (
                  <motion.tr 
                    variants={rowVariants}
                    key={book._id} 
                    className="hover:bg-[#0d0e15]/30 transition-colors group"
                  >
                    <td className="py-4 px-4 flex items-center gap-4 max-w-sm">
                      <div className="overflow-hidden rounded bg-slate-900 border border-indigo-950/50 shadow-md shrink-0 w-12 h-16">
                        <motion.img 
                          whileHover={{ scale: 1.12 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          src={book.coverImageUrl || 'https://via.placeholder.com/150'} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <h4 className="font-semibold text-slate-200 truncate group-hover:text-white transition-colors">{book.title}</h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{book.shortDescription}</p>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/30">
                        {book.genre}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-semibold text-slate-300">
                      ${parseFloat(book.price || 0).toFixed(2)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <motion.button
                        variants={buttonInteraction}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleStatusToggle(book._id, book.status)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium border capitalize select-none cursor-pointer mx-auto block transition-colors ${
                          book.status === 'published' 
                            ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/40 hover:bg-emerald-900/20' 
                            : 'bg-amber-950/30 text-amber-500 border-amber-900/40 hover:bg-amber-900/20'
                        }`}
                      >
                        {book.status}
                      </motion.button>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-4">
                        <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.93 }}>
                          <Link href={`/books/${book._id}`} title="View Details">
                            <ViewIcon />
                          </Link>
                        </motion.div>

                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.93 }} onClick={() => openEditModal(book)} aria-label="Edit book">
                          <EditIcon />
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.93 }} onClick={() => handleDelete(book._id)} aria-label="Delete book">
                          <DeleteIcon />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>

        {/* AnimatePresence for Seamless Mount/Unmount Transitions */}
        <AnimatePresence>
          {isModalOpen && editingBook && (
            <motion.div 
              variants={modalOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            >
              <motion.div 
                variants={modalContentVariants}
                className="w-full max-w-3xl bg-[#02040a] border border-indigo-950 rounded-2xl p-6 shadow-3xl max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                
                <div className="flex items-center justify-between border-b border-indigo-950/60 pb-4 mb-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Edit Ebook: {editingBook.title}
                  </h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-400 hover:text-white transition-colors text-xl font-semibold"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Book Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={editingBook.title}
                      onChange={handleModalInputChange}
                      className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-all text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-400 block mb-1">Genre</label>
                      <input
                        type="text"
                        name="genre"
                        required
                        value={editingBook.genre}
                        onChange={handleModalInputChange}
                        className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-all text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400 block mb-1">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        required
                        step="0.01"
                        value={editingBook.price}
                        onChange={handleModalInputChange}
                        className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-all text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Update Cover Image</label>
                    <div className="bg-[#0d0e15] border border-indigo-950/60 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleModalImageUpload}
                        disabled={imageUploading}
                        className="block w-full text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-950/60 file:text-indigo-400 hover:file:bg-indigo-900/60 file:cursor-pointer"
                      />
                      {imageUploading && <span className="text-xs text-indigo-400 animate-pulse shrink-0">Uploading...</span>}
                    </div>
                    {editingBook.coverImageUrl && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-emerald-400">Current View:</span>
                        <img src={editingBook.coverImageUrl} className="w-8 h-10 object-cover rounded" alt="Preview"/>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Short Description</label>
                    <textarea
                      name="shortDescription"
                      required
                      rows={2}
                      value={editingBook.shortDescription}
                      onChange={handleModalInputChange}
                      className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-all text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Full Content</label>
                    <textarea
                      name="content"
                      required
                      rows={5}
                      value={editingBook.content}
                      onChange={handleModalInputChange}
                      className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-all text-white resize-y"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2 border-t border-indigo-950/60">
                    <motion.button
                      variants={buttonInteraction}
                      whileHover="hover"
                      whileTap="tap"
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-xs rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors border border-indigo-950/40"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      variants={buttonInteraction}
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      disabled={modalLoading || imageUploading}
                      className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#9146FF] to-[#FF007A] text-white hover:opacity-90 transition-opacity shadow-md disabled:opacity-50"
                    >
                      Save Updates
                    </motion.button>
                  </div>
                </form>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default ManageBooks;