import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BackButton = styled(Link)`
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  display: inline-block;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    padding: 3px 13px;
    border-radius: 5px;
  }
`;

const UserProfileHeader = () => {
  return <BackButton to="/">Back</BackButton>;
};

export default UserProfileHeader;
