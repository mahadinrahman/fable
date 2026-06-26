import UsersTableClient from '@/components/UsersTableClient';
import { getUsersList } from '@/lib/api/users';
import React from 'react';


const UsersPage = async () => {
    // সার্ভার সাইড থেকে ডাটা ফেচ করা হচ্ছে
    const data = await getUsersList();
    const users = data?.users || [];

    // স্ট্যাটিস্টিকস ক্যালকুলেশন
    const totalUsers = users.length;
    const recruitersCount = users.filter(u => u.role === 'writer' ).length; 
    const adminsCount = users.filter(u => u.role === 'admin').length;

    return (
        <div className="min-h-screen bg-[#121212] text-gray-200 p-6 md:p-10">
            {/* হেডার সেকশন */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-white tracking-tight">Users Management</h1>
                    <p className="text-sm text-gray-400 mt-1">Review, filter, and manage platform access for all users.</p>
                </div>
               
            </div>

            {/* স্ট্যাটস কার্ড সেকশন */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Active Users</p>
                    <p className="text-2xl font-bold text-white mt-2">{totalUsers}</p>
                    <p className="text-xs text-emerald-500 mt-1 font-medium">+100% vs last month</p>
                </div>
                <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Writers</p>
                    <p className="text-2xl font-bold text-white mt-2">{recruitersCount}</p>
                    <p className="text-xs text-emerald-500 mt-1 font-medium">High demand</p>
                </div>
                <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Admin Accounts</p>
                    <p className="text-2xl font-bold text-white mt-2">{adminsCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Full control</p>
                </div>
                <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Users Count</p>
                    <p className="text-2xl font-bold text-white mt-2">{totalUsers}</p>
                    <p className="text-xs text-amber-500 mt-1 font-medium">Steady activity</p>
                </div>
            </div>

            {/* ইউজার টেবিল (Client Component-এ ডাটা পাস করা হচ্ছে) */}
            <UsersTableClient  initialUsers={users} />
        </div>
    );
};

export default UsersPage;