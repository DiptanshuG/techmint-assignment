import React from "react";
import styled from "styled-components";

const CountrySelector = styled.select`
  font-size: 1rem;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const LoadingMessage = styled.div`
  font-size: 1rem;
  color: #333;
  margin-right: 10px;
`;

const TimezoneSelector = ({
  selectedTimezone,
  onSelectTimezone,
  timezones,
  isLoading,
}) => {
  const handleTimezoneChange = (e) => {
    onSelectTimezone(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <LoadingMessage>Loading timezones...</LoadingMessage>
      ) : (
        <CountrySelector
          value={selectedTimezone}
          onChange={handleTimezoneChange}
        >
          {timezones.map((timezone) => (
            <option key={timezone} value={timezone}>
              {timezone}
            </option>
          ))}
        </CountrySelector>
      )}
    </>
  );
};

export default TimezoneSelector;
