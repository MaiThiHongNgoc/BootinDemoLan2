import React, { useState, useEffect } from 'react';
import { updateAuthor, addAuthor } from '../Service (1)/authorService';
import './AuthorForm.css';

const AuthorForm = ({ author, onSave }) => {
  const [formData, setFormData] = useState({
    author_name: '',
    description: '',
    address: '',
    year_of_birth: '',
    gender: '',
    published_book: '',
    url_img: ''
  });

  useEffect(() => {
    if (author) {
      setFormData({
        author_name: author.author_name,
        description: author.description,
        address: author.address,
        year_of_birth: author.year_of_birth,
        gender: author.gender,
        published_book: author.published_book,
        url_img: author.url_img
      });
    } else {
      setFormData({
        author_name: '',
        description: '',
        address: '',
        year_of_birth: '',
        gender: '',
        published_book: '',
        url_img: ''
      });
    }
  }, [author]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (author) {
        await updateAuthor(author.author_id, formData);
      } else {
        await addAuthor(formData);
      }
      setFormData({
        author_name: '',
        description: '',
        address: '',
        year_of_birth: '',
        gender: '',
        published_book: '',
        url_img: ''
      });
      onSave();
    } catch (error) {
      console.error('Failed to save author', error);
    }
  };

  return (
    <form className="author-form" onSubmit={handleSubmit}>
      <div>
        <label>Author Name</label>
        <input
          type="text"
          name="author_name"
          value={formData.author_name}
          onChange={handleChange}
          required
        />
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
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Year of Birth</label>
        <input
          type="text"
          name="year_of_birth"
          value={formData.year_of_birth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Published Books</label>
        <input
          type="number"
          name="published_book"
          value={formData.published_book}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          name="url_img"
          value={formData.url_img}
          onChange={handleChange}
        />
      </div>
      <button className="author-form-button-save" type="submit">
        Save
      </button>
    </form>
  );
};

export default AuthorForm;
