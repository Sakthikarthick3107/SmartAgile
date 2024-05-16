import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/projects/project-members/');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="grid grid-cols-2 gap-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded-lg shadow">
            <img src={`http://127.0.0.1:8000/${user.image}`} alt={user.username} className="w-20 h-20 rounded-full mx-auto mb-4" />
            <div className="text-center">
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-600">{user.role_within_project}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
