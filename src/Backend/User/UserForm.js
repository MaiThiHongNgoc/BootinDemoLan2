import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../Service (1)/userService';
import './UserForm.css';

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: {
      role_id: 2
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,  
        role: { role_id: user.role.role_id },
      });
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        phone: '',
        role: {
          role_id: 2
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser({ ...user, ...formData });
      } else {
        await createUser(formData);
      }
      setFormData({ username: '', email: '', phone: '', password: '', role:{role_id: 2} });
      onSave();
    } catch (error) {
      console.error('Failed to save user', error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone</label>
        <input
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        />
      </div>
      <button className="user-form-button-save" type="submit">Save</button>
    </form>
  );
};

export default UserForm;
