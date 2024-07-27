import React, { useState, useEffect } from 'react';
import imgService from '../Service (1)/imgService';
import ImageForm from './ImageForm';
import './ImageList.css';

const ImageList = () => {
    const [images, setImages] = useState([]);
    const [editingImage, setEditingImage] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      loadImages();
    }, []);
  
    const loadImages = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await imgService.getImages();
        setImages(response.data);
      } catch (error) {
        console.error('Failed to fetch images', error);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    const handleEdit = (img_product) => {
      setEditingImage(img_product);
      setShowForm(true);
    };
  
    const handleDelete = async (img_id) => {
      try {
        await imgService.deleteImage(img_id);
        loadImages();
      } catch (error) {
        console.error('Failed to delete image', error);
        setError('Failed to delete image. Please try again later.');
      }
    };
  
    const handleAddImage = () => {
      setEditingImage(null);
      setShowForm(true);
    };
  
    const handleFormClose = () => {
      setShowForm(false);
      loadImages();
    };
  
    return (
      <div className="image-list-container">
            <h1 className="image-list-title">Image Management</h1>
            <button className="image-list-button-add" onClick={handleAddImage}>Add Image</button>
            {showForm && (
                <ImageForm img_product={editingImage} onSave={handleFormClose} />
            )}
            {loading ? (
                <p className="image-list-loading">Loading images...</p>
            ) : error ? (
                <p className="image-list-error-message">{error}</p>
            ) : (
                <table className="image-list-table">
                    <thead>
                        <tr>
                            <th>Image Name</th>
                            <th>Image URL</th>
                            <th>Product Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((img_product) => (
                            <tr key={img_product.img_id}>
                                <td>{img_product.img_name}</td>
                                <td><img src={img_product.img_url} alt={img_product.img_name} className="image-list-img" /></td>
                                <td>{img_product.products ? img_product.products.product_name : 'No Product'}</td>
                                <td>
                                    <button className="image-list-button-edit" onClick={() => handleEdit(img_product)}>Edit</button>
                                    <button className="image-list-button-delete" onClick={() => handleDelete(img_product.img_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
  };
  
  export default ImageList;