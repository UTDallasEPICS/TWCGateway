import logo from "./images/The-Warren-Center-logo.png"
import React, {useState} from 'react'
import { Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";



const LoginForm = () => {

    const [password,setPassword] = useState(null)
    const [email,setEmail] = useState(null)

    const { loginWithRedirect } = useAuth0();



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