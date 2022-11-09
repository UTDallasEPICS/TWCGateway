import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
//import serverFunctions from "../../server/server"; 

//serverFunctions.connect();


const Home = () => {
    
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
         return <div>Loading ...</div>;
    }

    //call the sign in function here passing the user email as a parameter
  return (
    isAuthenticated && (
      <div className = "Home">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
  )
  );
};
 
export default Home;