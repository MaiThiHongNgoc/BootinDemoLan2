import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../Service/productService';
import { getAuthors } from '../Service/authorService';
import { getCategories } from '../Service/categoryService';
import './ProductForm.css';

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        author: { author_id: '' },
        description: '',
        price: '',
        categories: { category_id: '' },
        //imgProducts: [{ img_id: '' }]
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
                //imgProducts: product.imgProducts.length > 0 ? product.imgProducts : [{ img_id: '' }]
            });
        } else {
            setFormData({
                product_name: '',
                author: { author_id: '' },
                description: '',
                price: '',
                categories: { category_id: '' },
                //imgProducts: [{ img_id: '' }]
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
            } else if (name.startsWith('img_id')) {
                const index = parseInt(name.split('_')[1], 10);
                const updatedImgProducts = [...prevState.imgProducts];
                updatedImgProducts[index] = { img_id: value };
                return {
                    ...prevState,
                    imgProducts: updatedImgProducts
                };
            } else {
                return { ...prevState, [name]: value };
            }
        });
    };

    // const handleAddImageField = () => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         imgProducts: [...prevState.imgProducts, { img_id: '' }]
    //     }));
    // };

    // const handleRemoveImageField = (index) => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         imgProducts: prevState.imgProducts.filter((_, i) => i !== index)
    //     }));
    // };

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
                imgProducts: [{ img_id: '' }]
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
                />
            </div>
            <div>
                <label>Author</label>
                <select
                    name="author_id"
                    value={formData.author.author_id}
                    onChange={handleChange}
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
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Category</label>
                <select
                    name="category_id"
                    value={formData.categories.category_id}
                    onChange={handleChange}
                >
                    <option value="">Select category...</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
            {/* <div>
                <label>Images</label>
                {formData.imgProducts.map((img, index) => (
                    <div key={index} className="image-field">
                        <input
                            type="number"
                            name={`img_id_${index}`}
                            value={img.img_id}
                            onChange={handleChange}
                        />
                        <button type="button" onClick={() => handleRemoveImageField(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddImageField}>Add Image</button>
            </div> */}
            <button className="product-form-button-save" type="submit">Save</button>
        </form>
    );
};

export default ProductForm;
