import logo from "./images/The-Warren-Center-logo.png"

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo}/>
            <div className="sections">
                <a href="/home">Home</a>
                <a href="/messages">Messages</a>
            </div>
        </div>
     );
}
 
export default Navbar;