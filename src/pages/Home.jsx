import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
//import serverFunctions from "../../server/server"; 

//serverFunctions.connect();

const Home = () => {
    
    const { user, isAuthenticated, isLoading } = useAuth0();

    /*while (isLoading) {
         return <center className="h3 mb-3 font-weight-bold">Loading ...</center>;
    }*/

    //call the sign in function here passing the user email as a parameter
    return (
      isAuthenticated && (
        <div className = "Home">
          <h2><center>{"Welcome " + user.name}</center></h2>
        </div>
    )
    );
};
 
export default Home;