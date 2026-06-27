"use client";

import { updateUsers } from '@/lib/actions/users';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UsersTableClient = ({ initialUsers = [] }) => {
   
    const [users, setUsers] = useState(
        (initialUsers || []).map(user => ({
            ...user,
            status: user.status || "active" 
        }))
    );
    const [actionLoadingId, setActionLoadingId] = useState(null);

   
    const handleToggleRole = async (userId, currentRole) => {
        if (!userId) return;
        const newRole = currentRole === 'admin' ? 'reader' : 'admin'; 
        
        setActionLoadingId(userId);
        try {
           
            await updateUsers(userId, { role: newRole });

            
            setUsers(prevUsers => 
                prevUsers.map(user => {
                    const id = user._id || user.id;
                    return id === userId ? { ...user, role: newRole } : user;
                })
            );
            toast.success(`Role is successfully changed by ${newRole}!`);
        } catch (error) {
            console.error("Failed to update role:", error);
            toast.error("Failed to update role!");
        } finally {
            setActionLoadingId(null);
        }
    };

   
    const handleToggleStatus = async (userId, currentStatus) => {
        if (!userId) return;
        const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
        
        setActionLoadingId(userId);
        try {
            setUsers(prevUsers => 
                prevUsers.map(user => {
                    const id = user._id || user.id;
                    return id === userId ? { ...user, status: newStatus } : user;
                })
            );
            toast.info(`User status is now ${newStatus === 'suspended' ? 'Suspended' : 'Active'}`);
        } catch (error) {
            console.error("Failed to update status:", error);
            toast.error("Failed to update statu!");
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase bg-[#151515]">
                            <th className="px-6 py-4">User Name</th>
                            <th className="px-6 py-4">Email Address</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Join Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60 text-sm">
                        {users.map((user, index) => {
                            const currentId = user._id || user.id || `user-key-${index}`;
                            const isSuspended = user.status === 'suspended';
                            const hasValidImage = user.image && user.image.startsWith('http');

                            return (
                                <tr key={currentId} className="hover:bg-[#222] transition-colors group">
                                    {/* ইউজার নেম ও ইমেজ */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 overflow-hidden relative flex-shrink-0">
                                                {hasValidImage ? (
                                                    <img 
                                                        src={user.image} 
                                                        alt={user.name || "User"} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                                                )}
                                            </div>
                                            <div className="font-medium text-white">{user.name || 'Unknown User'}</div>
                                        </div>
                                    </td>

                                    {/* ইমেইল */}
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                        {user.email || 'N/A'}
                                    </td>

                                    {/* রোল */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                                            user.role === 'admin' 
                                            ? 'bg-purple-950/40 text-purple-400 border-purple-800' 
                                            : 'bg-gray-800/60 text-gray-300 border-gray-700'
                                        }`}>
                                            👤 {user.role || 'reader'}
                                        </span>
                                    </td>

                                    {/* জয়েন ডেট */}
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                            month: 'short', day: '2-digit', year: 'numeric'
                                        }) : 'N/A'}
                                    </td>

                                    {/* স্ট্যাটাস */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border ${
                                            isSuspended 
                                            ? 'text-red-400 bg-red-950/30 border-red-900' 
                                            : 'text-emerald-400 bg-emerald-950/30 border-emerald-900'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isSuspended ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                                            {isSuspended ? 'Suspended' : 'Active'}
                                        </span>
                                    </td>

                                    {/* অ্যাকশন বাটনসমূহ */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-3">
                                        <button 
                                            disabled={actionLoadingId === currentId}
                                            onClick={() => handleToggleRole(user._id || user.id, user.role)}
                                            className="text-gray-400 hover:text-white transition-colors disabled:opacity-40"
                                        >
                                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                        </button>
                                        <button 
                                            disabled={actionLoadingId === currentId}
                                            onClick={() => handleToggleStatus(user._id || user.id, user.status)}
                                            className={`transition-colors disabled:opacity-40 ${isSuspended ? 'text-emerald-400 hover:text-emerald-300' : 'text-red-400 hover:text-red-300'}`}
                                        >
                                            {isSuspended ? 'Unsuspend' : 'Suspend'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTableClient;