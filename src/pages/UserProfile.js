import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserProfileHeader from "../components/UserProfileHeader";
import UserProfileDetails from "../components/UserProfileDetails";
import UserProfilePosts from "../components/UserProfilePosts";
import ClockContainer from "../components/ClockContainer";
import TimezoneSelector from "../components/TimezoneSelector";
import { getCurrentTime, getUserById, getUserPosts } from "../services/api";
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

const UserProfileHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UserProfileContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
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

  const handleTimezoneChange = (newTimezone) => {
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
      <UserProfileHeaderContainer>
        <UserProfileHeader />
        <TimezoneSelector
          selectedTimezone={selectedTimezone}
          onSelectTimezone={handleTimezoneChange}
          timezones={timezones}
        />
      </UserProfileHeaderContainer>
      <UserProfileContentContainer>
        <UserProfileDetails user={user} isLoading={isLoading} />

        <ClockContainer
          isClockPaused={isClockPaused}
          currentTime={currentTime}
          originalTime={originalTime}
          toggleClock={toggleClock}
        />
      </UserProfileContentContainer>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h2>User Posts</h2>
      </div>

      <UserProfilePosts userPosts={userPosts} isLoading={isLoading} />
    </UserProfileContainer>
  );
};

export default UserProfile;
