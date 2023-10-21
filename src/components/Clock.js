import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Clock = ({ currentTime, paused }) => {
  const [displayedTime, setDisplayedTime] = useState(currentTime || new Date());

  useEffect(() => {
    let timer;

    if (!paused) {
      timer = setInterval(() => {
        setDisplayedTime(new Date());
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [paused]);

  return (
    <ClockContainer>
      {displayedTime.toLocaleTimeString()}
    </ClockContainer>
  );
};

export default Clock;
