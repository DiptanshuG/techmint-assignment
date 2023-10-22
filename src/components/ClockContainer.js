// ClockContainerComponent.js
import React from "react";
import styled from "styled-components";
import Clock from "./Clock";

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

const ClockContainerComponent = ({
  isClockPaused,
  currentTime,
  toggleClock,
  setCurrentTime,
}) => {
  return (
    <ClockContainer>
      <Clock
        setCurrentTime={setCurrentTime}
        currentTime={currentTime}
        paused={isClockPaused}
        toggleClock={toggleClock}
      />
    </ClockContainer>
  );
};

export default ClockContainerComponent;
