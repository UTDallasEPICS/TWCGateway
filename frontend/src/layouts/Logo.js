import { ReactComponent as LogoDark } from "../assets/images/logos/amplelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <LogoDark />
    </Link>
  );
};

export default Logo;
