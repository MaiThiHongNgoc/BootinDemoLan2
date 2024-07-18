
import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import { getCategories, deleteCategory } from '../Service (1)/categoryService';
import './CategoryList.css'

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      loadCategories();
    }, []);
  
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
  
    const handleEdit = (category) => {
      setEditingCategory(category);
      setShowForm(true);
    };
  
    const handleDelete = async (id) => {
      try {
        await deleteCategory(id);
        loadCategories();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    };
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter(category => 
      category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
    const handleAddCategory = () => {
      setEditingCategory(null);
      setShowForm(true);
    };
  
    const handleFormClose = () => {
      setShowForm(false);
      loadCategories();
    };
  
    return (
      <div className="category-container">
        <h1>Category Management</h1>
        <button className="category-button-add" onClick={handleAddCategory}>
          Add Category
        </button>
        {showForm && <CategoryForm category={editingCategory} onSave={handleFormClose} />}
        <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="category-search"
            />
        <table className="category-table">
          <thead>
            <tr>
            <th>Category ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td>{category.category_name}</td>
                <td>
                  <button className="category-button-edit" onClick={() => handleEdit(category)}>
                    Edit
                  </button>
                  <button className="category-button-delete" onClick={() => handleDelete(category.category_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CategoryList;