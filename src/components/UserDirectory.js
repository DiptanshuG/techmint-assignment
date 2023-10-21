import React, { useState, useEffect } from 'react';
import { getUsers, getUserPosts } from '../services/api';
import UserCard from './UserCard'; 

const UserDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => {
        // Fetch user posts for each user and update the user data
        const fetchUserPostPromises = data.map((user) => {
          return getUserPosts(user.id)
            .then((posts) => {
              user.posts = posts;
              user.totalPosts = posts.length;
              return user;
            });
        });

        // Wait for all user post fetches to complete
        Promise.all(fetchUserPostPromises)
          .then((usersWithPosts) => setUsers(usersWithPosts))
          .catch((error) => console.error('Error fetching user posts:', error));
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div>
      <h1>User Directory</h1>
      <div>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserDirectory;
