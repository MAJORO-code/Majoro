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