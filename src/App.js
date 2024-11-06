import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import ameliaImage from './components/amelia1.png'; // Correcting the import here
import './App.css';

function App() {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [inventory, setInventory] = useState(JSON.parse(localStorage.getItem('inventory')) || []);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, [inventory]);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const logout = () => {
        if (currentUser) {
            const logoutTime = new Date().toISOString();
            const updatedUsers = users.map(user =>
                user.username === currentUser.username ? { ...user, logoutTime } : user
            );

            setUsers(updatedUsers);
            setCurrentUser(null);
            localStorage.removeItem('currentUser');
        }
    };

    return (
        <Router>
            <div className="App">
                <header className="header">
                    <h1>Wings Cafe Inventory Management System</h1>
                    <img src={ameliaImage} alt="Amelia" className="header-image" /> {/* Displaying the image */}
                    <div id="user-info">{currentUser ? `Welcome, ${currentUser.username}` : 'Please log in'}</div>
                </header>

                <nav className="navbar">
                    <div className="navbar-center">
                        {currentUser ? (
                            <>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/product-management">Product Management</Link>
                                <Link to="/user-management">User Management</Link>
                                <button onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <Link to="/auth">Login / Sign Up</Link>
                        )}
                    </div>
                </nav>

                <main>
                    <Routes>
                        <Route path="/dashboard" element={currentUser ? <Dashboard inventory={inventory} /> : <Navigate to="/auth" />} />
                        <Route path="/auth" element={<Auth setCurrentUser={setCurrentUser} setUsers={setUsers} currentUser={currentUser} />} />
                        <Route path="/product-management" element={currentUser ? <ProductManagement inventory={inventory} setInventory={setInventory} /> : <Navigate to="/auth" />} />
                        <Route path="/user-management" element={currentUser ? <UserManagement users={users} setUsers={setUsers} /> : <Navigate to="/auth" />} />
                        <Route path="/" element={<Navigate to="/auth" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;