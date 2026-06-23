import { DashboardSidebar } from '@/components/DashboardSidebar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const layout = ({children}) => {
    return (
        <div className='md:flex min-h-screen '>
            <DashboardSidebar></DashboardSidebar>
            <div className='flex-1'>{children}</div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default layout;