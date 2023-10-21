import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  margin-bottom: 10px;
`;

const PostContent = styled.div`
  font-size: 1rem;
  color: #555;
`;

const Post = ({ title, content }) => (
  <PostContainer>
    <PostTitle>{title}</PostTitle>
    <PostContent>{content}</PostContent>
  </PostContainer>
);

export default Post;
