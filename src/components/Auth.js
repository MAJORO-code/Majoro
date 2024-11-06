import React, { useState, useEffect } from 'react';

function Auth({ setCurrentUser, setUsers, currentUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [message, setMessage] = useState('');
    const [hasUsers, setHasUsers] = useState(false);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        setHasUsers(users.length > 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        if (!username || !password) {
            setMessage('Please fill in all fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (isLogin) {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                user.loginTime = new Date().toISOString();
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                setMessage('Login successful!');
            } else {
                setMessage('Invalid username or password.');
            }
        } else {
            const userExists = users.find(user => user.username === username);
            if (userExists) {
                setMessage('User already exists. Please log in.');
            } else {
                const newUser = { username, password, loginTime: null, logoutTime: null };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                setMessage('Signup successful! You can now log in.');
                setIsLogin(true);
                setUsers(users);
            }
        }

        // Clear input fields
        setUsername('');
        setPassword('');
    };

    const toggleAuthMode = () => {
        if (hasUsers) {
            setIsLogin(!isLogin);
        } else {
            setMessage('You must sign up first.');
        }
    };

    return (
        <section id="auth">
            {currentUser ? ( // Check if currentUser is defined
                <h2>Welcome , {currentUser.username}!</h2>
            ) : (
                <>
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                    </form>
                    {message && <div className="auth-message">{message}</div>}
                    {isLogin && hasUsers && (
                        <div style={{ marginTop: '10px' }}>
                            <p>Don't have an account?</p>
                            <button onClick={toggleAuthMode}>Switch to Sign Up</button>
                        </div>
                    )}
                    {!isLogin && (
                        <div style={{ marginTop: '10px' }}>
                            <p>Already have an account?</p>
                            <button onClick={toggleAuthMode}>Switch to Login</button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default Auth;