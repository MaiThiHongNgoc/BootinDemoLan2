import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../Service (1)/userService';
import UserForm from './UserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (user_id) => {
    try {
      await deleteUser(user_id);
      loadUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleAddCustomer = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    loadUsers();
  };

  const handleRoleChange = async (user, newRole) => {
    try {
      await updateUser({ ...user, role: newRole });
      loadUsers();
    } catch (error) {
      console.error('Failed to update role', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>User Management</h1>
      <button className="user-list-button-add" onClick={handleAddCustomer}>Add Customer</button>
      {showForm && (
        <UserForm user={editingUser} onSave={handleFormClose} />
      )}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="user-search"
      />
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role.role_name}</td>
              <td>
                <button className="user-list-button-edit" onClick={() => handleEdit(user)}>Edit</button>
                <button className="user-list-button-delete" onClick={() => handleDelete(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
