import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserStore } from "../globalState";

//import serverFunctions from "../../server/server";

//serverFunctions.connect();

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { user: globalUser, setUser } = useUserStore();

  useEffect(() => {
    if (user && !isLoading) setUser(user.email, user.name);
  }, [isAuthenticated]);
  
  // const [name, email] =

  /* if (isLoading) {
         return <div>Loading...</div>;
    }
*/

  console.log("***** user", user);
  console.log("***** globalUser", globalUser);
  console.log();

  //call the sign in function here passing the user email as a parameter
  return (
    isAuthenticated && (
      <div className="Home">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Home;
