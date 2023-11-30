
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import LogIn from '../LogIn';
import Logout from '../Logout';

const LoginPage = () => {

    const { user, isAuthenticated, isLoading, error } = useAuth0();
    const [profile, setProfile] = useState(null);

  

  useEffect(() => {
    if (isAuthenticated && user) {
        setProfile(user);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
    <div>
      <h1>Login Page</h1>
      <LogIn />
      <Logout />
    </div>

    <div>
    {profile ? (
    <div>
        <h2>Welcome, {profile.name}!</h2>
        <p>Email: {profile.email}</p>
        <p>Username: {profile.nickname}</p>
        {/* Add more profile information here */}
    </div>
    ) : (
    <div>Please log in to view your profile.</div>
    )}
    </div>
    </>
  );
};

export default LoginPage;
