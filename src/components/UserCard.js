import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserCardContainer = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  position: relative; 

  h2 {
    font-size: 1.2rem;
  }

  p {
    margin-top: 5px;
    font-size: 1rem;
  }

  .post-count {
    position: absolute;
    top: 5px;
    right: 5px; 
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
  }
`;

const UserCard = ({ user }) => {
  return (
    <UserCardContainer>
      <Link to={`/user/${user.id}`}>
        <h2>{user.name}</h2>
      </Link>
      <p>
        <span className="post-count"> Total Posts: {user.totalPosts}</span>
      </p>
    </UserCardContainer>
  );
};

export default UserCard;
