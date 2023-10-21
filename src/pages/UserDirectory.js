import React, { useState, useEffect } from 'react';
import { getUsers, getUserPosts } from '../services/api';
import UserCard from '../components/UserCard';
import CustomLoader from '../components/Loader';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        const fetchUserPostPromises = data.map((user) => {
          return getUserPosts(user.id)
            .then((posts) => {
              user.posts = posts;
              user.totalPosts = posts.length;
              return user;
            });
        });

        Promise.all(fetchUserPostPromises)
          .then((usersWithPosts) => {
            setUsers(usersWithPosts);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching user posts:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>User Directory</h1>
      </div>
      {loading ? (
        <CustomLoader />
      ) : (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDirectory;
