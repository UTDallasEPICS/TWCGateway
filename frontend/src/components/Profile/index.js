// if no user is being returned, check if the auth0 configuration is for a single page application (SPA).



import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const [profile, setProfile] = useState(null);

  

  useEffect(() => {
    console.log("user user user user: ", user)
    console.log("error error error error: ", error)
    if (isAuthenticated) {
        console.log("yo yo yo yo you user: ", user)
    }
    if (isAuthenticated && user) {
        setProfile(user);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

//   console.log("user user user user: ", user)
//   console.log("error error error error: ", error)
//     if (isAuthenticated) {
//         console.log("yo yo yo yo you user: ", user)
//     }


  return (
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
  );
};

export default Profile;
