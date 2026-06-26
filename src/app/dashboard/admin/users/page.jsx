import { getUsers } from '@/lib/api/users';
import React from 'react';

const UsersPage = async() => {
    const users=await getUsers();
    
    return (
        <div>
            <h3>Users Page</h3>
        </div>
    );
};

export default UsersPage;