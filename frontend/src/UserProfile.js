import React, { useEffect, useState } from 'react';
import axios from 'axios';



const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/user/profile/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserProfile;
