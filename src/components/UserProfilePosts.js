import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import CustomLoader from './Loader';

const UserPosts = styled.div`
  width: 100%;
`;

const UserProfilePosts = ({ userPosts, isLoading }) => {
  return (
    <UserPosts>
      {isLoading ? (
        <CustomLoader />
      ) : (
        userPosts.map((post) => (
          <Post key={post.id} title={post.title} content={post.body} />
        ))
      )}
    </UserPosts>
  );
};

export default UserProfilePosts;
