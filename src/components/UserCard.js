import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserCardContainer = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.2rem;
  }

  p {
    margin-top: 5px;
    font-size: 1rem;
  }
`;

const UserCard = ({ user }) => {
  return (
    <UserCardContainer>
      <Link to={`/user/${user.id}`}>
        <h2>{user.name}</h2>
      </Link>
      <p>Total Posts: {user.totalPosts}</p>
    </UserCardContainer>
  );
};

export default UserCard;
