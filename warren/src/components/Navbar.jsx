import Home from "./Home";
import Messages from "./Messages";
import logo from "./images/The-Warren-Center-logo.png"

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo}/>
            <div className="sections">
                <Home/>
                <Messages/>
                
            </div>
        </div>
     );
}
 
export default Navbar;