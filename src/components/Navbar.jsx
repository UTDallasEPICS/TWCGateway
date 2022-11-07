import logo from "./images/The-Warren-Center-logo.png"
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {

    const { logout } = useAuth0();

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/home">The Warren Center</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/home">Home <span class="sr-only">(current)</span></a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link" href="/admin">Admin</a>
                        </li>

                        {/* <li class="nav-item">
                            <a class="nav-link" href="/login">Sign Out</a>
                        </li> */}
                        <button onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                        </button>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

{/*<div className="navbar">
            <img src={logo} alt="logo"/>
            <div className="sections">
                <a href="/home">Home</a>
                <a href="/messages">Messages</a>
            </div>
</div>*/}