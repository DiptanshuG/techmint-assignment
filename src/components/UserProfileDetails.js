import React from 'react';
import styled from 'styled-components';
import CustomLoader from './Loader';

const UserInfo = styled.div`
background-color: #fff;
border: 1px solid #ccc;
border-radius: 8px;
padding: 20px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
max-width: 600px;
margin-top: 10px;
`;

const UserName = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd; /* Add a horizontal line under the name */
`;

const UserDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #555;
`;

const UserAddress = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
`;


const UserProfileDetails = ({ user, isLoading }) => {
  return (
    <UserInfo>
      {user ? (
        <>
          <UserName>{user.name}</UserName>
          <UserDescription>
            Username: {user.username} | Catch Phrase: {user.company.catchPhrase}
          </UserDescription>
          <UserAddress>
            Address: {user.address.street}, {user.address.suite}, {user.address.city}
          </UserAddress>
        </>
      ) : isLoading ? (
        <CustomLoader />
      ) : null}
    </UserInfo>
  );
};

export default UserProfileDetails;
