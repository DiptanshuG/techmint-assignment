const BASE_URL = "https://jsonplaceholder.typicode.com";
const WORLD_TIME_API_BASE_URL = "http://worldtimeapi.org/api/timezone";

// Fetch a list of users
export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Fetch user details by ID
export async function getUserById(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user details.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Fetch user posts by user ID
export async function getUserPosts(userId) {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user posts.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Fetch current time for a given timezone
export async function getCurrentTime(timezone) {
  try {
    const response = await fetch(`${WORLD_TIME_API_BASE_URL}/${timezone}`);
    if (!response.ok) {
      throw new Error("Failed to fetch current time.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Fetch a list of timezones (countries)
export async function getAllTimezones() {
  try {
    const response = await fetch(`${WORLD_TIME_API_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch timezones.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
