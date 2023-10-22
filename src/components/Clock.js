import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ClockContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  display:flex;
  justify-content: space-between;
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
    margin: 2px;
  }
`;

const Clock = ({ currentTime, paused, toggleClock, setCurrentTime }) => {
  const [displayedTime, setDisplayedTime] = useState(new Date());

  useEffect(() => {
    let timer;

    if (currentTime && !paused) {
      setDisplayedTime(currentTime);

      timer = setInterval(() => {
        if (!paused) {
          setDisplayedTime((prevTime) => new Date(prevTime.getTime() + 1000));
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [currentTime, paused]);

  useEffect(() => {
    if (paused && currentTime && displayedTime) {
      setCurrentTime(displayedTime);
    }
  }, [paused]);

  const formattedTime =
    displayedTime instanceof Date
      ? displayedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "";

  return (
    <ClockContainer>
      {formattedTime}
      <PauseStartButton onClick={toggleClock}>
        {paused ? "Start" : "Pause"}
      </PauseStartButton>
    </ClockContainer>
  );
};

export default Clock;
