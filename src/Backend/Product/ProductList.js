import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../Service/productService';
import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [productsPerPage] = useState(10); // Number of products per page

    useEffect(() => {
        loadProducts(currentPage);
    }, [currentPage]);

    const loadProducts = async (page) => {
        setLoading(true);
        setError('');
        try {
            const response = await getProducts(page - 1, productsPerPage); // Adjust page number for pagination
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages); // Update the total number of pages
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

    const handleDelete = async (product_id) => {
        try {
            await deleteProduct(product_id);
            loadProducts(currentPage);
        } catch (error) {
            console.error('Failed to delete product', error);
            setError('Failed to delete product. Please try again later.');
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        loadProducts(currentPage);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                    <td>{product.author.author_name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categories.category_name}</td>
                                    <td>
                                        {product.imgProducts && product.imgProducts.map(img => (
                                            <img key={img.img_id} src={img.img_url} alt={img.img_name} className="product-image" />

                                        ))}
                                    </td>
                                    <td>
                                        <button className="product-button-edit" onClick={() => handleEdit(product)}>Edit</button>
                                        <button className="product-button-delete" onClick={() => handleDelete(product.product_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
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
