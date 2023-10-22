import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserProfileHeader from "../components/UserProfileHeader";
import UserProfileDetails from "../components/UserProfileDetails";
import UserProfilePosts from "../components/UserProfilePosts";
import ClockContainer from "../components/ClockContainer";
import TimezoneSelector from "../components/TimezoneSelector";
import {
  getCurrentTime,
  getUserById,
  getUserPosts,
  getAllTimezones,
} from "../services/api";

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
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const TimeZoneContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  flex-direction: column;
  margin: 0 10px 0 10px;

  @media (max-width: 768px) {
    width: auto;
    flex-direction: row;
    margin: 0 0 0 0;
  }
`;

const UpperSegment = styled.div`
  padding: 20px;
  color: #balck;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserProfileTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const UserPostsHeading = styled.h2`
  font-size: 1.8rem;
  color: #007bff;
  margin: 0;
`;

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [isClockPaused, setIsClockPaused] = useState(false);
  const [timezones, setTimezones] = useState([]);
  const [isTimeZonesLoading, setIsTimeZonesLoading] = useState(false);

  useEffect(() => {
    getAllTimezones()
      .then((timezoneData) => {
        setTimezones(timezoneData);
        setIsTimeZonesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching timezones:", error);
      });

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
    if (selectedTimezone) {
      updateClock();
    }
  }, [userId, selectedTimezone]);

  const updateClock = () => {
    getCurrentTime(selectedTimezone)
      .then((timeData) => {
        if (timeData) {
          const localTime = timeData.datetime.replace(/(\+\d{2}:\d{2})$/, "");
          setCurrentTime(new Date(localTime));
        } else {
          console.error("Invalid time data received:");
        }
      })
      .catch((error) => {
        console.error("Error fetching current time:", error);
      });
  };

  useEffect(() => {
    updateClock();
  }, [selectedTimezone]);

  const toggleClock = () => {
    setIsClockPaused(!isClockPaused);
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
      {user && (
        <UpperSegment>
          <UserProfileTitle>{`${user?.username}'s Profile Details`}</UserProfileTitle>
        </UpperSegment>
      )}
      <UserProfileHeaderContainer>
        <UserProfileHeader />
      </UserProfileHeaderContainer>
      <UserProfileContentContainer>
        <UserProfileDetails user={user} isLoading={isLoading} />
        <TimeZoneContainer>
          <TimezoneSelector
            selectedTimezone={selectedTimezone}
            onSelectTimezone={handleTimezoneChange}
            timezones={timezones}
            isLoading={isTimeZonesLoading}
          />
          <ClockContainer
            isClockPaused={isClockPaused}
            currentTime={currentTime}
            toggleClock={toggleClock}
            setCurrentTime={setCurrentTime}
          />
        </TimeZoneContainer>
      </UserProfileContentContainer>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <UserPostsHeading>{`${
          user?.username ? user?.username : ""
        }'s Posts`}</UserPostsHeading>
      </div>

      <UserProfilePosts userPosts={userPosts} isLoading={isLoading} />
    </UserProfileContainer>
  );
};

export default UserProfile;
