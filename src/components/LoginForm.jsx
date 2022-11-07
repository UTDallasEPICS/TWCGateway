import logo from "./images/The-Warren-Center-logo.png"
import React, {useState} from 'react'
import { Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

/*
function ValidatePassword(inputEmail, inputPassword){
    var link;

    if(inputPassword === "Password" && inputEmail === "good@gmail.com"){
        link = "/home"; // go to home page
    }else{
        link = "/login"; // go to login page
    }

    window.open(link);


    return link;
}

  <label for="inputEmail" class="sr-only">Email address</label>
                <input onChange= {getEmail} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input onChange= {getPassword} type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                
                <button onMouseDown={function () {ValidatePassword(email, password)}}
                        class="btn btn-lg btn-primary btn-block" 
                        type="submit" 
                        href="/home"
                        action="/signIn">
                            Sign In
                        </button>

                        <div class = "mt-4"> <a href="#">Reset password</a></div>
*/


const LoginForm = () => {

    const [password,setPassword] = useState(null)
    const [email,setEmail] = useState(null)

    const { loginWithRedirect } = useAuth0();


    function getPassword(event){
        setPassword(event.target.value)
    }

    function getEmail(event){
        setEmail(event.target.value)
    }

    return (
        
        <div class="text-center">
        <div class="signin-body">
            <form class="form-signin">
                <img class="mb-4" src={logo} alt=""/>
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

                <button onClick={() => loginWithRedirect()}
                        class="btn btn-lg btn-primary btn-block" 
                        type="submit" 
                        href="/home"
                        action="/signIn">
                            Log In
                            </button>

                <p class="mt-3 mb-3 text-muted">&copy; 2022</p>
            </form>
            
        </div>
        </div>
        
    );
}

export default LoginForm;