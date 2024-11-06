import React from 'react';

function Dashboard({ inventory }) {
    return (
        <section id="dashboard" className="section">
            <h2>Dashboard</h2>
            <h3>Current Stock Levels</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price ($)</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>${parseFloat(product.price).toFixed(2)}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Dashboard;