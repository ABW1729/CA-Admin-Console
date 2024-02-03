"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUsers, setEditingUsers] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/getUsers');
        setUsers(response.data.uniqueUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

const handleEdit = async (mail, score) => {

  try {
    await axios.post('/api/editUser', { email: mail, newscore: score });
    const response = await axios.get('/api/getUsers',{next:{revalidate:0}});
    const updatedUsers = response.data.users;

    // Check if the data is updated successfully
    if (updatedUsers) {
      setUsers(updatedUsers);
      setEditingUsers({});
      window.location.reload(true);
      alert('Data updated successfully!');
    } else {
      // Handle the case where data update fails
      alert('Failed to update data. Please try again.');
    }
  } catch (error) {
    console.error('Error editing user:', error);
    // Handle the error case
    alert('An error occurred while updating data.');
  }
};

  return (
    <div>
      <h1>User Table</h1>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Points</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.points}</td>
              <td>
              {editingUsers[user._id] ? (
  <>
    <input
      type="text"
      value={editingUsers[user._id]?.newScore || ''}
      onChange={(e) => {
        const updatedUsers = { ...editingUsers };
        updatedUsers[user._id] = { ...user, newScore: e.target.value };
        setEditingUsers(updatedUsers);
      }}
    />
    <button onClick={() => handleEdit(user.email, editingUsers[user._id]?.newScore)}>Save</button>
    <button onClick={() => setEditingUsers((prev) => ({ ...prev, [user._id]: undefined }))}>Cancel</button>
  </>
) : (
  <button onClick={() => setEditingUsers((prev) => ({ ...prev, [user._id]: { ...user, newScore: user.newScore } }))}>Edit</button>
)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
