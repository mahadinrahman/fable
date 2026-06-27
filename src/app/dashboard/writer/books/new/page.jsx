'use client';

import { createBook } from '@/lib/actions/books';
import { getUserSession } from '@/lib/core/session';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// এটি জাস্ট একটি ডামি ফাংশন, এখানে আপনার আসল সেশন গেট করার ফাংশনটি ইম্পোর্ট করবেন।
// যেমন: import { getUserSession } from '@/lib/auth';

const AddEbookForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    price: '',
    coverImageUrl: '',
    shortDescription: '',
    content: '',
  });

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🌍 imgBB Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY_HERE';
    
    if (IMGBB_API_KEY === 'YOUR_IMGBB_API_KEY_HERE') {
      toast.error('Please configure your imgBB API key');
      return;
    }

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
        setFormData((prev) => ({ ...prev, coverImageUrl: result.data.url }));
        toast.success('Cover image uploaded successfully to imgBB!');
      } else {
        toast.error('Failed to upload image to imgBB');
      }
    } catch (error) {
      console.error('imgBB Upload Error:', error);
      toast.error('Error uploading image');
    } finally {
      setImageUploading(false);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.coverImageUrl) {
      toast.error('Please upload a cover image first!');
      return;
    }

    setLoading(true);
    let isSuccess = false;

    try {
      // 👤 ইউজারের সেশন ডাটা ব্রাউজার/ক্লায়েন্ট সাইড থেকে আনা হচ্ছে
      const user = await getUserSession();

      if (!user || !user?.id) {
        toast.error('You must be logged in to publish an ebook!');
        setLoading(false);
        return;
      }

      // 📦 অরিজিনাল ফর্ম ডাটার সাথে ইউজারের ইনফো এবং status যুক্ত করা হচ্ছে
      const finalBookData = {
        ...formData,
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        userImage:user?.image,
        status: "published" // 👈 এখানে status: "published" অ্যাড করা হয়েছে
      };

      console.log('Submitting Ebook Data with User Info & Status:', finalBookData);
      
      // Server Action-এ সম্পুর্ণ ডাটা অবজেক্ট পাঠানো হলো
      const res = await createBook(finalBookData);
      
      if (res && (res.insertedId || res.success)) {
        toast.success('Ebook published successfully! 🚀');
        
        // Form Reset
        setFormData({
          title: '',
          genre: '',
          price: '',
          coverImageUrl: '',
          shortDescription: '',
          content: '',
        });

        isSuccess = true;
      } else {
        toast.error(res?.message || 'Failed to publish the ebook. Try again.');
      }

    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('Something went wrong while publishing.');
    } finally {
      setLoading(false);
    }

    // Redirecting outside the try-catch block
    if (isSuccess) {
      router.push('/dashboard/writer/books');
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 p-6 flex justify-center items-center selection:bg-indigo-500">
      <div className="w-full max-w-4xl bg-[#02040a]/60 border border-indigo-950/50 rounded-2xl p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="mb-8 border-b border-indigo-950/40 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent">
            Publish a New Ebook
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Share your stories with readers around the world.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Book Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Book Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all text-white placeholder-slate-600"
            />
          </div>

          {/* Genre and Price Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Genre</label>
              <input
                type="text"
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
                placeholder="Sci-Fi, Fiction, Mystery..."
                className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all text-white placeholder-slate-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Price ($)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00 (Leave 0 for free)"
                className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all text-white placeholder-slate-600"
              />
            </div>
          </div>

          {/* Cover Image Upload (imgBB Integration) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Cover Image</label>
            <div className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={imageUploading}
                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-950/60 file:text-indigo-400 hover:file:bg-indigo-900/60 file:cursor-pointer"
              />
              {imageUploading && (
                <span className="text-xs text-indigo-400 animate-pulse shrink-0">Uploading to imgBB...</span>
              )}
            </div>
            {formData.coverImageUrl && (
              <p className="text-xs text-emerald-400 mt-1 truncate">
                Uploaded URL: <a href={formData.coverImageUrl} target="_blank" rel="noreferrer" className="underline">{formData.coverImageUrl}</a>
              </p>
            )}
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Short Description</label>
            <textarea
              name="shortDescription"
              required
              rows={3}
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Write a brief catchphrase or summary of your book..."
              className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all text-white placeholder-slate-600 resize-none"
            />
          </div>

          {/* Ebook Content */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Ebook Content (Full Book Text)</label>
            <textarea
              name="content"
              required
              rows={8}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write or paste your entire book chapters and story content here..."
              className="w-full bg-[#0d0e15] border border-indigo-950/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all text-white placeholder-slate-600 resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || imageUploading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9146FF] to-[#FF007A] text-white text-sm font-bold hover:opacity-90 transition-all shadow-[0_0_30px_rgba(145,70,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publishing Ebook...' : 'Publish Ebook'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddEbookForm;