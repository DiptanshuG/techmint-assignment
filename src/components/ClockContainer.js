import React from 'react';
import styled from 'styled-components';
import Clock from './Clock';

const ClockContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 5px;

  @media (max-width: 768px) {
    width: 100%; 
    margin-top: 10px;
  }
`;

const PauseStartButton = styled.button`
  font-size: 1rem;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin:2px; 
  }
`;

const ClockContainerComponent = ({ isClockPaused, currentTime, originalTime, toggleClock }) => {
  console.log({originalTime,currentTime})
  return (
    <ClockContainer>
      <Clock currentTime={isClockPaused ? originalTime : currentTime} paused={isClockPaused} />
      <PauseStartButton onClick={toggleClock}>
        {isClockPaused ? 'Start' : 'Pause'}
      </PauseStartButton>
    </ClockContainer>
  );
};

export default ClockContainerComponent;
