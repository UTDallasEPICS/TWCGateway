import logo from "./images/The-Warren-Center-logo.png"
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {

    const { logout } = useAuth0();

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/home"><img src={logo} alt="My logo" /></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">Admin</a>
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

{/*<div class="navbar">
            <img src={logo} alt="logo"/>
            <div class="sections">
                <a href="/home">Home</a>
                <a href="/messages">Messages</a>
            </div>
</div>*/}