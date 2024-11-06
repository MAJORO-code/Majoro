import React from 'react';

function UserManagement({ users, setUsers }) {
    const handleDeleteUser = (username) => {
        const updatedUsers = users.filter(user => user.username !== username);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    return (
        <section id="user-management" className="section">
            <h2>User Management</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.username}>
                        <span>
                            {user.username}
                            {user.loginTime ? ` (Logged in: ${new Date(user.loginTime).toLocaleString()})` : ''}
                            {user.logoutTime ? `, (Logged out: ${new Date(user.logoutTime).toLocaleString()})` : ''}
                        </span>
                        <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default UserManagement;