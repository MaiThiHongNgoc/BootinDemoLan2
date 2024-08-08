import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import './ProductList.css';
import { updateProduct } from '../Service (1)/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const [apiType, setApiType] = useState('all');

    useEffect(() => {
        loadProducts(currentPage, apiType);
    }, [currentPage, productsPerPage, apiType]);

    const loadProducts = async (page, apiType) => {
        setLoading(true);
        setError('');
        try {
            let response;
            if (apiType === 'deleted') {
                response = await axios.get('http://localhost:9191/api/products/v1/false');
            } else {
                response = await axios.get('http://localhost:9191/api/products/v1/', {
                    params: { p: page }
                });
            }
            setProducts(response.data.content || []);
            setTotalProducts(response.data.totalElements || 0);
        } catch (error) {
            console.error('Failed to fetch products', error);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (product) => {
        try {
            const updatedProduct = { ...product, is_deleted: !product.is_deleted };
            await updateProduct(product.product_id, updatedProduct);
            loadProducts(currentPage, apiType);
        } catch (error) {
            console.error('Failed to update product', error);
            setError('Failed to update product. Please try again later.');
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        loadProducts(currentPage, apiType);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleApiTypeChange = (e) => {
        setApiType(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    return (
        <div className="product-container">
            <h1>Product Management</h1>
            <button className="product-button-add" onClick={handleAddProduct}>Add Product</button>
            {showForm && (
                <ProductForm product={editingProduct} onSave={handleFormClose} />
            )}
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="product-search"
            />
            <select onChange={handleApiTypeChange} value={apiType} className="api-select">
                <option value="all">Products</option>
                <option value="deleted">Restore</option>
            </select>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Author Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.product_id}>
                                    <td>{product.product_name}</td>
                                    <td>{product.author?.author_name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categories?.category_name}</td>
                                    <td>
                                        {product.imgProducts && product.imgProducts.map(imgProduct => (
                                            <img key={imgProduct.img_id} src={imgProduct.img_url} alt={imgProduct.img_name} className="product-image" />
                                        ))}
                                    </td>
                                    <td>
                                        <button className="product-button-edit" onClick={() => handleEdit(product)}>Edit</button>
                                        <button
                                            className={`product-button ${product.is_deleted ? 'product-button-delete' : 'product-button-restore'}`}
                                            onClick={() => handleDelete(product)}
                                        >
                                            {product.is_deleted ? 'Delete' : 'Restore'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                                <button onClick={() => paginate(index)} className="page-link">
                                    {index}
                                </button>
                            </li>
                        ))}
                    </ul>

                </>
            )}
        </div>
    );
};

export default ProductList;
