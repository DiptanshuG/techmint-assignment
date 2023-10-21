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
    margin-left: 8px;
  }
`;

const TimezoneSelector = ({
  selectedTimezone,
  onSelectTimezone,
  timezones,
}) => {
  const handleTimezoneChange = (e) => {
    onSelectTimezone(e.target.value);
  };

  return (
    <CountrySelector value={selectedTimezone} onChange={handleTimezoneChange}>
      {timezones.map((timezone) => (
        <option key={timezone} value={timezone}>
          {timezone}
        </option>
      ))}
    </CountrySelector>
  );
};

export default TimezoneSelector;
