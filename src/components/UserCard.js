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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
      width: 150px;
    }
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

const UserNameLink = styled(Link)`
  text-decoration: none;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const UserCard = ({ user }) => {
  return (
    <UserCardContainer>
      <UserNameLink to={`/user/${user.id}`}>
        <UserName>{user.name}</UserName>
      </UserNameLink>
      <p>
        <span className="post-count"> Total Posts: {user.totalPosts}</span>
      </p>
    </UserCardContainer>
  );
};

export default UserCard;
