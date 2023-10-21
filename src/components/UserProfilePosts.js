import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import CustomLoader from './Loader';

const UserPosts = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column; 
  }
`;

const PostContainer = styled.div`
  width: calc(33.33% - 10px); 

  @media (max-width: 768px) {
    width: 100%;
  }

  margin-bottom: 20px;
`;

const UserProfilePosts = ({ userPosts, isLoading }) => {
  return (
    <UserPosts>
      {isLoading ? (
        <CustomLoader />
      ) : (
        userPosts.map((post) => (
          <PostContainer key={post.id}>
            <Post title={post.title} content={post.body} />
          </PostContainer>
        ))
      )}
    </UserPosts>
  );
};

export default UserProfilePosts;
