import logo from "./images/The-Warren-Center-logo.png"
import React, {useState} from 'react'
import { Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


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
        
        <div className="text-center bg-light-info">
        <div className="signin-body">
            <form className="form-signin">
                <img className="mb-4" src={logo} alt=""/>
                <h1 className="h3 mb-3 font-weight-bold">Please Sign In</h1>
                {/* <p className="fst-italic">This is your Onboarding Checklist</p> */}
                <button onClick={() => loginWithRedirect()}
                        className="btn btn-lg btn-primary btn-block" 
                        type="submit" 
                        href="/home"
                        action="/signIn">
                            Log In
                            </button>
                        </form>
                    </div>
                            
                <div>
                    <form className="form-signin">
                    <h2 className="h3 mb-3 font-weight-normal fw-lighter">Our Mission:</h2>
                    <p className="fst-italic font-weight-bold">The Warren Center is a nonprofit agency that advocates, serves 
                    and empowers the children and families impacted by developmental delays and disabilities.</p>
                        <div>
                        <form className="form-signin">
                            <p>"It's not how much we give, but how much love we put into giving."</p>
                            <p className="text-right"> - Mother Teresa.</p>
                        </form>
                        </div>
                    
                    </form>
                </div>

                <div>
                <p className="mt-3 mb-3 text-muted">&copy; 2022</p>
                </div>
          
            
                <div style = {{height:"100vh"}}> </div>
            </div>

        
);
}

export default LoginForm;