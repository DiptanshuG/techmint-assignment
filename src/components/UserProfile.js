import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Clock from './Clock'; // Import the Clock component

const UserProfileContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled(Link)`
  text-decoration: none;
  color: #007bff;
  display: inline-block;
  margin-bottom: 20px;
`;

const UpperSegment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserProfile = () => {
  const { userId } = useParams();

  return (
    <UserProfileContainer>
      <BackButton to="/">Back</BackButton>
      <UpperSegment>
        <h2>User Name</h2>
        <div>
          <select>
            <option value="country1">Country 1</option>
            <option value="country2">Country 2</option>
          </select>
          <Clock /> 
          <button>Pause/Start</button>
        </div>
      </UpperSegment>
    </UserProfileContainer>
  );
};

export default UserProfile;
