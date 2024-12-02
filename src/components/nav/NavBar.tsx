import { Link } from "react-router-dom";
import NavAccount from "./NavAccount";

function NavBar() {
  return (
    <nav className="navbar secondary-chatbox-cus">
      <div className="container primary-chatbox-cus rounded">
        <Link to={"/"} className="navbar-brand">
          <img
            src="/critter-watch-logo.png"
            alt="Logo"
            width="50"
            height="50"
            className="me-2"
          />
          Critter Watch
        </Link>
        <NavAccount />
      </div>
    </nav>
  );
}

export default NavBar;
