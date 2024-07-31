import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../Service (1)/userService';
import UserForm from './UserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      console.log('Response from getUsers:', response); // Log toàn bộ phản hồi
      if (Array.isArray(response)) {
        setUsers(response); // Xử lý trường hợp phản hồi là mảng
      } else if (response && Array.isArray(response.data)) {
        setUsers(response.data); // Xử lý trường hợp dữ liệu nằm trong response.data
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      loadUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
      setError('Failed to delete user. Please try again.');
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
    user.role && user.role.role_name === 'USER' && // Lọc người dùng với vai trò 'user'
    (user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.role && user.role.role_name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="container_user">
      <h1>User Management</h1>
      {error && <p className="error-message">{error}</p>}
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
              <td>{user.role ? user.role.role_name : 'No role'}</td>
              <td>
                <button className="user-list-button-editt" onClick={() => handleEdit(user)}>Edit</button>
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
