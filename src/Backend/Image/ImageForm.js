import React, { useState, useEffect } from 'react';
import { getProducts } from '../Service (1)/productService';
import imgService from '../Service (1)/imgService';
import './ImageForm.css'

const ImageForm = ({ img_product, onSave }) => {
  const [formData, setFormData] = useState({
    img_name: '',
    img_url: '',
    products: { product_id: '' },
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (img_product) {
      setFormData({
        img_name: img_product.img_name,
        img_url: img_product.img_url,
        products: { product_id: img_product.products ? img_product.products.product_id : '' },
      });
    } else {
      setFormData({
        img_name: '',
        img_url: '',
        products: { product_id: '' },
      });
    }
  }, [img_product]);

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getProducts(); // Use the new function
      setProducts(response.content);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'product') {
      setFormData({
        ...formData,
        products: { product_id: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        products: {
          product_id: formData.products.product_id,
        },
      };

      if (img_product) {
        await imgService.updateImage(img_product.img_id, submissionData);
      } else {
        await imgService.createImage(submissionData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save image', error);
    }
  };

  return (
    <form className="image-form" onSubmit={handleSubmit}>
      <div className="image-form-field">
        <label className="image-form-label">Image Name</label>
        <input
          type="text"
          name="img_name"
          value={formData.img_name}
          onChange={handleChange}
          className="image-form-input"
        />
      </div>
      <div className="image-form-field">
        <label className="image-form-label">Image URL</label>
        <input
          type="text"
          name="img_url"
          value={formData.img_url}
          onChange={handleChange}
          className="image-form-input"
        />
      </div>
      <div className="image-form-field">
  <label className="image-form-label">Product</label>
  {loading ? (
    <p className="image-form-loading">Loading products...</p>
  ) : error ? (
    <p className="image-form-error">{error}</p>
  ) : (
    <div className="image-form-select-container">
      <select
        name="product"
        value={formData.products.product_id}
        onChange={handleChange}
        className="image-form-select"
      >
        <option value="">Select product...</option>
        {products.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.product_name}
          </option>
        ))}
      </select>
    </div>
  )}
</div>
      <button type="submit" className="image-form-button">Save</button>
    </form>
  );
};

export default ImageForm;
