'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createPayment } from '@/lib/actions/payment';


const SuccessContent = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id'); 
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('Processing your order...');

    useEffect(() => {
        const saveInfo = async () => {
            if (!sessionId) {
                setStatusMessage('Invalid Session! Missing session_id.');
                setLoading(false);
                return;
            }

            const response = await createPayment({sessionId});

            if (response.success) {
                setStatusMessage('Payment details successfully recorded!');
            } else {
                setStatusMessage('Payment verified but failed to save in Database.');
            }
            setLoading(false);
        };

        saveInfo();
    }, [sessionId]);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
            {/* 🟢 Animated Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full animate-bounce">
                    <svg 
                        className="w-16 h-16 text-green-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="3" 
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* 📝 Payment Success Messages */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                Payment Successful! 🎉
            </h1>
            <p className="text-gray-500 font-medium mb-6">
                Thank you for your purchase. Your order has been processed successfully, and your book is now accessible.
            </p>

            {/* 💳 Transaction Info Card */}
            <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-100 mb-8">
                <div className="flex justify-between text-sm text-gray-600 py-1">
                    <span>Database Sync:</span>
                    <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${loading ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>
                        {loading ? 'Saving...' : 'Done'}
                    </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 py-1">
                    <span>Status Note:</span>
                    <span className="font-medium text-gray-800 text-xs">{statusMessage}</span>
                </div>
            </div>

            {/* 🔘 Action Buttons */}
            <div className="flex flex-col gap-3">
                <Link 
                    href="/books" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 ease-in-out shadow-lg shadow-indigo-100 text-center"
                >
                    Go to All Books Page
                </Link>
                
                <Link 
                    href="/" 
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition duration-200 ease-in-out text-center"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};


const SuccessPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <Suspense fallback={<div className="text-gray-500 font-medium">Loading payment status...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
};

export default SuccessPage;