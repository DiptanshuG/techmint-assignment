import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Clock from "./Clock";
import { getCurrentTime, getUserById, getUserPosts } from "../services/api";
import CustomLoader from "./Loader";
import Post from "./Post";
import timezones from "../dummyData/timezones";

const UserProfileContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled(Link)`
  text-decoration: none;
  color: #007bff;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const UpperSegment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UserInfo = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const UserDescription = styled.div`
  font-size: 1rem;
  color: #777;
  margin-top: 10px;
`;

const UserAddress = styled.div`
  font-size: 1rem;
  color: #777;
  margin-top: 10px;
`;

const CountrySelector = styled.select`
  font-size: 1rem;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`;

const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
`;

const PauseStartButton = styled.button`
  font-size: 1rem;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const UserPosts = styled.div`
  width: 100%;
`;

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [currentTime, setCurrentTime] = useState(null);
  const [isClockPaused, setIsClockPaused] = useState(false);

  const [originalTime, setOriginalTime] = useState(null);

  useEffect(() => {
    getUserById(userId)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => console.error("Error fetching user data:", error));

    getUserPosts(userId)
      .then((postsData) => {
        setUserPosts(postsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
        setIsLoading(false);
      });

    getCurrentTime(selectedTimezone)
    .then((timeData) => {
      const currentDatetime = new Date(timeData.datetime);
      const formattedTime = currentDatetime.toISOString().substr(11, 8);
      console.log(formattedTime);
      
      if (isClockPaused) {
        setCurrentTime(originalTime);
      } else {
        setCurrentTime(formattedTime);
      }
  
      if (originalTime === null) {
        setOriginalTime(formattedTime);
      }
    })
    .catch((error) => {
      console.error("Error fetching current time:", error);
    });
  }, [userId, selectedTimezone, originalTime]); 

  const toggleClock = () => {
    setIsClockPaused(!isClockPaused);

    if (isClockPaused) {
      setOriginalTime(currentTime);
    }
  };

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setSelectedTimezone(newTimezone);
    localStorage.setItem("selectedTimezone", newTimezone);
  };

  useEffect(() => {
    const storedTimezone = localStorage.getItem("selectedTimezone");
    if (storedTimezone) {
      setSelectedTimezone(storedTimezone);
    }
  }, []);

  return (
    <UserProfileContainer>
      <BackButton to="/">Back</BackButton>
      <UpperSegment>
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
        <ClockContainer>
          <Clock
            currentTime={isClockPaused ? originalTime : currentTime}
            paused={isClockPaused}
          />
          <PauseStartButton onClick={toggleClock}>
            {isClockPaused ? "Start" : "Pause"}
          </PauseStartButton>
        </ClockContainer>
      </UpperSegment>
      <h2>Profile Details</h2>

      <UserInfo>
        {user ? (
          <>
            <UserName>{user.name}</UserName>
            <UserDescription>
              Username: {user.username} | Catch Phrase:{" "}
              {user.company.catchPhrase}
            </UserDescription>
            <UserAddress>
              Address: {user.address.street}, {user.address.suite},{" "}
              {user.address.city}
            </UserAddress>
          </>
        ) : (
          <CustomLoader />
        )}
      </UserInfo>

      <UserPosts>
        {isLoading ? (
          <CustomLoader />
        ) : (
          userPosts.map((post) => (
            <Post key={post.id} title={post.title} content={post.body} />
          ))
        )}
      </UserPosts>
    </UserProfileContainer>
  );
};

export default UserProfile;