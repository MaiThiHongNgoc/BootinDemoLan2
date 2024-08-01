import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../Service (1)/productService';
import { getAuthors } from '../Service (1)/authorService';
import { getCategories } from '../Service (1)/categoryService';
import './ProductForm.css';

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        author: { author_id: '' },
        description: '',
        price: '',
        categories: { category_id: '' },
        is_deleted: true
    });

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadAuthors();
        loadCategories();
    }, []);

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name,
                author: { author_id: product.author.author_id },
                description: product.description,
                price: product.price,
                categories: { category_id: product.categories.category_id },
                is_deleted: product.is_deleted
            });
        } else {
            setFormData({
                product_name: '',
                author: { author_id: '' },
                description: '',
                price: '',
                categories: { category_id: '' },
                is_deleted: true
            });
        }
    }, [product]);

    const loadAuthors = async () => {
        try {
            const data = await getAuthors();
            setAuthors(data);
        } catch (error) {
            console.error('Failed to fetch authors', error);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }   
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => {
            if (name === 'author_id') {
                return {
                    ...prevState,
                    author: { ...prevState.author, author_id: value }
                };
            } else if (name === 'category_id') {
                return {
                    ...prevState,
                    categories: { ...prevState.categories, category_id: value }
                };
            } else {
                return { ...prevState, [name]: value };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product) {
                await updateProduct(product.product_id, formData);
            } else {
                await createProduct(formData);
            }
            setFormData({
                product_name: '',
                author: { author_id: '' },
                description: '',
                price: '',
                categories: { category_id: '' },
                is_deleted: true
            });
            onSave();
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert('Error: ' + error.response.data.message);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('Error: No response from server.');
            } else {
                console.error('Error message:', error.message);
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div>
                <label>Product Name</label>
                <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Author</label>
                <select
                    name="author_id"
                    value={formData.author.author_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select author...</option>
                    {authors.map(author => (
                        <option key={author.author_id} value={author.author_id}>
                            {author.author_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category</label>
                <select
                    name="category_id"
                    value={formData.categories.category_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select category...</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="product-form-button-save" type="submit">Save</button>
        </form>
    );
};

export default ProductForm;