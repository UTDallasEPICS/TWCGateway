import logo from "./images/The-Warren-Center-logo.png"
import React, {useState} from 'react'

function ValidatePassword(inputEmail, inputPassword){
    var link;

    if(inputPassword === "Tiger" && inputEmail === "good@gmail.com"){
        link = "/home"; // go to home page
    }else{
        link = "/login"; // go to login page
    }

    return link;
}


const LoginForm = () => {

    const [password,setPassword] = useState(null)
    const [email,setEmail] = useState(null)


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
                <label for="inputEmail" class="sr-only">Email address</label>
                <input onChange= {getEmail} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input onChange= {getPassword} type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                
                    <li class="nav-item">
                        <button
                        class="btn btn-lg btn-primary btn-block" 
                        type="submit" 
                        href="/home">
                            <a class="nav-link" href={ValidatePassword("good@gmail.com", "Tiger")}>
                            Sign In
                            </a>
                        </button>
                    </li>
                
                <div class = "mt-4"> <a href="#">Reset password</a></div>
                <p class="mt-3 mb-3 text-muted">&copy; 2022</p>
            </form>
            
        </div>
        </div>
    );
}

export default LoginForm;