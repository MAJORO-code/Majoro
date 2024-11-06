import React, { useState } from 'react';
import './ProductManagement.css';

const ProductManagement = ({ inventory, setInventory }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        quantity: '',
        price: ''
    });
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) };

        if (editIndex !== null) {
            // Update existing product
            setInventory((prevInventory) => 
                prevInventory.map((product, index) => index === editIndex ? newProduct : product)
            );
            setEditIndex(null);
        } else {
            // Add new product
            setInventory((prevInventory) => [...prevInventory, newProduct]);
        }
        
        // Reset form data
        setFormData({ name: '', description: '', category: '', quantity: '', price: '' });
    };

    const handleEdit = (index) => {
        setFormData(inventory[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        setInventory((prevInventory) => prevInventory.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <h2>Product Management</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="form-input"
                />
                <button type="submit">{editIndex !== null ? 'Update Product' : 'Add Product'}</button>
            </form>
            <h3>Product List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td>${parseFloat(product.price).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;